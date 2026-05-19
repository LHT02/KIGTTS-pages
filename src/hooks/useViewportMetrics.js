import { useEffect, useState } from 'react';
import {
  clamp,
  desktopDpiBaselineHeight,
  mobileDpiBaselineHeight,
  mobileDpiBaselineWidth,
  mobileHeaderHeight,
} from '../app/appConstants';

function readViewportMetrics() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0, desktopDensityScale: 1, mobileDensityScale: 1 };
  }

  const viewport = window.visualViewport;
  const width = Math.round(viewport?.width ?? window.innerWidth);
  const height = Math.round(viewport?.height ?? window.innerHeight);
  const aspectRatio = width / Math.max(height, 1);
  const minDesktopScale = aspectRatio >= 4 / 3 && width < 920 ? 0.68 : 0.5;
  const mobileChromeHeight = width < 600 ? mobileHeaderHeight.xs : mobileHeaderHeight.sm;
  const mobileDensityScale = clamp(
    Math.min(width / mobileDpiBaselineWidth, (height - mobileChromeHeight) / mobileDpiBaselineHeight),
    0.74,
    1,
  );

  return {
    width,
    height,
    desktopDensityScale: aspectRatio >= 4 / 3 ? clamp(height / desktopDpiBaselineHeight, minDesktopScale, 1) : 1,
    mobileDensityScale,
  };
}

export function useViewportMetrics() {
  const [viewportMetrics, setViewportMetrics] = useState(readViewportMetrics);

  useEffect(() => {
    const root = document.documentElement;

    const updateViewportHeight = () => {
      const nextMetrics = readViewportMetrics();
      root.style.setProperty('--app-viewport-height', `${nextMetrics.height}px`);
      root.style.setProperty('--desktop-density-scale', nextMetrics.desktopDensityScale.toFixed(3));
      root.style.setProperty('--mobile-density-scale', nextMetrics.mobileDensityScale.toFixed(3));
      setViewportMetrics((current) => (
        current.width === nextMetrics.width &&
        current.height === nextMetrics.height &&
        current.desktopDensityScale === nextMetrics.desktopDensityScale &&
        current.mobileDensityScale === nextMetrics.mobileDensityScale
          ? current
          : nextMetrics
      ));
    };

    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight, { passive: true });
    window.visualViewport?.addEventListener('resize', updateViewportHeight, { passive: true });
    window.visualViewport?.addEventListener('scroll', updateViewportHeight, { passive: true });

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.visualViewport?.removeEventListener('resize', updateViewportHeight);
      window.visualViewport?.removeEventListener('scroll', updateViewportHeight);
    };
  }, []);

  return viewportMetrics;
}
