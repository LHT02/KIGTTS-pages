# KIGTTS Web

基于 `Vite + React + MUI` 的静态展示页，适合直接构建后部署到 GitHub Pages。

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`，`vite.config.js` 已配置 `base: './'`，静态资源会使用相对路径。

## 一键部署

该项目提供本地一键部署脚本：

```bash
npm run deploy
```

该命令会：

- 构建当前工作区代码到 `dist/`
- 发布到两个 GitHub Pages 远端的 `gh-pages` 分支
- 通过阿里云云助手把同一份 `gh-pages` 产物部署到 Windows ECS/IIS

它不会执行 `git add`、`git commit`、`git push main`，也不会管理源码版本。

部署到 ECS 前需要在当前终端设置阿里云 API 凭据，不要写入仓库；也可以使用本地忽略文件 `.env.deploy.local.ps1`，脚本会自动读取它：

```powershell
$env:ALIBABA_CLOUD_ACCESS_KEY_ID="你的AccessKeyId"
$env:ALIBABA_CLOUD_ACCESS_KEY_SECRET="你的AccessKeySecret"
```

默认 ECS 参数：

- `ALIBABA_CLOUD_REGION_ID`: `cn-wulanchabu`
- `ALIBABA_CLOUD_INSTANCE_ID`: `i-0jl7ntndy5azlqq8e65m`
- `ECS_PUBLIC_IP`: `8.147.65.139`
- `ECS_SITE_PATH`: `C:\inetpub\wwwroot\KIGTTS`

可以用环境变量覆盖以上默认值。

## GitHub Pages

如果仓库已经初始化并关联远端，可以执行：

```bash
npm run deploy:pages
```

该命令会先构建，再把 `dist/` 发布到 `gh-pages` 分支。

仓库中也已包含 GitHub Actions 工作流：

- 推送到 `main` 后会自动构建并发布到 GitHub Pages
- 更适合长期维护，不依赖本地部署命令
