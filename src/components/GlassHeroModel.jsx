import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import bxzmModelUrl from '../assets/bxzm.glb?url';

const glassMaterialSettings = {
  color: 0xecffff,
  metalness: 0,
  roughness: 0.76,
  transmission: 0.36,
  thickness: 1.95,
  ior: 1.2,
  dispersion: 0.38,
  transparent: true,
  opacity: 0.74,
  clearcoat: 0.92,
  clearcoatRoughness: 0.38,
  specularIntensity: 1.12,
  envMapIntensity: 2.25,
  sheen: 0.42,
  sheenColor: 0xcfffff,
  sheenRoughness: 0.84,
  iridescence: 0.3,
  iridescenceIOR: 1.14,
  iridescenceThicknessRange: [90, 420],
  emissive: 0xeaffff,
  emissiveIntensity: 0.08,
  attenuationColor: 0xbffcff,
  attenuationDistance: 0.52,
};

function createFresnelGlassMaterial(settings = glassMaterialSettings, rimStrength = 0.38) {
  const material = new THREE.MeshPhysicalMaterial(settings);
  material.side = THREE.FrontSide;
  material.depthWrite = true;
  material.depthTest = true;
  material.forceSinglePass = true;
  material.premultipliedAlpha = true;
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
      float kigttsFrostGrain = smoothstep(0.18, 1.0, kigttsFrostNoise);
      float kigttsChroma = vKigttsFresnel * ${rimStrength.toFixed(3)};
      gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.9, 0.995, 1.0), 0.26 + kigttsFrostGrain * 0.052);
      gl_FragColor.r += kigttsChroma * 0.17;
      gl_FragColor.g += kigttsChroma * 0.026;
      gl_FragColor.b += kigttsChroma * 0.24;
      gl_FragColor.rgb += vec3(0.0, 0.68, 0.6) * vKigttsFresnel * 0.075;
      gl_FragColor.rgb += vec3(1.0, 1.0, 1.0) * pow(vKigttsFresnel, 1.55) * 0.09;
      gl_FragColor.a = min(gl_FragColor.a + 0.24 + vKigttsFresnel * 0.3, 0.94);
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
    color: 0xf4ffff,
    opacity: 0.8,
    transmission: 0.28,
    roughness: 0.82,
    emissiveIntensity: 0.085,
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
    opacity: 0.76,
    transmission: 0.3,
    roughness: 0.8,
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
    renderer.toneMappingExposure = 1.58;
    mountNode.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;

    const root = new THREE.Group();
    root.rotation.set(-0.06, 0.24, 0.02);
    scene.add(root);

    scene.add(new THREE.HemisphereLight(0xf2ffff, 0x041011, 2.85));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(4.4, 5.4, 5.6);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xc8ffff, 2.4);
    fillLight.position.set(-2.2, 1.6, 3.6);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(0x8ff5f7, 3.6);
    rimLight.position.set(-3.8, 1.6, -3.2);
    scene.add(rimLight);
    const cursorLight = new THREE.PointLight(0xffffff, 0, 4.6, 1.45);
    cursorLight.position.set(0.8, 0.4, 2.6);
    scene.add(cursorLight);
    const cursorState = { x: 0.8, y: 0.4, targetX: 0.8, targetY: 0.4, hover: 0 };

    const fallbackModel = createFallbackModel();
    fallbackModel.scale.setScalar(modelScale);
    fallbackModel.visible = false;
    root.add(fallbackModel);

    const materialSettings = { ...glassMaterialSettings };
    const accentMaterialSettings = {
      ...glassMaterialSettings,
      color: 0xf3ffff,
      opacity: 0.76,
      transmission: 0.3,
      roughness: 0.82,
      emissiveIntensity: 0.095,
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
            child.material = createFresnelGlassMaterial(isAccent ? accentMaterialSettings : materialSettings, isAccent ? 0.56 : 0.42);
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

    const handlePointerLeave = () => {
      cursorState.hover = 0;
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
      cursorLight.intensity += ((cursorState.hover ? 3.8 : 0.15) - cursorLight.intensity) * 0.12;

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
            MODEL {loadProgress || 1}%
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}
