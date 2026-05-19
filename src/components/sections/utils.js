export function scaledPx(value, scale, min = 0) {
  return Math.round(Math.max(min, value * scale));
}
