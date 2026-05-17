import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import bxzmModelUrl from '../assets/bxzm.glb?url';

const glassMaterialSettings = {
  color: 0xe6ffff,
  metalness: 0,
  roughness: 0.28,
  transmission: 1,
  thickness: 2.18,
  ior: 1.51,
  dispersion: 0.72,
  transparent: false,
  opacity: 1,
  clearcoat: 1,
  clearcoatRoughness: 0.045,
  specularIntensity: 1.85,
  specularColor: 0xffffff,
  envMapIntensity: 3.25,
  sheen: 0.08,
  sheenColor: 0xd8ffff,
  sheenRoughness: 0.36,
  iridescence: 0.24,
  iridescenceIOR: 1.32,
  iridescenceThicknessRange: [120, 460],
  emissive: 0xdfffff,
  emissiveIntensity: 0.006,
  attenuationColor: 0x7ff7f2,
  attenuationDistance: 2.75,
};

function createRefractionBackdropTexture(size = 640) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  const base = context.createLinearGradient(0, 0, size, size);
  base.addColorStop(0, '#021514');
  base.addColorStop(0.46, '#063231');
  base.addColorStop(1, '#020d0d');
  context.fillStyle = base;
  context.fillRect(0, 0, size, size);

  context.globalCompositeOperation = 'lighter';
  context.filter = 'blur(24px)';
  for (let index = 0; index < 12; index += 1) {
    const x = size * (0.12 + index * 0.072);
    const height = size * (0.26 + Math.sin(index * 1.31) * 0.12);
    const gradient = context.createLinearGradient(x, size * 0.15, x + size * 0.08, size * 0.82);
    gradient.addColorStop(0, 'rgba(130,255,245,0)');
    gradient.addColorStop(0.42, 'rgba(130,255,245,0.10)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    context.fillStyle = gradient;
    context.save();
    context.translate(x, size * 0.5);
    context.rotate(-0.34 + Math.sin(index) * 0.18);
    context.fillRect(-size * 0.018, -height * 0.5, size * 0.04, height);
    context.restore();
  }

  context.filter = 'blur(42px)';
  const glow = context.createRadialGradient(size * 0.45, size * 0.48, 0, size * 0.45, size * 0.48, size * 0.38);
  glow.addColorStop(0, 'rgba(116,255,244,0.26)');
  glow.addColorStop(0.52, 'rgba(3,131,135,0.16)');
  glow.addColorStop(1, 'rgba(3,131,135,0)');
  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.08, 1.08);
  texture.needsUpdate = true;
  return texture;
}

function createFresnelGlassMaterial(settings = glassMaterialSettings, rimStrength = 0.34) {
  const material = new THREE.MeshPhysicalMaterial(settings);
  material.side = THREE.FrontSide;
  material.depthWrite = true;
  material.depthTest = true;
  material.forceSinglePass = true;
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      '#include <common>\nvarying float vKigttsFresnel;',
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <fog_vertex>',
      `#include <fog_vertex>
      vec3 kigttsFresnelNormal = normalize(normalMatrix * normal);
      vec3 kigttsFresnelView = normalize(-mvPosition.xyz);
      vKigttsFresnel = pow(1.0 - clamp(abs(dot(kigttsFresnelNormal, kigttsFresnelView)), 0.0, 1.0), 2.35);`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      '#include <common>\nvarying float vKigttsFresnel;',
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `float kigttsFrostNoise = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      float kigttsFrostGrain = smoothstep(0.48, 1.0, kigttsFrostNoise);
      float kigttsChroma = vKigttsFresnel * ${rimStrength.toFixed(3)};
      float kigttsLiquidWave = sin(gl_FragCoord.x * 0.026 - gl_FragCoord.y * 0.018) * 0.5 + 0.5;
      float kigttsSpecularStreak = smoothstep(0.92, 1.0, kigttsLiquidWave) * (0.035 + vKigttsFresnel * 0.16);
      gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.86, 1.0, 0.985), 0.025 + kigttsFrostGrain * 0.012);
      gl_FragColor.r += kigttsChroma * 0.12;
      gl_FragColor.g += kigttsChroma * 0.012;
      gl_FragColor.b += kigttsChroma * 0.2;
      gl_FragColor.rgb += vec3(0.0, 0.66, 0.60) * vKigttsFresnel * 0.075;
      gl_FragColor.rgb += vec3(1.0, 1.0, 1.0) * pow(vKigttsFresnel, 1.5) * 0.24;
      gl_FragColor.rgb += vec3(0.86, 1.0, 0.98) * kigttsSpecularStreak * 1.35;
      #include <dithering_fragment>`,
    );
  };
  material.customProgramCacheKey = () => `kigtts-fresnel-${rimStrength}`;
  return material;
}

function disposeObject3d(object3d) {
  object3d.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material.dispose());
    }
  });
}

function createFallbackModel() {
  const group = new THREE.Group();
  const glass = createFresnelGlassMaterial(glassMaterialSettings);
  const darkGlass = createFresnelGlassMaterial({
    ...glassMaterialSettings,
    color: 0xe8ffff,
    transmission: 0.94,
    roughness: 0.36,
    thickness: 1.9,
    emissiveIntensity: 0.038,
  }, 0.52);

  const panel = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.72, 0.08, 4, 4, 1), darkGlass.clone());
  panel.position.set(0.22, 0.02, 0);
  group.add(panel);

  for (let index = 0; index < 5; index += 1) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(1.22 - index * 0.12, 0.08, 0.03), glass.clone());
    bar.position.set(0.16, 0.9 - index * 0.24, 0.08);
    group.add(bar);
  }

  const card = new THREE.Mesh(new THREE.BoxGeometry(0.66, 1.72, 0.22, 3, 3, 2), glass.clone());
  card.position.set(-1.15, 0.28, -0.18);
  card.rotation.z = -0.62;
  group.add(card);

  const mask = new THREE.Mesh(new THREE.SphereGeometry(0.68, 48, 32), darkGlass.clone());
  mask.position.set(-1.08, -1.1, 0.18);
  mask.scale.set(1.12, 0.82, 0.72);
  group.add(mask);

  const penMaterial = createFresnelGlassMaterial({
    ...glassMaterialSettings,
    color: 0xffffff,
    opacity: 0.4,
    transmission: 0.72,
    roughness: 0.42,
  }, 0.44);

  for (let index = 0; index < 2; index += 1) {
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.9, 20), penMaterial.clone());
    pen.position.set(1.28 + index * 0.26, -0.12 - index * 0.04, -0.1);
    pen.rotation.z = -0.42 - index * 0.16;
    group.add(pen);
  }

  return group;
}

export function GlassHeroModel({ densityScale = 1, modelScale = 1, sx }) {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const [loadProgress, setLoadProgress] = useState(0);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(2.35, 0.46, 6.15);
    camera.lookAt(0.08, 0.04, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.26;
    mountNode.appendChild(renderer.domElement);

    RectAreaLightUniformsLib.init();
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.02).texture;
    scene.environment = environment;

    const backdropTexture = createRefractionBackdropTexture();
    const refractionBackdrop = new THREE.Mesh(
      new THREE.PlaneGeometry(5.9, 4.55),
      new THREE.MeshBasicMaterial({
        map: backdropTexture,
        color: 0xffffff,
        colorWrite: false,
        depthWrite: false,
        depthTest: false,
      }),
    );
    refractionBackdrop.position.set(-0.1, -0.08, -1.35);
    refractionBackdrop.renderOrder = -30;
    refractionBackdrop.onBeforeRender = (activeRenderer) => {
      refractionBackdrop.material.colorWrite = activeRenderer.getRenderTarget() !== null;
    };
    refractionBackdrop.onAfterRender = () => {
      refractionBackdrop.material.colorWrite = false;
    };
    scene.add(refractionBackdrop);

    const root = new THREE.Group();
    root.rotation.set(-0.06, 0.24, 0.02);
    scene.add(root);

    scene.add(new THREE.HemisphereLight(0xf4ffff, 0x020808, 0.42));
    const createAreaLight = ({ color, intensity, width, height, position, target }) => {
      const light = new THREE.RectAreaLight(color, intensity, width, height);
      light.position.set(...position);
      light.lookAt(...target);
      scene.add(light);
      return light;
    };

    createAreaLight({
      color: 0x003b3e,
      intensity: 2.9,
      width: 2.2,
      height: 2.2,
      position: [-2.0, 1.25, 2.15],
      target: [0.0, 0.0, 0.0],
    });
    createAreaLight({
      color: 0x003b3e,
      intensity: 2.75,
      width: 2.2,
      height: 2.2,
      position: [2.75, 0.16, 2.55],
      target: [0.15, -0.06, 0.0],
    });
    createAreaLight({
      color: 0x003b3e,
      intensity: 1.7,
      width: 2.4,
      height: 2.4,
      position: [4.2, -2.6, 2.45],
      target: [0.15, -0.1, 0.0],
    });
    createAreaLight({
      color: 0xffffff,
      intensity: 6.8,
      width: 2.4,
      height: 2.4,
      position: [-0.72, -3.15, 2.8],
      target: [0.05, 0.04, 0.0],
    });
    const cursorLight = new THREE.PointLight(0xffffff, 0, 4.8, 1.35);
    cursorLight.position.set(0.8, 0.4, 2.6);
    scene.add(cursorLight);
    const cursorState = { x: 0.8, y: 0.4, targetX: 0.8, targetY: 0.4, hover: 0 };

    const fallbackModel = createFallbackModel();
    fallbackModel.scale.setScalar(modelScale);
    fallbackModel.visible = false;
    root.add(fallbackModel);

    const materialSettings = { ...glassMaterialSettings };
    const accentMaterialSettings = {
      ...materialSettings,
      color: 0xffffff,
      transmission: 1,
      roughness: 0.22,
      thickness: 1.72,
      emissiveIntensity: 0.012,
    };

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    loader.setDRACOLoader(dracoLoader);

    let disposed = false;
    loader.load(
      bxzmModelUrl,
      (gltf) => {
        if (disposed) {
          disposeObject3d(gltf.scene);
          return;
        }

        const model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z, 0.001);

        model.position.sub(center);
        model.scale.setScalar((3.75 * modelScale) / maxAxis);
        model.rotation.set(0.06, 0.2, 0.02);
        model.traverse((child) => {
          if (child.isMesh) {
            const lowerName = child.name.toLowerCase();
            if (/(grid|wire|helper|axis|line)/.test(lowerName)) {
              child.visible = false;
              return;
            }

            child.castShadow = false;
            child.receiveShadow = false;
            const isAccent = lowerName.includes('circle');
            child.material = createFresnelGlassMaterial(isAccent ? accentMaterialSettings : materialSettings, isAccent ? 0.48 : 0.34);
          }
        });

        fallbackModel.visible = false;
        root.add(model);
        modelRef.current = model;
        setLoadProgress(100);
        setModelReady(true);
      },
      (event) => {
        if (!event.total) {
          return;
        }
        setLoadProgress(Math.min(96, Math.round((event.loaded / event.total) * 100)));
      },
      () => {
        fallbackModel.visible = true;
        modelRef.current = fallbackModel;
        setLoadProgress(100);
        setModelReady(true);
      },
    );

    const resizeRenderer = () => {
      const rect = mountNode.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resizeRenderer);
    resizeObserver.observe(mountNode);
    resizeRenderer();

    const resetMouseTilt = () => {
      targetTiltRef.current = { x: 0, y: 0 };
    };

    const handlePointerMove = (event) => {
      const rect = mountNode.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      const normalizedY = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
      targetTiltRef.current = {
        x: THREE.MathUtils.clamp(normalizedY, -1, 1),
        y: THREE.MathUtils.clamp(normalizedX, -1, 1),
      };
      cursorState.targetX = THREE.MathUtils.clamp(normalizedX, -1, 1) * 1.7 + 0.34;
      cursorState.targetY = THREE.MathUtils.clamp(-normalizedY, -1, 1) * 1.35 + 0.12;
      cursorState.hover = 1;
    };

    const handlePointerEnter = () => {
      cursorState.hover = 1;
    };

    const handlePointerLeave = (event) => {
      cursorState.hover = 0;
      if (event.pointerType === 'mouse') {
        resetMouseTilt();
      }
    };

    const handleDeviceOrientation = (event) => {
      if (typeof event.gamma !== 'number' || typeof event.beta !== 'number') {
        return;
      }

      targetTiltRef.current = {
        x: THREE.MathUtils.clamp((event.beta - 45) / 42, -1, 1),
        y: THREE.MathUtils.clamp(event.gamma / 42, -1, 1),
      };
    };

    mountNode.addEventListener('pointermove', handlePointerMove, { passive: true });
    mountNode.addEventListener('pointerenter', handlePointerEnter, { passive: true });
    mountNode.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    let frameId = 0;
    const clock = new THREE.Clock();
    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const targetTilt = targetTiltRef.current;
      root.rotation.x += (-0.06 + targetTilt.x * 0.11 - root.rotation.x) * 0.055;
      root.rotation.y += (0.24 - targetTilt.y * 0.18 - root.rotation.y) * 0.055;
      root.rotation.z = Math.sin(elapsed * 0.45) * 0.018;
      root.position.y = Math.sin(elapsed * 0.75) * 0.045;
      cursorState.x += (cursorState.targetX - cursorState.x) * 0.16;
      cursorState.y += (cursorState.targetY - cursorState.y) * 0.16;
      cursorLight.position.set(cursorState.x, cursorState.y, 2.55);
      cursorLight.intensity += ((cursorState.hover ? 5.2 : 0.22) - cursorLight.intensity) * 0.12;
      backdropTexture.offset.set(Math.sin(elapsed * 0.035) * 0.018, Math.cos(elapsed * 0.04) * 0.014);

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };
    renderFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      mountNode.removeEventListener('pointermove', handlePointerMove);
      mountNode.removeEventListener('pointerenter', handlePointerEnter);
      mountNode.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      resizeObserver.disconnect();
      dracoLoader.dispose();
      disposeObject3d(root);
      refractionBackdrop.geometry.dispose();
      refractionBackdrop.material.dispose();
      backdropTexture.dispose();
      environment.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [modelScale]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        minHeight: { xs: 250, sm: 360, lg: 420 },
        overflow: 'visible',
        pointerEvents: 'auto',
        ...sx,
      }}
    >
      <Box
        ref={mountRef}
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: modelReady ? 1 : 0.58,
          transform: modelReady ? 'scale(1)' : 'scale(0.985)',
          transition: 'opacity 520ms ease, transform 520ms ease',
          filter: `drop-shadow(0 ${Math.round(18 * densityScale)}px ${Math.round(34 * densityScale)}px rgba(0,0,0,0.28))`,
          '& canvas': {
            width: '100%',
            height: '100%',
            display: 'block',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: '10% 8% 8% 8%',
          zIndex: -1,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#038387', 0.26)} 0%, transparent 68%)`,
          filter: 'blur(28px)',
        }}
      />
      {!modelReady ? (
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: '9%',
            transform: 'translateX(-50%)',
            px: 1.2,
            py: 0.7,
            borderRadius: 0.5,
            backgroundColor: alpha('#071112', 0.74),
            border: `1px solid ${alpha('#8ff5f7', 0.16)}`,
            backdropFilter: 'blur(12px)',
          }}
        >
          <Typography sx={{ color: '#8ff5f7', fontSize: '0.72rem', letterSpacing: '0.12em', fontWeight: 700 }}>
            模型加载 {loadProgress || 1}%
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
