const metadataUrl = new URL("./renders/views.json", import.meta.url);

const stage = document.getElementById("stage");
const viewLayers = document.getElementById("viewLayers");
const depthLayers = document.getElementById("depthLayers");
const emptyState = document.getElementById("emptyState");
const backgroundColor = document.getElementById("backgroundColor");
const backgroundText = document.getElementById("backgroundText");
const azimuthSlider = document.getElementById("azimuthSlider");
const elevationSlider = document.getElementById("elevationSlider");
const transitionSlider = document.getElementById("transitionSlider");
const depthOffsetSlider = document.getElementById("depthOffsetSlider");
const blendToggle = document.getElementById("blendToggle");
const rbfToggle = document.getElementById("rbfToggle");
const rbfSigmaSlider = document.getElementById("rbfSigmaSlider");
const rbfViewCountSlider = document.getElementById("rbfViewCountSlider");
const depthToggle = document.getElementById("depthToggle");
const depthOffsetToggle = document.getElementById("depthOffsetToggle");
const viewInfo = document.getElementById("viewInfo");

let metadata = null;
let views = [];
let target = { azimuth: 0, elevation: 0 };
let renderPending = false;
let warpCanvas = null;
let warpContext = null;
let rbfCanvas = null;
let rbfContext = null;
let azimuthBounds = [-24, 24];
let elevationBounds = [0, 0];

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setBackground(value) {
  if (!/^#[0-9a-fA-F]{6}$/.test(value)) {
    return;
  }
  stage.style.backgroundColor = value;
  backgroundColor.value = value;
  backgroundText.value = value;
}

function uniqueSorted(values) {
  return [...new Set(values.map((value) => Number(value.toFixed(3))))].sort((a, b) => a - b);
}

function nearestValue(values, targetValue) {
  return values.reduce((best, value) => (Math.abs(value - targetValue) < Math.abs(best - targetValue) ? value : best), values[0]);
}

function bounds(values) {
  return [Math.min(...values), Math.max(...values)];
}

function imageElement(src, className) {
  const img = document.createElement("img");
  img.decoding = "async";
  img.loading = "eager";
  img.src = src;
  img.className = className;
  return img;
}

function normalizeView(view) {
  return {
    ...view,
    imageUrl: new URL(view.image, metadataUrl).href,
    depthUrl: new URL(view.depth, metadataUrl).href,
  };
}

function prepareLayers() {
  viewLayers.replaceChildren();
  depthLayers.replaceChildren();

  rbfCanvas = document.createElement("canvas");
  rbfCanvas.className = "rbf-blend-canvas";
  rbfCanvas.hidden = true;
  rbfContext = rbfCanvas.getContext("2d", { willReadFrequently: true });
  viewLayers.appendChild(rbfCanvas);

  warpCanvas = document.createElement("canvas");
  warpCanvas.className = "depth-warp-canvas";
  warpCanvas.hidden = true;
  warpContext = warpCanvas.getContext("2d", { willReadFrequently: true });
  viewLayers.appendChild(warpCanvas);
  for (const view of views) {
    view.colorNode = imageElement(view.imageUrl, "color-view");
    view.depthNode = imageElement(view.depthUrl, "depth-view");
    view.colorImage = new Image();
    view.depthImage = new Image();
    view.colorImage.decoding = "async";
    view.depthImage.decoding = "async";
    view.colorImage.src = view.imageUrl;
    view.depthImage.src = view.depthUrl;
    Promise.allSettled([view.colorImage.decode(), view.depthImage.decode()]).then(() => {
      view.readyForWarp = true;
      cacheViewPixels(view);
      scheduleRender();
    });
    view.colorNode.style.opacity = "0";
    view.depthNode.style.opacity = "0";
    viewLayers.appendChild(view.colorNode);
    depthLayers.appendChild(view.depthNode);
  }
}

function cacheViewPixels(view) {
  if (view.colorData && view.depthData) {
    return true;
  }

  const width = metadata?.resolution ?? view.colorImage.naturalWidth;
  const height = metadata?.resolution ?? view.colorImage.naturalHeight;
  if (!width || !height) {
    return false;
  }

  const sourceCanvas = document.createElement("canvas");
  const depthCanvas = document.createElement("canvas");
  sourceCanvas.width = depthCanvas.width = width;
  sourceCanvas.height = depthCanvas.height = height;

  const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true });
  const depthContext = depthCanvas.getContext("2d", { willReadFrequently: true });
  sourceContext.clearRect(0, 0, width, height);
  depthContext.clearRect(0, 0, width, height);
  sourceContext.drawImage(view.colorImage, 0, 0, width, height);
  depthContext.drawImage(view.depthImage, 0, 0, width, height);

  view.pixelWidth = width;
  view.pixelHeight = height;
  view.colorData = sourceContext.getImageData(0, 0, width, height);
  view.depthData = depthContext.getImageData(0, 0, width, height);
  return true;
}

function interpolationWeights() {
  if (!blendToggle.checked || views.length < 2) {
    const nearest = views.reduce((best, view) => {
      const distance = Math.hypot(view.azimuth - target.azimuth, view.elevation - target.elevation);
      const bestDistance = Math.hypot(best.azimuth - target.azimuth, best.elevation - target.elevation);
      return distance < bestDistance ? view : best;
    }, views[0]);
    return new Map([[nearest.id, 1]]);
  }

  const elevations = uniqueSorted(views.map((view) => view.elevation));
  const selectedElevation = nearestValue(elevations, target.elevation);
  const rowViews = views.filter((view) => Number(view.elevation.toFixed(3)) === selectedElevation);
  const sorted = [...rowViews].sort((a, b) => a.azimuth - b.azimuth);
  let left = sorted[0];
  let right = sorted[sorted.length - 1];

  for (let index = 0; index < sorted.length - 1; index += 1) {
    if (target.azimuth >= sorted[index].azimuth && target.azimuth <= sorted[index + 1].azimuth) {
      left = sorted[index];
      right = sorted[index + 1];
      break;
    }
  }

  if (left.id === right.id) {
    return new Map([[left.id, 1]]);
  }

  const t = clamp((target.azimuth - left.azimuth) / (right.azimuth - left.azimuth), 0, 1);
  return new Map([
    [left.id, 1 - t],
    [right.id, t],
  ]);
}

function smoothstep(value) {
  const t = clamp(value, 0, 1);
  return t * t * (3 - 2 * t);
}

function depthProjectionWeights() {
  if (views.length < 2) {
    return views[0] ? new Map([[views[0].id, 1]]) : new Map();
  }

  const elevations = uniqueSorted(views.map((view) => view.elevation));
  const selectedElevation = nearestValue(elevations, target.elevation);
  const rowViews = views
    .filter((view) => Number(view.elevation.toFixed(3)) === selectedElevation)
    .sort((a, b) => a.azimuth - b.azimuth);

  if (!rowViews.length) {
    return new Map();
  }

  if (target.azimuth <= rowViews[0].azimuth) {
    return new Map([[rowViews[0].id, 1]]);
  }

  const lastView = rowViews[rowViews.length - 1];
  if (target.azimuth >= lastView.azimuth) {
    return new Map([[lastView.id, 1]]);
  }

  for (let index = 0; index < rowViews.length - 1; index += 1) {
    const left = rowViews[index];
    const right = rowViews[index + 1];
    if (target.azimuth < left.azimuth || target.azimuth > right.azimuth) {
      continue;
    }

    const t = smoothstep((target.azimuth - left.azimuth) / (right.azimuth - left.azimuth));
    if (t <= 0.001) {
      return new Map([[left.id, 1]]);
    }
    if (t >= 0.999) {
      return new Map([[right.id, 1]]);
    }
    return new Map([
      [left.id, 1 - t],
      [right.id, t],
    ]);
  }

  const nearest = nearestView();
  return new Map([[nearest.id, 1]]);
}

function gaussianRbfWeights() {
  const sigma = Math.max(Number(rbfSigmaSlider.value), 0.001);
  const maxViews = clamp(Number(rbfViewCountSlider.value), 2, views.length);
  const candidates = views
    .map((view) => {
      const distance = Math.hypot(view.azimuth - target.azimuth, view.elevation - target.elevation);
      return {
        view,
        distance,
        weight: Math.exp(-(distance * distance) / (2 * sigma * sigma)),
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, maxViews)
    .filter((entry) => entry.weight > 0.0001);

  const total = candidates.reduce((sum, entry) => sum + entry.weight, 0);
  if (!total) {
    return interpolationWeights();
  }

  return new Map(candidates.map((entry) => [entry.view.id, entry.weight / total]));
}

function nearestView() {
  return views.reduce((best, view) => {
    const distance = Math.hypot(view.azimuth - target.azimuth, view.elevation - target.elevation);
    const bestDistance = Math.hypot(best.azimuth - target.azimuth, best.elevation - target.elevation);
    return distance < bestDistance ? view : best;
  }, views[0]);
}

function normalizedTarget() {
  const azimuthRange = Math.max(azimuthBounds[1] - azimuthBounds[0], 0.001);
  const elevationRange = Math.max(elevationBounds[1] - elevationBounds[0], 0.001);
  return {
    x: ((target.azimuth - azimuthBounds[0]) / azimuthRange - 0.5) * 2,
    y: ((target.elevation - elevationBounds[0]) / elevationRange - 0.5) * -2,
  };
}

function normalizeMatrix(matrix) {
  if (!matrix) {
    return null;
  }

  if (matrix.length === 16) {
    return matrix.map(Number);
  }

  if (matrix.length === 4 && Array.isArray(matrix[0])) {
    return matrix.flat().map(Number);
  }

  return null;
}

function multiplyMatrices(a, b) {
  const out = new Array(16).fill(0);
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 4; col += 1) {
      for (let index = 0; index < 4; index += 1) {
        out[row * 4 + col] += a[row * 4 + index] * b[index * 4 + col];
      }
    }
  }
  return out;
}

function transformPoint(matrix, point) {
  return [
    matrix[0] * point[0] + matrix[1] * point[1] + matrix[2] * point[2] + matrix[3],
    matrix[4] * point[0] + matrix[5] * point[1] + matrix[6] * point[2] + matrix[7],
    matrix[8] * point[0] + matrix[9] * point[1] + matrix[10] * point[2] + matrix[11],
  ];
}

function transformDirection(matrix, point) {
  return [
    matrix[0] * point[0] + matrix[1] * point[1] + matrix[2] * point[2],
    matrix[4] * point[0] + matrix[5] * point[1] + matrix[6] * point[2],
    matrix[8] * point[0] + matrix[9] * point[1] + matrix[10] * point[2],
  ];
}

function invertRigidMatrix(matrix) {
  const tx = matrix[3];
  const ty = matrix[7];
  const tz = matrix[11];
  return [
    matrix[0],
    matrix[4],
    matrix[8],
    -(matrix[0] * tx + matrix[4] * ty + matrix[8] * tz),
    matrix[1],
    matrix[5],
    matrix[9],
    -(matrix[1] * tx + matrix[5] * ty + matrix[9] * tz),
    matrix[2],
    matrix[6],
    matrix[10],
    -(matrix[2] * tx + matrix[6] * ty + matrix[10] * tz),
    0,
    0,
    0,
    1,
  ];
}

function translationMatrix(x, y, z) {
  return [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
}

function rotationMatrix(axis, angleRadians) {
  const length = Math.hypot(axis[0], axis[1], axis[2]) || 1;
  const x = axis[0] / length;
  const y = axis[1] / length;
  const z = axis[2] / length;
  const c = Math.cos(angleRadians);
  const s = Math.sin(angleRadians);
  const t = 1 - c;
  return [
    t * x * x + c,
    t * x * y - s * z,
    t * x * z + s * y,
    0,
    t * x * y + s * z,
    t * y * y + c,
    t * y * z - s * x,
    0,
    t * x * z - s * y,
    t * y * z + s * x,
    t * z * z + c,
    0,
    0,
    0,
    0,
    1,
  ];
}

function cameraMatrixForTarget() {
  const centerMatrix = normalizeMatrix(metadata?.camera?.center?.matrixWorld);
  const pivot = metadata?.camera?.pivot;
  if (!centerMatrix || !Array.isArray(pivot)) {
    return null;
  }

  const toPivot = translationMatrix(Number(pivot[0]), Number(pivot[1]), Number(pivot[2]));
  const fromPivot = translationMatrix(-Number(pivot[0]), -Number(pivot[1]), -Number(pivot[2]));
  const yaw = rotationMatrix([0, 0, 1], (target.azimuth * Math.PI) / 180);
  const yawed = multiplyMatrices(multiplyMatrices(multiplyMatrices(toPivot, yaw), fromPivot), centerMatrix);
  const rightAxis = transformDirection(yawed, [1, 0, 0]);
  const pitch = rotationMatrix(rightAxis, (target.elevation * Math.PI) / 180);
  return multiplyMatrices(multiplyMatrices(multiplyMatrices(toPivot, pitch), fromPivot), yawed);
}

function cameraSettings(view) {
  return view?.camera ?? metadata?.camera?.center ?? null;
}

function decodeNormalizedDepth(depthData, index) {
  if (metadata?.depth?.encoding === "packed-rg-normalized-camera-depth") {
    return ((depthData.data[index] << 8) + depthData.data[index + 1]) / 65535;
  }

  return depthData.data[index] / 255;
}

function cameraPointFromPixel(x, y, depthZ, camera, width, height) {
  const tanX = Math.tan(Number(camera.angleX) * 0.5);
  const tanY = Math.tan(Number(camera.angleY) * 0.5);
  const u = (x + 0.5) / width;
  const v = (y + 0.5) / height;
  return [
    (u - 0.5 - Number(camera.shiftX ?? 0)) * 2 * depthZ * tanX,
    (0.5 - v + Number(camera.shiftY ?? 0)) * 2 * depthZ * tanY,
    -depthZ,
  ];
}

function pixelFromCameraPoint(point, camera, width, height) {
  const depthZ = -point[2];
  if (depthZ <= 0) {
    return null;
  }

  const tanX = Math.tan(Number(camera.angleX) * 0.5);
  const tanY = Math.tan(Number(camera.angleY) * 0.5);
  const u = 0.5 + Number(camera.shiftX ?? 0) + point[0] / (2 * depthZ * tanX);
  const v = 0.5 + Number(camera.shiftY ?? 0) - point[1] / (2 * depthZ * tanY);
  return {
    x: u * width - 0.5,
    y: v * height - 0.5,
    z: depthZ,
  };
}

function renderDepthWarp(sourceWeights) {
  if (!warpContext) {
    return false;
  }

  const active = [...sourceWeights.entries()]
    .map(([id, weight]) => ({ view: views.find((view) => view.id === id), weight }))
    .filter((entry) => entry.view?.readyForWarp && entry.weight > 0.0001 && cacheViewPixels(entry.view));

  if (!active.length) {
    return false;
  }

  const targetMatrix = cameraMatrixForTarget();
  const targetCamera = metadata?.camera?.center ?? cameraSettings(active[0].view);
  if (!targetMatrix || !targetCamera) {
    return false;
  }

  const width = metadata?.resolution ?? active[0].view.pixelWidth;
  const height = metadata?.resolution ?? active[0].view.pixelHeight;
  if (!width || !height) {
    return false;
  }

  warpCanvas.width = width;
  warpCanvas.height = height;
  const output = warpContext.createImageData(width, height);
  const accumR = new Float32Array(width * height);
  const accumG = new Float32Array(width * height);
  const accumB = new Float32Array(width * height);
  const accumA = new Float32Array(width * height);
  const targetInverse = invertRigidMatrix(targetMatrix);
  const scale = Number(depthOffsetSlider.value) / 14;
  const radius = scale > 0.75 ? 1 : 0;

  for (const { view, weight } of active) {
    const sourceCamera = cameraSettings(view);
    const sourceMatrix = normalizeMatrix(sourceCamera?.matrixWorld);
    if (!sourceCamera || !sourceMatrix) {
      continue;
    }

    const source = view.colorData;
    const depth = view.depthData;
    const sourceImage = warpContext.createImageData(width, height);
    const zBuffer = new Float32Array(width * height);
    const depthNear = Number(metadata.depth?.near ?? sourceCamera.clipStart ?? 0.1);
    const depthFar = Number(metadata.depth?.far ?? sourceCamera.clipEnd ?? 100);
    zBuffer.fill(Number.POSITIVE_INFINITY);

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = (y * width + x) * 4;
        const alpha = source.data[index + 3];
        if (alpha < 3) {
          continue;
        }

        const normalizedDepth = decodeNormalizedDepth(depth, index);
        if (normalizedDepth <= 0 && depth.data[index + 3] <= 0) {
          continue;
        }

        const depthZ = depthNear + (1 - normalizedDepth) * (depthFar - depthNear);
        const sourcePoint = cameraPointFromPixel(x, y, depthZ, sourceCamera, width, height);
        const worldPoint = transformPoint(sourceMatrix, sourcePoint);
        const targetPoint = transformPoint(targetInverse, worldPoint);
        const projected = pixelFromCameraPoint(targetPoint, targetCamera, width, height);
        if (!projected) {
          continue;
        }

        const targetX = Math.round(x + (projected.x - x) * scale);
        const targetY = Math.round(y + (projected.y - y) * scale);

        for (let yy = -radius; yy <= radius; yy += 1) {
          for (let xx = -radius; xx <= radius; xx += 1) {
            const writeX = targetX + xx;
            const writeY = targetY + yy;
            if (writeX < 0 || writeX >= width || writeY < 0 || writeY >= height) {
              continue;
            }
            const writePixel = writeY * width + writeX;
            if (projected.z >= zBuffer[writePixel]) {
              continue;
            }
            zBuffer[writePixel] = projected.z;
            const writeIndex = writePixel * 4;
            sourceImage.data[writeIndex] = source.data[index];
            sourceImage.data[writeIndex + 1] = source.data[index + 1];
            sourceImage.data[writeIndex + 2] = source.data[index + 2];
            sourceImage.data[writeIndex + 3] = alpha;
          }
        }
      }
    }

    for (let pixel = 0; pixel < width * height; pixel += 1) {
      const index = pixel * 4;
      const alpha = sourceImage.data[index + 3] / 255;
      if (alpha <= 0) {
        continue;
      }
      const contribution = alpha * weight;
      accumR[pixel] += sourceImage.data[index] * contribution;
      accumG[pixel] += sourceImage.data[index + 1] * contribution;
      accumB[pixel] += sourceImage.data[index + 2] * contribution;
      accumA[pixel] += contribution;
    }
  }

  for (let pixel = 0; pixel < width * height; pixel += 1) {
    const alpha = Math.min(accumA[pixel], 1);
    if (alpha <= 0) {
      continue;
    }

    const index = pixel * 4;
    output.data[index] = clamp(Math.round(accumR[pixel] / accumA[pixel]), 0, 255);
    output.data[index + 1] = clamp(Math.round(accumG[pixel] / accumA[pixel]), 0, 255);
    output.data[index + 2] = clamp(Math.round(accumB[pixel] / accumA[pixel]), 0, 255);
    output.data[index + 3] = Math.round(alpha * 255);
  }

  warpContext.clearRect(0, 0, width, height);
  warpContext.putImageData(output, 0, 0);
  return true;
}

function renderRbfBlend(weights) {
  if (!rbfContext) {
    return false;
  }

  const active = [...weights.entries()]
    .map(([id, weight]) => ({ view: views.find((view) => view.id === id), weight }))
    .filter((entry) => entry.view && entry.weight > 0.0001 && cacheViewPixels(entry.view));

  if (!active.length) {
    return false;
  }

  const width = metadata?.resolution ?? active[0].view.pixelWidth;
  const height = metadata?.resolution ?? active[0].view.pixelHeight;
  if (!width || !height) {
    return false;
  }

  rbfCanvas.width = width;
  rbfCanvas.height = height;

  const output = rbfContext.createImageData(width, height);
  const accumR = new Float32Array(width * height);
  const accumG = new Float32Array(width * height);
  const accumB = new Float32Array(width * height);
  const accumA = new Float32Array(width * height);
  const strength = depthOffsetToggle.checked ? Number(depthOffsetSlider.value) : 0;
  const azimuthRange = Math.max(azimuthBounds[1] - azimuthBounds[0], 0.001);
  const elevationRange = Math.max(elevationBounds[1] - elevationBounds[0], 0.001);

  for (const { view, weight } of active) {
    const color = view.colorData.data;
    const depth = view.depthData.data;
    const deltaX = clamp((target.azimuth - view.azimuth) / azimuthRange, -1, 1);
    const deltaY = clamp((target.elevation - view.elevation) / elevationRange, -1, 1);

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        const index = (y * width + x) * 4;
        const alpha = color[index + 3] / 255;
        if (alpha < 0.012) {
          continue;
        }

        const depthValue = decodeNormalizedDepth(view.depthData, index) - 0.5;
        const targetX = Math.round(x + depthValue * deltaX * strength);
        const targetY = Math.round(y - depthValue * deltaY * strength);
        if (targetX < 0 || targetX >= width || targetY < 0 || targetY >= height) {
          continue;
        }

        const writeIndex = targetY * width + targetX;
        const contribution = weight * alpha;
        accumR[writeIndex] += color[index] * contribution;
        accumG[writeIndex] += color[index + 1] * contribution;
        accumB[writeIndex] += color[index + 2] * contribution;
        accumA[writeIndex] += contribution;
      }
    }
  }

  for (let index = 0; index < accumA.length; index += 1) {
    const alpha = Math.min(accumA[index], 1);
    if (alpha <= 0) {
      continue;
    }

    const outputIndex = index * 4;
    output.data[outputIndex] = clamp(Math.round(accumR[index] / accumA[index]), 0, 255);
    output.data[outputIndex + 1] = clamp(Math.round(accumG[index] / accumA[index]), 0, 255);
    output.data[outputIndex + 2] = clamp(Math.round(accumB[index] / accumA[index]), 0, 255);
    output.data[outputIndex + 3] = Math.round(alpha * 255);
  }

  rbfContext.clearRect(0, 0, width, height);
  rbfContext.putImageData(output, 0, 0);
  return true;
}

function render() {
  if (!views.length) {
    return;
  }

  const useRbf = rbfToggle.checked;
  const useDepthOffset = depthOffsetToggle.checked;
  const weights = useRbf ? gaussianRbfWeights() : useDepthOffset ? depthProjectionWeights() : interpolationWeights();
  const transitionMs = Number(transitionSlider.value);
  const activeViews = [];
  const showDepth = depthToggle.checked;
  const rbfReady = useRbf ? renderRbfBlend(weights) : false;
  const warpReady = !useRbf && useDepthOffset ? renderDepthWarp(weights) : false;

  stage.classList.toggle("is-depth-mode", showDepth);
  depthLayers.hidden = !showDepth;

  if (rbfCanvas) {
    rbfCanvas.hidden = !rbfReady;
  }

  if (warpCanvas) {
    warpCanvas.hidden = !warpReady;
  }

  for (const view of views) {
    const weight = weights.get(view.id) ?? 0;
    view.colorNode.style.transition = `opacity ${transitionMs}ms linear`;
    view.depthNode.style.transition = `opacity ${transitionMs}ms linear`;
    view.colorNode.style.opacity = warpReady || rbfReady ? "0" : String(weight);
    view.depthNode.style.opacity = String(weight);
    if (weight > 0.001) {
      activeViews.push(`${view.id} ${Math.round(weight * 100)}%`);
    }
  }

  viewInfo.innerHTML = `
    <dt>模式</dt><dd>${useRbf ? "高斯 RBF 混合" : useDepthOffset ? "连续深度重投影" : blendToggle.checked ? "相邻视角混合" : "最近视角"}</dd>
    <dt>目标角度</dt><dd>${target.azimuth.toFixed(1)}° / ${target.elevation.toFixed(1)}°</dd>
    <dt>显示视角</dt><dd>${activeViews.join("，")}</dd>
    <dt>深度图</dt><dd>${showDepth ? "显示" : "隐藏"}</dd>
    <dt>RBF 参数</dt><dd>${useRbf ? `σ=${rbfSigmaSlider.value}，${rbfViewCountSlider.value} 个视角` : "关闭"}</dd>
    <dt>深度重投影</dt><dd>${rbfReady && useDepthOffset ? `${depthOffsetSlider.value}px，多视角近似` : warpReady ? `${depthOffsetSlider.value}px，连续源混合` : useDepthOffset ? "等待相机或深度数据" : "关闭"}</dd>
  `;
}

function scheduleRender() {
  if (renderPending) {
    return;
  }

  renderPending = true;
  requestAnimationFrame(() => {
    renderPending = false;
    render();
  });
}

function setTarget(nextTarget) {
  target = {
    azimuth: Number(nextTarget.azimuth ?? target.azimuth),
    elevation: Number(nextTarget.elevation ?? target.elevation),
  };
  azimuthSlider.value = String(target.azimuth);
  elevationSlider.value = String(target.elevation);
  scheduleRender();
}

function handleStagePointer(event) {
  if (!views.length) {
    return;
  }

  const rect = stage.getBoundingClientRect();
  const x = clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
  const y = clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1);
  const [minAzimuth, maxAzimuth] = bounds(uniqueSorted(views.map((view) => view.azimuth)));
  const [minElevation, maxElevation] = bounds(uniqueSorted(views.map((view) => view.elevation)));
  setTarget({
    azimuth: minAzimuth + (maxAzimuth - minAzimuth) * x,
    elevation: maxElevation - (maxElevation - minElevation) * y,
  });
}

async function loadMetadata() {
  try {
    const response = await fetch(metadataUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    metadata = await response.json();
    views = metadata.views.map(normalizeView);
    emptyState.hidden = true;
    prepareLayers();

    const azimuths = uniqueSorted(views.map((view) => view.azimuth));
    const elevations = uniqueSorted(views.map((view) => view.elevation));
    azimuthBounds = bounds(azimuths);
    elevationBounds = bounds(elevations);
    const [minAzimuth, maxAzimuth] = azimuthBounds;
    const [minElevation, maxElevation] = elevationBounds;
    azimuthSlider.min = String(minAzimuth);
    azimuthSlider.max = String(maxAzimuth);
    elevationSlider.min = String(minElevation);
    elevationSlider.max = String(maxElevation);
    elevationSlider.disabled = minElevation === maxElevation;
    setTarget({ azimuth: 0, elevation: nearestValue(elevations, 0) });
  } catch (error) {
    emptyState.hidden = false;
    viewInfo.innerHTML = `<dt>状态</dt><dd>${error.message}</dd>`;
  }
}

backgroundColor.addEventListener("input", (event) => setBackground(event.target.value));
backgroundText.addEventListener("change", (event) => setBackground(event.target.value.trim()));
azimuthSlider.addEventListener("input", (event) => setTarget({ azimuth: event.target.value }));
elevationSlider.addEventListener("input", (event) => setTarget({ elevation: event.target.value }));
transitionSlider.addEventListener("input", render);
depthOffsetSlider.addEventListener("input", scheduleRender);
blendToggle.addEventListener("change", scheduleRender);
rbfToggle.addEventListener("change", scheduleRender);
rbfSigmaSlider.addEventListener("input", scheduleRender);
rbfViewCountSlider.addEventListener("input", scheduleRender);
depthOffsetToggle.addEventListener("change", scheduleRender);
depthToggle.addEventListener("change", scheduleRender);
stage.addEventListener("pointermove", handleStagePointer, { passive: true });

setBackground(backgroundText.value);
loadMetadata();
