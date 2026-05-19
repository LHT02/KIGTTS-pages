import { alpha } from '@mui/material/styles';

export const md2SurfaceShadow = '0 1px 2px rgba(0,0,0,0.28), 0 6px 18px rgba(0,0,0,0.16)';
export const md2RaisedShadow = '0 2px 4px rgba(0,0,0,0.28), 0 10px 24px rgba(0,0,0,0.2)';

export const md2Surface = {
  backgroundColor: '#2f3132',
  border: `1px solid ${alpha('#ffffff', 0.04)}`,
  borderRadius: 1,
  boxShadow: md2SurfaceShadow,
};

export const md2Button = {
  minHeight: 72,
  justifyContent: 'flex-start',
  px: 2.8,
  borderRadius: 1,
  fontSize: { xs: '1.18rem', md: '1.28rem' },
  fontWeight: 500,
  color: '#f5fbfb',
  backgroundColor: '#038387',
  boxShadow: '0 2px 4px rgba(0,0,0,0.28), 0 6px 14px rgba(0,0,0,0.18)',
  '&:hover': {
    backgroundColor: '#04959a',
    boxShadow: '0 4px 8px rgba(0,0,0,0.28), 0 8px 18px rgba(0,0,0,0.22)',
  },
};

export const centeredSectionSx = {
  minHeight: '100%',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const centeredContentSx = {
  width: '100%',
  maxWidth: { xs: '100%', lg: 1320, xl: 1480 },
  mx: 'auto',
};
