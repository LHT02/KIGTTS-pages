import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import bxzmModelUrl from '../assets/bxzm.glb?url';

const glassMaterialSettings = {
  color: 0x8ddcde,
  metalness: 0.05,
  roughness: 0.22,
  transmission: 0.62,
  thickness: 0.52,
  ior: 1.36,
  transparent: true,
  opacity: 0.54,
  clearcoat: 0.55,
  clearcoatRoughness: 0.18,
};

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
  const glass = new THREE.MeshPhysicalMaterial(glassMaterialSettings);
  const darkGlass = new THREE.MeshPhysicalMaterial({
    ...glassMaterialSettings,
    color: 0x071112,
    opacity: 0.82,
    transmission: 0.28,
  });

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

  const penMaterial = new THREE.MeshPhysicalMaterial({
    ...glassMaterialSettings,
    color: 0x6fcfd2,
    opacity: 0.38,
  });

  for (let index = 0; index < 2; index += 1) {
    const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.9, 20), penMaterial.clone());
    pen.position.set(1.28 + index * 0.26, -0.12 - index * 0.04, -0.1);
    pen.rotation.z = -0.42 - index * 0.16;
    group.add(pen);
  }

  return group;
}

export function GlassHeroModel({ densityScale = 1, sx }) {
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
    camera.position.set(0, 0.12, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountNode.appendChild(renderer.domElement);

    const root = new THREE.Group();
    root.rotation.set(-0.08, -0.18, 0.02);
    scene.add(root);

    scene.add(new THREE.HemisphereLight(0xbdfcff, 0x041011, 2.1));
    const keyLight = new THREE.DirectionalLight(0xbdfcff, 3.2);
    keyLight.position.set(3.4, 4.8, 5.2);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x038387, 2.4);
    rimLight.position.set(-3.4, 1.2, -3.2);
    scene.add(rimLight);

    const fallbackModel = createFallbackModel();
    fallbackModel.visible = false;
    root.add(fallbackModel);

    const material = new THREE.MeshPhysicalMaterial(glassMaterialSettings);
    const accentMaterial = new THREE.MeshPhysicalMaterial({
      ...glassMaterialSettings,
      color: 0x038387,
      opacity: 0.46,
      transmission: 0.42,
    });

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
        model.scale.setScalar(3.75 / maxAxis);
        model.rotation.set(0.08, -0.18, 0.02);
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = false;
            child.receiveShadow = false;
            child.material = child.name.toLowerCase().includes('circle') ? accentMaterial.clone() : material.clone();
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    let frameId = 0;
    const clock = new THREE.Clock();
    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();
      const targetTilt = targetTiltRef.current;
      root.rotation.x += (-0.08 + targetTilt.x * 0.11 - root.rotation.x) * 0.055;
      root.rotation.y += (-0.18 + targetTilt.y * 0.18 - root.rotation.y) * 0.055;
      root.rotation.z = Math.sin(elapsed * 0.45) * 0.018;
      root.position.y = Math.sin(elapsed * 0.75) * 0.045;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };
    renderFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      resizeObserver.disconnect();
      dracoLoader.dispose();
      disposeObject3d(root);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

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
