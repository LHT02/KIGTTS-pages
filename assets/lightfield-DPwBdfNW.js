import"./modulepreload-polyfill-B5Qt9EMX.js";import{W as Z,S as j,a as ee,O as te,M as le,P as ne,d as oe,c as ae,V as F,D as re,C as ce,b as $,L as P}from"./three.module-BpIZQv1S.js";const B=new URL("./renders/manifest.json",window.location.href),b=document.getElementById("stage"),Y=document.getElementById("threeStage"),z=document.getElementById("emptyState"),S=document.getElementById("sampleOverlay"),W=document.getElementById("backgroundColor"),A=document.getElementById("backgroundText"),y=document.getElementById("viewXSlider"),C=document.getElementById("viewYSlider"),O=document.getElementById("pointerToggle"),f=document.getElementById("apertureSlider"),w=document.getElementById("focusSlider"),x=document.getElementById("intensitySlider"),T=document.getElementById("depthToggle"),I=document.getElementById("sampleToggle"),L=document.getElementById("loadStatus"),ue=document.getElementById("loadMeter"),ie=document.getElementById("viewInfo"),v=new Z({alpha:!0,antialias:!0,premultipliedAlpha:!1});v.setClearColor(0,0);v.setPixelRatio(Math.min(window.devicePixelRatio||1,2));v.outputColorSpace=j;Y.appendChild(v.domElement);const X=new ee,d=new te(-1,1,1,-1,.01,10);d.position.set(0,0,4);d.lookAt(0,0,0);const a={x:0,y:0};let n=null,c=[],i=null,V=null,E=0;function N(e,t,l){return Math.min(l,Math.max(t,e))}function M(e){/^#[0-9a-fA-F]{6}$/.test(e)&&(b.style.backgroundColor=e,W.value=e,A.value=e)}function R(){a.x=0,a.y=0,y.value="0",C.value="0",O.checked=!1,f.value="0",w.value="0",x.value="1.35",T.checked=!1,I.checked=!1}function U(e,t){const l=t>0?Math.round(e/t*100):0;ue.style.width=`${l}%`,L.textContent=t>0?`已加载 ${e} / ${t} 张贴图。`:"等待读取 manifest。"}function p(e,t){const l=document.createDocumentFragment(),o=document.createElement("dt"),r=document.createElement("dd");return o.textContent=e,r.textContent=t,l.append(o,r),l}function q(){const e=n.grid.columns-1,t=n.grid.rows-1;return{x:(a.x*.5+.5)*e,y:(a.y*.5+.5)*t}}function de(){if(!n)return[];const e=Number(f.value),t=q();if(e<.05){const l=Math.floor(t.x),o=Math.min(l+1,n.grid.columns-1),r=Math.floor(t.y),h=Math.min(r+1,n.grid.rows-1);return c.filter(u=>(u.column===l||u.column===o)&&(u.row===r||u.row===h))}return c.filter(l=>Math.hypot(l.column-t.x,l.row-t.y)<=e+.5)}function se(){if(!n)return;const e=q(),t=de();if(ie.replaceChildren(p("水平视点",`${a.x.toFixed(2)} / cell ${e.x.toFixed(2)}`),p("垂直视点",`${a.y.toFixed(2)} / cell ${e.y.toFixed(2)}`),p("光圈半径",Number(f.value).toFixed(2)),p("焦点偏移",Number(w.value).toFixed(3)),p("显示强度",Number(x.value).toFixed(2)),p("参与视图",`${t.length} / ${c.length}`),p("深度",T.checked?"显示深度图":"关闭")),!I.checked){S.hidden=!0;return}S.hidden=!1,S.innerHTML=`<strong>参与子孔径视图</strong><br>${t.slice(0,24).map(l=>`${l.row+1} 行 ${l.column+1} 列`).join(" / ")}${t.length>24?"<br>...":""}`}async function G(e){const t=await fetch(e,{cache:"no-store"});if(!t.ok)throw new Error(`${e} HTTP ${t.status}`);return createImageBitmap(await t.blob())}function H(e,t=oe){const l=new ce(e);return l.colorSpace=t,l.flipY=!1,l.wrapS=$,l.wrapT=$,l.minFilter=P,l.magFilter=P,l.generateMipmaps=!1,l.needsUpdate=!0,l}async function me(){const e=n.resolution,t=document.createElement("canvas"),l=document.createElement("canvas");t.width=l.width=n.grid.columns*e,t.height=l.height=n.grid.rows*e;const o=t.getContext("2d",{alpha:!0}),r=l.getContext("2d",{alpha:!0});let h=0;const u=c.length*(n.depth?2:1);return U(0,u),await Promise.all(c.flatMap(m=>{const k=G(m.imageUrl).then(g=>{o.drawImage(g,m.column*e,m.row*e,e,e),g.close?.(),h+=1,U(h,u)});if(!m.depthUrl)return[k];const Q=G(m.depthUrl).then(g=>{r.drawImage(g,m.column*e,m.row*e,e,e),g.close?.(),h+=1,U(h,u)});return[k,Q]})),{colorTexture:H(t,j),depthTexture:H(l)}}function pe(e,t){return new ae({transparent:!0,depthWrite:!1,depthTest:!1,side:re,uniforms:{uColorAtlas:{value:e},uDepthAtlas:{value:t},uGrid:{value:new F(n.grid.columns,n.grid.rows)},uViewpoint:{value:new F(0,0)},uAperture:{value:Number(f.value)},uFocus:{value:Number(w.value)},uIntensity:{value:Number(x.value)},uShowDepth:{value:!1},uHasDepth:{value:!!n.depth},uHalfTexel:{value:.5/n.resolution}},vertexShader:`
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
      uniform vec2 uViewpoint;
      uniform float uAperture;
      uniform float uFocus;
      uniform float uIntensity;
      uniform float uHalfTexel;
      uniform bool uShowDepth;
      uniform bool uHasDepth;

      varying vec2 vUv;

      vec2 atlasUv(vec2 cell, vec2 localUv) {
        vec2 safeUv = clamp(localUv, vec2(uHalfTexel), vec2(1.0 - uHalfTexel));
        return (cell + safeUv) / uGrid;
      }

      float decodeDepth(vec4 packedDepth) {
        float highByte = floor(packedDepth.r * 255.0 + 0.5);
        float lowByte = floor(packedDepth.g * 255.0 + 0.5);
        return (highByte * 256.0 + lowByte) / 65535.0;
      }

      float borderMask(vec2 uv) {
        vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
        return inside.x * inside.y;
      }

      void addSample(
        inout vec4 premulAccum,
        inout float depthAccum,
        inout float alphaWeightAccum,
        inout float sampleWeightAccum,
        vec2 cell,
        vec2 localUv,
        float weight
      ) {
        if (weight <= 0.0001) {
          return;
        }

        vec4 color = texture2D(uColorAtlas, atlasUv(cell, localUv));
        vec4 depthPacked = texture2D(uDepthAtlas, atlasUv(cell, localUv));
        float decodedDepth = uHasDepth ? decodeDepth(depthPacked) : 0.5;
        float alphaWeight = color.a * weight;
        premulAccum.rgb += color.rgb * weight;
        premulAccum.a += alphaWeight;
        depthAccum += decodedDepth * alphaWeight;
        alphaWeightAccum += alphaWeight;
        sampleWeightAccum += weight;
      }

      void addBilinear(
        inout vec4 premulAccum,
        inout float depthAccum,
        inout float alphaWeightAccum,
        inout float sampleWeightAccum,
        vec2 topLeftUv,
        vec2 viewCell
      ) {
        vec2 lowerCell = floor(viewCell);
        vec2 upperCell = min(lowerCell + vec2(1.0), uGrid - vec2(1.0));
        vec2 blendT = viewCell - lowerCell;

        addSample(premulAccum, depthAccum, alphaWeightAccum, sampleWeightAccum, vec2(lowerCell.x, lowerCell.y), topLeftUv, (1.0 - blendT.x) * (1.0 - blendT.y));
        addSample(premulAccum, depthAccum, alphaWeightAccum, sampleWeightAccum, vec2(upperCell.x, lowerCell.y), topLeftUv, blendT.x * (1.0 - blendT.y));
        addSample(premulAccum, depthAccum, alphaWeightAccum, sampleWeightAccum, vec2(lowerCell.x, upperCell.y), topLeftUv, (1.0 - blendT.x) * blendT.y);
        addSample(premulAccum, depthAccum, alphaWeightAccum, sampleWeightAccum, vec2(upperCell.x, upperCell.y), topLeftUv, blendT.x * blendT.y);
      }

      void main() {
        vec2 topLeftUv = vec2(vUv.x, 1.0 - vUv.y);
        vec2 maxCell = uGrid - vec2(1.0);
        vec2 viewCell = clamp((uViewpoint * 0.5 + 0.5) * maxCell, vec2(0.0), maxCell);
        vec4 premulAccum = vec4(0.0);
        float depthAccum = 0.0;
        float alphaWeightAccum = 0.0;
        float sampleWeightAccum = 0.0;

        if (uAperture < 0.05) {
          addBilinear(premulAccum, depthAccum, alphaWeightAccum, sampleWeightAccum, topLeftUv, viewCell);
        } else {
          for (int row = 0; row < 9; row++) {
            for (int column = 0; column < 9; column++) {
              vec2 cell = vec2(float(column), float(row));
              if (cell.x >= uGrid.x || cell.y >= uGrid.y) {
                continue;
              }

              vec2 delta = cell - viewCell;
              float distanceToView = length(delta);
              if (distanceToView > uAperture + 0.5) {
                continue;
              }

              vec2 shiftedUv = topLeftUv + delta * uFocus;
              float edge = borderMask(shiftedUv);
              float innerAperture = max(uAperture - 0.5, 0.0);
              float outerAperture = uAperture + 0.5;
              float edgeFeather = 1.0 - smoothstep(innerAperture, outerAperture, distanceToView);
              addSample(premulAccum, depthAccum, alphaWeightAccum, sampleWeightAccum, cell, shiftedUv, edge * edgeFeather);
            }
          }
        }

        if (premulAccum.a <= 0.0001 || sampleWeightAccum <= 0.0001) {
          discard;
        }

        vec3 color = premulAccum.rgb / max(premulAccum.a, 0.0001);
        float alpha = clamp((premulAccum.a / sampleWeightAccum) * mix(1.0, uIntensity, 0.72), 0.0, 1.0);
        float depthValue = depthAccum / max(alphaWeightAccum, 0.0001);
        if (uShowDepth) {
          color = vec3(depthValue);
          alpha = 1.0;
        } else {
          color *= uIntensity;
        }

        gl_FragColor = vec4(color, alpha);
      }
    `})}function s(){!i||!n||(i.uniforms.uViewpoint.value.set(a.x,a.y),i.uniforms.uAperture.value=Number(f.value),i.uniforms.uFocus.value=Number(w.value),i.uniforms.uIntensity.value=Number(x.value),i.uniforms.uShowDepth.value=T.checked,se(),J())}function _(){const e=Y.getBoundingClientRect(),t=Math.max(1,Math.round(e.width)),l=Math.max(1,Math.round(e.height));v.setSize(t,l,!1);const o=t/l,r=1.16;d.left=-r*o,d.right=r*o,d.top=r,d.bottom=-r,d.updateProjectionMatrix(),J()}function J(){E||(E=requestAnimationFrame(()=>{E=0,v.render(X,d)}))}function he(e){return{...e,imageUrl:new URL(e.image,B).href,depthUrl:e.depth?new URL(e.depth,B).href:null}}function fe(e){n=e,c=e.views.map(he),z.hidden=!0}function D(e){a.x=N(e.x,-1,1),a.y=N(e.y,-1,1),y.value=a.x,C.value=a.y,s()}function K(e){if(!O.checked||!n)return;const t=b.getBoundingClientRect(),l=((e.clientX-t.left)/t.width-.5)*2,o=((e.clientY-t.top)/t.height-.5)*2;D({x:l,y:-o})}async function ve(){R(),M(A.value),_();try{const e=await fetch(B,{cache:"no-store"});if(!e.ok)throw new Error(`manifest HTTP ${e.status}`);fe(await e.json());const{colorTexture:t,depthTexture:l}=await me();i=pe(t,l),V=new le(new ne(1.88,1.88),i),X.add(V),s(),[0,150].forEach(o=>{window.setTimeout(()=>{R(),s()},o)}),L.textContent=n.depth?`已加载 ${c.length} 张 RGBA 和 ${c.length} 张深度图。`:`已加载 ${c.length} 张 RGBA 图，当前 manifest 没有深度图。`}catch(e){z.hidden=!1,L.textContent=`未找到可用渲染输出：${e.message}`}}W.addEventListener("input",()=>M(W.value));A.addEventListener("change",()=>M(A.value));y.addEventListener("input",()=>D({...a,x:Number(y.value)}));C.addEventListener("input",()=>D({...a,y:Number(C.value)}));b.addEventListener("pointermove",K);b.addEventListener("pointerdown",K);f.addEventListener("input",s);w.addEventListener("input",s);x.addEventListener("input",s);T.addEventListener("change",s);I.addEventListener("change",s);window.addEventListener("resize",_);ve();
