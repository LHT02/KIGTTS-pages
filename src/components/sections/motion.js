import { keyframes } from '@mui/material/styles';

export const featureVisualEnter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(28px, 0, 0) scale(0.985);
    filter: drop-shadow(0 18px 28px rgba(0,0,0,0.18)) saturate(0.85);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
    filter: drop-shadow(0 18px 28px rgba(0,0,0,0.24)) saturate(0.98);
  }
`;

export const featurePanelEnter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 14px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const featureOverlayEnter = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
