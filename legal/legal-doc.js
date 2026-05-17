(() => {
  const markdownNode = document.getElementById('document-markdown');
  const targetNode = document.getElementById('document-content');

  if (!markdownNode || !targetNode) {
    return;
  }

  const decodeEntities = (value) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = value;
    return textarea.value;
  };

  const escapeHtml = (value) => value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');

  const escapeAttribute = (value) => escapeHtml(value).replaceAll('`', '&#96;');

  const slugify = (value) => value
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);

  const renderInline = (value) => {
    const codeTokens = [];
    let text = value.replace(/`([^`]+)`/g, (_, code) => {
      const token = `@@CODE_${codeTokens.length}@@`;
      codeTokens.push(`<code>${escapeHtml(code)}</code>`);
      return token;
    });

    text = escapeHtml(text);
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\.\/[^)\s]+|\.\.\/[^)\s]+)\)/g, (_, label, href) => (
      `<a href="${escapeAttribute(href)}" target="${href.startsWith('http') ? '_blank' : '_self'}" rel="noopener noreferrer">${label}</a>`
    ));
    text = text.replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, (_, prefix, url) => (
      `${prefix}<a href="${escapeAttribute(url)}" target="_blank" rel="noopener noreferrer">${url}</a>`
    ));

    codeTokens.forEach((code, index) => {
      text = text.replaceAll(`@@CODE_${index}@@`, code);
    });

    return text;
  };

  const isTableDivider = (line) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
  const isTableRow = (line) => line.trim().startsWith('|') && line.trim().endsWith('|');
  const isListItem = (line) => /^\s*(?:[-*+]|\d+[.)])\s+/.test(line);
  const isHeading = (line) => /^#{1,6}\s+/.test(line);
  const isFence = (line) => /^```/.test(line.trim());
  const isHorizontalRule = (line) => /^\s*---+\s*$/.test(line);
  const isIndentedCode = (line) => /^(?: {4}|\t)/.test(line);
  const startsBlock = (line, nextLine = '') => (
    isHeading(line)
    || isFence(line)
    || isListItem(line)
    || isHorizontalRule(line)
    || isIndentedCode(line)
    || (isTableRow(line) && isTableDivider(nextLine))
  );

  const splitTableCells = (line) => line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

  const renderMarkdown = (markdown) => {
    const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
    const output = [];
    let index = 0;

    while (index < lines.length && lines[index].trim() === '') index += 1;

    while (index < lines.length) {
      const line = lines[index];
      const nextLine = lines[index + 1] ?? '';

      if (line.trim() === '') {
        index += 1;
        continue;
      }

      if (isFence(line)) {
        const language = line.trim().slice(3).trim();
        const codeLines = [];
        index += 1;
        while (index < lines.length && !isFence(lines[index])) {
          codeLines.push(lines[index]);
          index += 1;
        }
        if (index < lines.length) index += 1;
        output.push(`<pre class="code-block"><code class="language-${escapeAttribute(language)}">${escapeHtml(codeLines.join('\n'))}</code></pre>`);
        continue;
      }

      if (isIndentedCode(line)) {
        const codeLines = [];
        while (index < lines.length && (isIndentedCode(lines[index]) || lines[index].trim() === '')) {
          codeLines.push(lines[index].replace(/^(?: {4}|\t)/, ''));
          index += 1;
        }
        output.push(`<pre class="code-block"><code>${escapeHtml(codeLines.join('\n').trimEnd())}</code></pre>`);
        continue;
      }

      if (isHeading(line)) {
        const level = Math.min(6, line.match(/^#+/)[0].length);
        const text = line.replace(/^#{1,6}\s+/, '').trim();
        const id = slugify(text);
        output.push(`<h${level} id="${escapeAttribute(id)}">${renderInline(text)}</h${level}>`);
        index += 1;
        continue;
      }

      if (isHorizontalRule(line)) {
        output.push('<hr />');
        index += 1;
        continue;
      }

      if (isTableRow(line) && isTableDivider(nextLine)) {
        const headerCells = splitTableCells(line);
        index += 2;
        const bodyRows = [];
        while (index < lines.length && isTableRow(lines[index])) {
          bodyRows.push(splitTableCells(lines[index]));
          index += 1;
        }
        output.push(
          `<div class="table-wrap"><table><thead><tr>${headerCells.map((cell) => `<th>${renderInline(cell)}</th>`).join('')}</tr></thead><tbody>${bodyRows.map((row) => `<tr>${row.map((cell) => `<td>${renderInline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
        );
        continue;
      }

      if (isListItem(line)) {
        const ordered = /^\s*\d+[.)]\s+/.test(line);
        const tagName = ordered ? 'ol' : 'ul';
        const items = [];
        while (index < lines.length && isListItem(lines[index])) {
          items.push(lines[index].replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '').trim());
          index += 1;
        }
        output.push(`<${tagName}>${items.map((item) => `<li>${renderInline(item)}</li>`).join('')}</${tagName}>`);
        continue;
      }

      const paragraphLines = [line.trim()];
      index += 1;
      while (
        index < lines.length
        && lines[index].trim() !== ''
        && !startsBlock(lines[index], lines[index + 1] ?? '')
      ) {
        paragraphLines.push(lines[index].trim());
        index += 1;
      }
      output.push(`<p>${renderInline(paragraphLines.join(' '))}</p>`);
    }

    return output.join('\n');
  };

  const markdown = decodeEntities(markdownNode.textContent.trim());
  targetNode.innerHTML = renderMarkdown(markdown);
})();
