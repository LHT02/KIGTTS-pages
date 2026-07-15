import"./modulepreload-polyfill-B5Qt9EMX.js";import{W as le,S as q,a as ne,O as oe,M as re,P as ce,C as H,b as D,L as N,N as W,c as ie,V as G,D as ue}from"./three.module-BpIZQv1S.js";const I=new URL("./renders/manifest.json",window.location.href),E=document.getElementById("stage"),_=document.getElementById("threeStage"),K=document.getElementById("emptyState"),A=document.getElementById("tileOverlay"),L=document.getElementById("backgroundColor"),M=document.getElementById("backgroundText"),S=document.getElementById("azimuthSlider"),y=document.getElementById("elevationSlider"),de=document.getElementById("pointerToggle"),f=document.getElementById("sampleMode"),b=document.getElementById("depthParallaxSlider"),k=document.getElementById("depthToggle"),X=document.getElementById("weightToggle"),$=document.getElementById("loadStatus"),se=document.getElementById("loadMeter"),pe=document.getElementById("viewInfo"),v=new le({alpha:!0,antialias:!0,premultipliedAlpha:!1});v.setClearColor(0,0);v.setPixelRatio(Math.min(window.devicePixelRatio||1,2));v.outputColorSpace=q;_.appendChild(v.domElement);const J=new ne,d=new oe(-1,1,1,-1,.01,10);d.position.set(0,0,4);d.lookAt(0,0,0);const i={azimuth:0,elevation:0};let o=null,m=[],h=new Map,p=null,j=null,B=0;function V(e,t,a){return Math.min(a,Math.max(t,e))}function F(e){/^#[0-9a-fA-F]{6}$/.test(e)&&(E.style.backgroundColor=e,L.value=e,M.value=e)}function z(e,t){const a=t>0?Math.round(e/t*100):0;se.style.width=`${a}%`,$.textContent=t>0?`已加载 ${e} / ${t} 张贴图。`:"等待读取 manifest。"}function g(e,t){return`${e}:${t}`}function O(e,t){if(t<=e[0])return{lower:0,upper:0,t:0};const a=e.length-1;if(t>=e[a])return{lower:a,upper:a,t:0};for(let l=0;l<e.length-1;l+=1){const n=e[l],u=e[l+1];if(t>=n&&t<=u)return{lower:l,upper:l+1,t:(t-n)/Math.max(u-n,1e-4)}}return{lower:0,upper:0,t:0}}function Q(){const{azimuths:e,elevations:t}=o.grid,a=O(e,i.azimuth),l=O(t,i.elevation);return{x:a.lower+a.t,y:l.lower+l.t,azSpan:a,elSpan:l}}function T(e,t,a){!t||a<=1e-4||e.set(t.id,{view:t,weight:(e.get(t.id)?.weight??0)+a})}function me(){if(!o)return[];const e=Q();if(f.value==="nearest"){const U=Math.round(e.y),r=Math.round(e.x),c=h.get(g(U,r));return c?[{view:c,weight:1}]:[]}const t=new Map,a=1-e.azSpan.t,l=e.azSpan.upper===e.azSpan.lower?0:e.azSpan.t,n=1-e.elSpan.t,u=e.elSpan.upper===e.elSpan.lower?0:e.elSpan.t;return T(t,h.get(g(e.elSpan.lower,e.azSpan.lower)),a*n),T(t,h.get(g(e.elSpan.lower,e.azSpan.upper)),l*n),T(t,h.get(g(e.elSpan.upper,e.azSpan.lower)),a*u),T(t,h.get(g(e.elSpan.upper,e.azSpan.upper)),l*u),[...t.values()]}function C(e,t){const a=document.createDocumentFragment(),l=document.createElement("dt"),n=document.createElement("dd");return l.textContent=e,n.textContent=t,a.append(l,n),a}function he(){const e=me();if(pe.replaceChildren(C("横向",`${i.azimuth.toFixed(1)}°`),C("纵向",`${i.elevation.toFixed(1)}°`),C("模式",f.options[f.selectedIndex]?.textContent??f.value),C("深度",k.checked?"显示 depth atlas":`视差 ${Number(b.value).toFixed(3)}`),C("参与视角",e.map(({view:t,weight:a})=>`${t.id}: ${(a*100).toFixed(0)}%`).join(" / "))),!X.checked){A.hidden=!0;return}A.hidden=!1,A.innerHTML=`<strong>四邻域采样权重</strong><br>${e.map(({view:t,weight:a})=>`${t.row+1} 行 ${t.column+1} 列：${(a*100).toFixed(1)}%`).join("<br>")}`}async function Y(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} HTTP ${t.status}`);return createImageBitmap(await t.blob())}async function ge(){let e=0;const t=m.length*(o.depth?2:1);z(0,t);const a=o.resolution,l=document.createElement("canvas"),n=document.createElement("canvas");l.width=n.width=o.grid.columns*a,l.height=n.height=o.grid.rows*a;const u=l.getContext("2d",{alpha:!0}),U=n.getContext("2d",{alpha:!0});await Promise.all(m.flatMap(s=>{const R=Y(s.imageUrl).then(x=>{u.drawImage(x,s.column*a,s.row*a,a,a),x.close?.(),e+=1,z(e,t)});if(!s.depthUrl)return[R];const ae=Y(s.depthUrl).then(x=>{U.drawImage(x,s.column*a,s.row*a,a,a),x.close?.(),e+=1,z(e,t)});return[R,ae]}));const r=new H(l);r.colorSpace=q,r.flipY=!1,r.wrapS=D,r.wrapT=D,r.minFilter=N,r.magFilter=N,r.generateMipmaps=!1;const c=new H(n);return c.flipY=!1,c.wrapS=D,c.wrapT=D,c.minFilter=W,c.magFilter=W,c.generateMipmaps=!1,{colorTexture:r,depthTexture:c}}function fe(e,t){return new ie({transparent:!0,depthWrite:!1,depthTest:!1,side:ue,uniforms:{uColorAtlas:{value:e},uDepthAtlas:{value:t},uGrid:{value:new G(o.grid.columns,o.grid.rows)},uSampleCell:{value:new G(0,0)},uDepthScale:{value:Number(b.value)},uShowDepth:{value:!1},uNearest:{value:!1},uHasDepth:{value:!!o.depth},uHalfTexel:{value:.5/o.resolution}},vertexShader:`
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;

      uniform sampler2D uColorAtlas;
      uniform sampler2D uDepthAtlas;
      uniform vec2 uGrid;
      uniform vec2 uSampleCell;
      uniform float uDepthScale;
      uniform float uHalfTexel;
      uniform bool uShowDepth;
      uniform bool uNearest;
      uniform bool uHasDepth;

      varying vec2 vUv;

      vec2 cellAtlasUv(vec2 cell, vec2 localUv) {
        vec2 safeUv = clamp(localUv, vec2(uHalfTexel), vec2(1.0 - uHalfTexel));
        return (cell + safeUv) / uGrid;
      }

      float decodeDepth(vec4 packedDepth) {
        float highByte = floor(packedDepth.r * 255.0 + 0.5);
        float lowByte = floor(packedDepth.g * 255.0 + 0.5);
        return (highByte * 256.0 + lowByte) / 65535.0;
      }

      vec4 sampleColorCell(vec2 cell, vec2 targetCell, out float decodedDepth) {
        vec2 topLeftUv = vec2(vUv.x, 1.0 - vUv.y);
        vec4 rawDepth = texture2D(uDepthAtlas, cellAtlasUv(cell, topLeftUv));
        decodedDepth = uHasDepth ? decodeDepth(rawDepth) : 0.5;

        vec2 viewDelta = targetCell - cell;
        vec2 parallaxUv = topLeftUv + viewDelta * (decodedDepth - 0.5) * uDepthScale;
        parallaxUv = clamp(parallaxUv, vec2(uHalfTexel), vec2(1.0 - uHalfTexel));

        decodedDepth = uHasDepth ? decodeDepth(texture2D(uDepthAtlas, cellAtlasUv(cell, parallaxUv))) : 0.5;
        return texture2D(uColorAtlas, cellAtlasUv(cell, parallaxUv));
      }

      void addSample(inout vec4 accum, inout float depthAccum, vec2 cell, vec2 targetCell, float weight) {
        if (weight <= 0.0001) {
          return;
        }

        float decodedDepth = 0.5;
        vec4 color = sampleColorCell(cell, targetCell, decodedDepth);
        float weightedAlpha = color.a * weight;
        accum.rgb += color.rgb * weightedAlpha;
        accum.a += weightedAlpha;
        depthAccum += decodedDepth * weightedAlpha;
      }

      void main() {
        vec2 maxCell = uGrid - vec2(1.0);
        vec2 targetCell = clamp(uSampleCell, vec2(0.0), maxCell);

        if (uNearest) {
          targetCell = clamp(floor(targetCell + vec2(0.5)), vec2(0.0), maxCell);
        }

        vec2 lowerCell = floor(targetCell);
        vec2 upperCell = min(lowerCell + vec2(1.0), maxCell);
        vec2 blendT = targetCell - lowerCell;

        if (uNearest) {
          lowerCell = targetCell;
          upperCell = targetCell;
          blendT = vec2(0.0);
        }

        vec4 accum = vec4(0.0);
        float depthAccum = 0.0;
        addSample(accum, depthAccum, vec2(lowerCell.x, lowerCell.y), targetCell, (1.0 - blendT.x) * (1.0 - blendT.y));
        addSample(accum, depthAccum, vec2(upperCell.x, lowerCell.y), targetCell, blendT.x * (1.0 - blendT.y));
        addSample(accum, depthAccum, vec2(lowerCell.x, upperCell.y), targetCell, (1.0 - blendT.x) * blendT.y);
        addSample(accum, depthAccum, vec2(upperCell.x, upperCell.y), targetCell, blendT.x * blendT.y);

        if (accum.a <= 0.0001) {
          discard;
        }

        vec3 color = accum.rgb / accum.a;
        float depthValue = depthAccum / accum.a;
        if (uShowDepth) {
          color = vec3(depthValue);
        }

        gl_FragColor = vec4(color, accum.a);
      }
    `})}function w(){if(!p||!o)return;const e=Q();p.uniforms.uSampleCell.value.set(e.x,e.y),p.uniforms.uDepthScale.value=Number(b.value),p.uniforms.uShowDepth.value=k.checked,p.uniforms.uNearest.value=f.value==="nearest",he(),ee()}function Z(){const e=_.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),a=Math.max(1,Math.round(e.height));v.setSize(t,a,!1);const l=t/a,n=1.18;d.left=-n*l,d.right=n*l,d.top=n,d.bottom=-n,d.updateProjectionMatrix(),ee()}function ee(){B||(B=requestAnimationFrame(()=>{B=0,v.render(J,d)}))}function ve(e){return{...e,imageUrl:new URL(e.image,I).href,depthUrl:e.depth?new URL(e.depth,I).href:null}}function we(e){o=e,m=e.views.map(ve),h=new Map(m.map(l=>[g(l.row,l.column),l]));const{azimuths:t,elevations:a}=e.grid;S.min=Math.min(...t),S.max=Math.max(...t),y.min=Math.min(...a),y.max=Math.max(...a),K.hidden=!0}function P(e){const{azimuths:t,elevations:a}=o.grid;i.azimuth=V(e.azimuth,Math.min(...t),Math.max(...t)),i.elevation=V(e.elevation,Math.min(...a),Math.max(...a)),S.value=i.azimuth,y.value=i.elevation,w()}function te(e){if(!de.checked||!o)return;const t=E.getBoundingClientRect(),a=((e.clientX-t.left)/t.width-.5)*2,l=((e.clientY-t.top)/t.height-.5)*2,{azimuthRange:n,elevationRange:u}=o.grid;P({azimuth:a*n,elevation:-l*u})}async function xe(){F(M.value),Z();try{const e=await fetch(I,{cache:"no-store"});if(!e.ok)throw new Error(`manifest HTTP ${e.status}`);we(await e.json());const{colorTexture:t,depthTexture:a}=await ge();p=fe(t,a),j=new re(new ce(1.88,1.88),p),J.add(j),w(),$.textContent=o.depth?`已加载 ${m.length} 张 RGBA 和 ${m.length} 张深度图。`:`已加载 ${m.length} 张 RGBA 图，当前 manifest 没有深度图。`}catch(e){K.hidden=!1,$.textContent=`未找到可用渲染输出：${e.message}`}}L.addEventListener("input",()=>F(L.value));M.addEventListener("change",()=>F(M.value));S.addEventListener("input",()=>P({...i,azimuth:Number(S.value)}));y.addEventListener("input",()=>P({...i,elevation:Number(y.value)}));E.addEventListener("pointermove",te);E.addEventListener("pointerdown",te);f.addEventListener("change",w);b.addEventListener("input",w);k.addEventListener("change",w);X.addEventListener("change",w);window.addEventListener("resize",Z);xe();
