import { keyframes } from '@mui/material/styles';
import { navItems } from '../components/sections/data';

export const pageReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const SCROLL_EPSILON = 1;
export const WHEEL_INTENT_THRESHOLD = 72;
export const WHEEL_INTENT_RESET_MS = 180;
export const mobileHeaderHeight = { xs: 64, sm: 70, lg: 70 };
export const appViewportHeight = 'var(--app-viewport-height, 100svh)';
export const desktopDpiBaselineHeight = 720;
export const mobileDpiBaselineWidth = 390;
export const mobileDpiBaselineHeight = 760;

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3;
}

export function getInitialSection() {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.replace('#', '');
  return navItems.some((item) => item.id === hash) ? hash : 'home';
}
