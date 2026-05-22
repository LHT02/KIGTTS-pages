import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import matcap1TextureUrl from '../../ART/Mat/matcap1.png?url';
import matcap2TextureUrl from '../../ART/Mat/matcap2.png?url';
import matcap3TextureUrl from '../../ART/Mat/matcap3.png?url';
import matcap4TextureUrl from '../../ART/Mat/matcap4.png?url';
import matcap5TextureUrl from '../../ART/Mat/matcap5.png?url';

// Model URLs — PHP proxy preferred (same-origin), jsDelivr CDN as fallback
const MODEL_URLS = [
  './model.php',
  'https://cdn.jsdelivr.net/gh/KigScope/KIGTTS-pages@main/public/bxzm.data',
];

const fallbackImageUrl = './lod/hero-fallback-900.jpg';

function createMatcapMaterial(matcapTexture, color = 0xffffff, { opaque = false, doubleSided = false } = {}) {
  const alphaCutoff = opaque ? 0.06 : 0.015;
  const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
    color,
  });
  material.side = doubleSided ? THREE.DoubleSide : THREE.FrontSide;
  material.depthWrite = true;
  material.depthTest = true;
  material.depthFunc = THREE.LessEqualDepth;
  material.transparent = !opaque;
  material.alphaTest = 0;
  material.fog = false;
  material.forceSinglePass = true;
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      'vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;',
      `if (matcapColor.a < ${alphaCutoff.toFixed(3)}) discard;
        ${opaque ? '' : 'diffuseColor.a *= matcapColor.a;'}
        vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;`,
    );
  };
  material.customProgramCacheKey = () => `kigtts-matcap-${opaque ? 'opaque' : 'alpha'}-${alphaCutoff}`;
  return material;
}

const matcapTextureEntries = [
  { key: 'matcap1', highUrl: matcap1TextureUrl, lowUrl: './lod/matcap/matcap1-96.png' },
  { key: 'matcap2', highUrl: matcap2TextureUrl, lowUrl: './lod/matcap/matcap2-96.png', doubleSided: true },
  { key: 'matcap3', highUrl: matcap3TextureUrl, lowUrl: './lod/matcap/matcap3-96.png' },
  { key: 'matcap4', highUrl: matcap4TextureUrl, lowUrl: './lod/matcap/matcap4-96.png', opaque: true },
  { key: 'matcap5', highUrl: matcap5TextureUrl, lowUrl: './lod/matcap/matcap5-96.png', doubleSided: true },
];

function configureMatcapTexture(texture) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function resolveMatcapKey(materialName = '') {
  const match = materialName.toLowerCase().match(/matcap\s*[_-]?(\d+)/);
  if (!match) {
    return 'matcap1';
  }

  const key = `matcap${match[1]}`;
  return matcapTextureEntries.some((entry) => entry.key === key) ? key : 'matcap1';
}

function canCreateWebGLContext() {
  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

function disposeObject3d(object3d) {
  const disposedGeometries = new Set();
  const disposedMaterials = new Set();
  object3d.traverse((child) => {
    if (child.geometry && !disposedGeometries.has(child.geometry)) {
      disposedGeometries.add(child.geometry);
      child.geometry.dispose();
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => {
        if (material && !disposedMaterials.has(material)) {
          disposedMaterials.add(material);
          material.dispose();
        }
      });
    }
  });
}

export function GlassHeroModel({ densityScale = 1, modelScale = 1, sx }) {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const targetTiltRef = useRef({ x: 0, y: 0 });
  const [loadProgress, setLoadProgress] = useState(0);
  const [modelReady, setModelReady] = useState(false);
  const [fallbackImage, setFallbackImage] = useState(false);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(2.35, 0.46, 6.15);
    camera.lookAt(0.08, 0.04, 0);

    if (!canCreateWebGLContext()) {
      setFallbackImage(true);
      setLoadProgress(100);
      setModelReady(true);
      return undefined;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setFallbackImage(true);
      setLoadProgress(100);
      setModelReady(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    mountNode.appendChild(renderer.domElement);

    let disposed = false;
    const textureLoader = new THREE.TextureLoader();
    const matcapEntryByKey = Object.fromEntries(matcapTextureEntries.map((entry) => [entry.key, entry]));
    const lowMatcapTextures = Object.fromEntries(
      matcapTextureEntries.map((entry) => [entry.key, configureMatcapTexture(textureLoader.load(entry.lowUrl))]),
    );
    const matcapTextures = { ...lowMatcapTextures };
    const primaryMatcapTexture = matcapTextures.matcap1;

    const root = new THREE.Group();
    root.rotation.set(-0.06, 0.24, 0.02);
    scene.add(root);

    const matcapMaterialCache = new Map();
    const getMatcapMaterial = (sourceMaterial) => {
      const materialName = sourceMaterial?.name ?? '';
      const matcapKey = resolveMatcapKey(materialName);
      const cacheKey = `${matcapKey}:${materialName || 'default'}`;
      if (!matcapMaterialCache.has(cacheKey)) {
        const matcapEntry = matcapEntryByKey[matcapKey] ?? matcapEntryByKey.matcap1;
        const material = createMatcapMaterial(matcapTextures[matcapKey] ?? primaryMatcapTexture, 0xffffff, {
          opaque: Boolean(matcapEntry.opaque),
          doubleSided: Boolean(matcapEntry.doubleSided),
        });
        material.userData.matcapKey = matcapKey;
        matcapMaterialCache.set(
          cacheKey,
          material,
        );
      }

      return matcapMaterialCache.get(cacheKey);
    };

    matcapTextureEntries.forEach((entry) => {
      textureLoader.load(entry.highUrl, (texture) => {
        if (disposed) {
          texture.dispose();
          return;
        }

        configureMatcapTexture(texture);
        matcapTextures[entry.key] = texture;
        matcapMaterialCache.forEach((material) => {
          if (material.userData.matcapKey === entry.key) {
            material.matcap = texture;
            material.needsUpdate = true;
          }
        });
        lowMatcapTextures[entry.key]?.dispose();
      });
    });

    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('./draco/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    // Try PHP proxy first, fallback to jsDelivr CDN
    const modelUrls = MODEL_URLS;
    let modelUrlIndex = 0;
    const tryFetchModel = () => {
      if (modelUrlIndex >= modelUrls.length) {
        setFallbackImage(true);
        setLoadProgress(100);
        setModelReady(true);
        return;
      }
      const url = modelUrls[modelUrlIndex++];
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.arrayBuffer();
        })
        .then((buffer) => {
          loader.parse(
          buffer,
          '',
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
                const materialNames = (Array.isArray(child.material) ? child.material : [child.material])
                  .map((material) => material?.name?.toLowerCase() ?? '')
                  .join(' ');
                if (/(grid|wire|helper|axis|line|background|backdrop|outline|edge|frame|cage|lattice|rig|skeleton|armature)/.test(`${lowerName} ${materialNames}`)) {
                  child.visible = false;
                  return;
                }

                child.castShadow = false;
                child.receiveShadow = false;
                child.renderOrder = 0;
                if (Array.isArray(child.material)) {
                  child.material = child.material.map((material) => getMatcapMaterial(material));
                } else {
                  child.material = getMatcapMaterial(child.material);
                }
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach((material) => {
                  material.depthWrite = true;
                  material.depthTest = true;
                  material.forceSinglePass = true;
                  material.needsUpdate = true;
                });
              }
            });

            root.add(model);
            modelRef.current = model;
            setLoadProgress(100);
            setModelReady(true);
          },
          () => {
            setFallbackImage(true);
            setLoadProgress(100);
            setModelReady(true);
          },
        );
      })
      .catch(() => {
        tryFetchModel();
      });
  };
  tryFetchModel();

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
    };

    const handlePointerLeave = (event) => {
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

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(renderFrame);
    };
    renderFrame();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      mountNode.removeEventListener('pointermove', handlePointerMove);
      mountNode.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      resizeObserver.disconnect();
      dracoLoader.dispose();
      disposeObject3d(root);
      new Set([...Object.values(lowMatcapTextures), ...Object.values(matcapTextures)]).forEach((texture) => texture.dispose());
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
            LOADING {loadProgress || 1}%
          </Typography>
        </Box>
      ) : null}
      {fallbackImage ? (
        <Box
          component="img"
          src={fallbackImageUrl}
          alt="KIGTTS"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 18px 34px rgba(0,0,0,0.28))',
          }}
        />
      ) : null}
    </Box>
  );
}
