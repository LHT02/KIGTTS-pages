import { Box, Button, Stack, Typography } from '@mui/material';
import { keyframes } from '@mui/material/styles';
import { betaLines } from './data';
import { scaledPx } from './utils';
const rotateFlower = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

function Md3Clover8({ size, color, sx }) {
  const commonSx = {
    content: '""',
    position: 'absolute',
    backgroundColor: color,
    borderRadius: 999,
    top: '22%',
    bottom: '22%',
    left: 0,
    right: 0,
  };

  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'absolute',
        animation: `${rotateFlower} 45s linear infinite`,
        ...sx,
        '&::before': { ...commonSx, transform: 'rotate(0deg)' },
        '&::after': { ...commonSx, transform: 'rotate(45deg)' },
      }}
    >
      <Box sx={{ '&::before': { ...commonSx, transform: 'rotate(90deg)' }, '&::after': { ...commonSx, transform: 'rotate(135deg)' } }} />
    </Box>
  );
}

const md3CookieMask = `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 50 0 C 80 0 70 20 75 25 C 80 30 100 20 100 50 C 100 80 80 70 75 75 C 70 80 80 100 50 100 C 20 100 30 80 25 75 C 20 70 0 80 0 50 C 0 20 20 30 25 25 C 30 20 20 0 50 0 Z' fill='black'/%3E%3C/svg>")`;

function Md3Cookie4({ size, color, sx }) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: 'absolute',
        animation: `${rotateFlower} 30s linear infinite`,
        backgroundColor: color,
        WebkitMaskImage: md3CookieMask,
        maskImage: md3CookieMask,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        ...sx,
      }}
    />
  );
}

export function BetaBubble({ onSelect, compact = false, banner = false, densityScale = 1 }) {
  const isBanner = compact && banner;
  const denseDesktop = !compact && densityScale < 0.9;
  const scale = compact ? 1 : densityScale;
  const dp = (value, min = 0) => scaledPx(value, scale, min);
  const shortDesktopQuery = '@media (min-width: 900px) and (max-height: 820px)';

  return (
    <Box
      sx={{
        position: compact ? 'relative' : 'absolute',
        right: compact ? 'auto' : denseDesktop ? dp(24, 12) : { xs: dp(42, 12), lg: dp(42, 12), xl: dp(56, 16) },
        top: compact ? 'auto' : denseDesktop ? dp(12, 6) : { xs: dp(34, 8), lg: dp(34, 8), xl: dp(46, 12) },
        width: compact ? '100%' : denseDesktop ? dp(440, 340) : { xs: dp(320, 172), lg: dp(320, 172), xl: dp(354, 188) },
        maxWidth: isBanner ? '100%' : compact ? { xs: 274, sm: '100%' } : 'none',
        minHeight: isBanner ? { xs: 58, sm: 64 } : compact ? 'auto' : denseDesktop ? dp(104, 56) : dp(190, 76),
        px: isBanner ? { xs: 1.8, sm: 2.4 } : compact ? { xs: 1.6, sm: 3, md: 3.2 } : denseDesktop ? Math.max(0.9, 2.1 * scale) : Math.max(1.1, 3.2 * scale),
        py: isBanner ? 0 : compact ? { xs: 1.15, sm: 2.6, md: 3 } : denseDesktop ? Math.max(0.5, 1.2 * scale) : Math.max(0.85, 3 * scale),
        borderRadius: isBanner ? 0 : '28px',
        color: '#1a2a2a', // Dark text matching image
        backgroundColor: '#82cbcc', // Base teal background
        boxShadow: '0 8px 24px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        transition: 'box-shadow 0.2s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 1, // Above background shapes, below content
          pointerEvents: 'none',
        },
        '&:hover': {
          boxShadow: '0 12px 28px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.12)', // Subtle elevation
        },
        '&:hover::before': {
          opacity: 0.08, // MD3 standard hover state layer on surface
        },
        ...(compact
          ? {}
          : {
              [shortDesktopQuery]: {
                width: 'clamp(390px, 36vw, 500px)',
                minHeight: 104,
                px: 2.4,
                py: 1.2,
              },
            }),
      }}
    >
      {/* Top right MD3 8-leaf clover */}
      <Md3Clover8
        size={isBanner ? 92 : compact ? 118 : denseDesktop ? dp(96, 52) : dp(150, 64)}
        color="#9ad9d9"
        sx={{
          top: isBanner ? -28 : -40,
          right: isBanner ? -22 : -40,
        }}
      />
      {/* Bottom left MD3 4-sided cookie */}
      <Md3Cookie4
        size={isBanner ? 104 : compact ? 132 : denseDesktop ? dp(108, 58) : dp(170, 72)}
        color="#6bb8b9"
        sx={{
          bottom: isBanner ? -46 : -60,
          left: isBanner ? -30 : -40,
          animationDirection: 'reverse', // Rotate opposite way
          animationDuration: '45s',
        }}
      />
      <Stack
        direction={isBanner || denseDesktop ? 'row' : 'column'}
        spacing={isBanner ? { xs: 1, sm: 1.5 } : denseDesktop ? 0.8 : compact ? { xs: 1.35, sm: 2.2 } : 2.2}
        sx={{
          position: 'relative',
          zIndex: 2, // Ensure text is above state layer overlay
          width: '100%',
          alignItems: 'center',
          justifyContent: isBanner || denseDesktop ? 'space-between' : 'center',
          textAlign: isBanner || denseDesktop ? 'left' : 'center',
          minHeight: isBanner || denseDesktop ? '100%' : 'auto',
          ...(compact
            ? {}
            : {
                [shortDesktopQuery]: {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  minHeight: '100%',
                  gap: 1.4,
                },
              }),
        }}
      >
        <Typography
          sx={{
            flex: isBanner || denseDesktop ? '1 1 auto' : 'initial',
            minWidth: 0,
            color: 'inherit',
            fontSize: isBanner
              ? { xs: '0.82rem', sm: '0.98rem', md: '1.06rem' }
              : compact
                ? { xs: '0.94rem', sm: '1.15rem', md: '1.2rem' }
                : `clamp(0.72rem, ${1.2 * scale}rem, 1.2rem)`,
            lineHeight: denseDesktop ? 1.12 : isBanner ? 1.22 : compact ? 1.38 : 1.45,
            fontWeight: 500,
            letterSpacing: '0.02em',
            textShadow: '0 1px 2px rgba(255,255,255,0.2)',
            whiteSpace: isBanner || denseDesktop ? 'nowrap' : 'normal',
            overflow: isBanner || denseDesktop ? 'hidden' : 'visible',
            textOverflow: isBanner || denseDesktop ? 'ellipsis' : 'clip',
            ...(compact
              ? {}
              : {
                  [shortDesktopQuery]: {
                    flex: '1 1 auto',
                    whiteSpace: 'normal',
                    overflow: 'visible',
                    textOverflow: 'clip',
                    fontSize: '1.04rem',
                    lineHeight: 1.25,
                  },
                }),
          }}
        >
          {isBanner
            ? betaLines.join('')
            : betaLines.map((line) => (
                <Box key={line} component="span" sx={{ display: 'block' }}>
                  {line}
                </Box>
              ))}
        </Typography>
        <Button
          onClick={() => onSelect?.()}
          sx={{
            flexShrink: 0,
            minWidth: isBanner ? { xs: 94, sm: 118 } : compact ? { xs: 138, sm: 148 } : denseDesktop ? dp(92, 66) : dp(198, 116),
            minHeight: isBanner ? { xs: 38, sm: 42 } : compact ? { xs: 38, sm: 42 } : denseDesktop ? dp(42, 30) : dp(54, 32),
            px: isBanner ? { xs: 1.45, sm: 2.2 } : compact ? 2.8 : denseDesktop ? Math.max(1, 2 * scale) : Math.max(1.6, 4 * scale),
            borderRadius: 999,
            color: '#ffffff',
            backgroundColor: '#137174',
            boxShadow: '0 4px 12px rgba(19, 113, 116, 0.4), 0 2px 4px rgba(0,0,0,0.1)',
            fontSize: isBanner ? { xs: '0.8rem', sm: '0.92rem' } : compact ? { xs: '0.88rem', sm: '0.95rem' } : `clamp(0.72rem, ${1.08 * scale}rem, 1.08rem)`,
            fontWeight: 500,
            transition: 'box-shadow 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              opacity: 0,
              transition: 'opacity 0.2s ease',
            },
            '&:hover': {
              boxShadow: '0 6px 16px rgba(19, 113, 116, 0.5), 0 3px 6px rgba(0,0,0,0.15)', // MD3 elevation
            },
            '&:hover::after': {
              opacity: 0.08, // MD3 primary button hover state
            },
            '&:active::after': {
              opacity: 0.12, // MD3 primary button press state
            },
            ...(compact
              ? {}
              : {
                  [shortDesktopQuery]: {
                    minWidth: 134,
                    minHeight: 44,
                    px: 2.3,
                    fontSize: '0.95rem',
                  },
                }),
          }}
        >
          敬请期待
        </Button>
      </Stack>
    </Box>
  );
}
