import { Box, Stack, Typography } from '@mui/material';
import { alpha, keyframes } from '@mui/material/styles';
import logoWhite from '../../../ART/LOGOWhite.svg';
const loadingPulse = keyframes`
  0% {
    opacity: 0.35;
    transform: translate3d(0, 0, 0);
  }
  50% {
    opacity: 0.9;
    transform: translate3d(8px, 0, 0);
  }
  100% {
    opacity: 0.35;
    transform: translate3d(0, 0, 0);
  }
`;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(progress) {
  return 1 - (1 - progress) ** 3;
}

function getInitialSection() {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.replace('#', '');
  return navItems.some((item) => item.id === hash) ? hash : 'home';
}

function SideRail({ activeId, onSelect, densityScale = 1 }) {
  const railWidth = Math.round(clamp(108 * densityScale, 60, 108));
  const navHeight = Math.round(clamp(68 * densityScale, 42, 68));
  const navGap = 11.2 * densityScale;
  const indicatorHeight = Math.round(clamp(44 * densityScale, 28, 44));
  const indicatorOffset = Math.max(0, navItems.findIndex((item) => item.id === activeId)) * (navHeight + navGap) + 12 * densityScale;

  return (
    <Box
      sx={{
        width: railWidth,
        minWidth: railWidth,
        px: 0,
        py: Math.max(1.2, 3 * densityScale),
        backgroundColor: '#2f3132',
        borderRight: `1px solid ${alpha('#f5fbfb', 0.08)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', mt: Math.max(0.7, 2 * densityScale), position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: Math.max(3, Math.round(4 * densityScale)),
            height: indicatorHeight,
            borderRadius: 999,
            backgroundColor: 'primary.main',
            boxShadow: `0 0 24px ${alpha('#038387', 0.48)}`,
            transform: `translateY(${indicatorOffset}px)`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <Stack spacing={Math.max(0.6, 1.4 * densityScale)} sx={{ width: '100%' }}>
          {navItems.map((item) => {
            const selected = item.id === activeId;

            return (
              <Button
                key={item.id}
                onClick={() => onSelect(item.id)}
                variant="text"
                sx={{
                  position: 'relative',
                  minWidth: 0,
                  height: navHeight,
                  borderRadius: 0,
                  color: selected ? '#f5fbfb' : alpha('#f5fbfb', 0.6),
                  transition: 'color 180ms ease, background-color 180ms ease',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.03),
                  },
                }}
              >
                <SymbolIcon name={item.icon} size={Math.round(clamp(28 * densityScale, 22, 28))} />
              </Button>
            );
          })}
        </Stack>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box
        sx={{
          width: Math.round(clamp(192 * densityScale, 116, 192)),
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          mb: Math.max(4.8, 9.5 * densityScale),
          opacity: 0.88,
        }}
      >
        <Box component="img" src={logoWhite} alt="KIGTTS" sx={{ width: '100%' }} />
      </Box>
    </Box>
  );
}

function MobileNavigation({ activeId, onSelect }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentItem = navItems.find((item) => item.id === activeId) ?? navItems[0];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          right: 0,
          left: 0,
          zIndex: (muiTheme) => muiTheme.zIndex.drawer + 2,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 64, sm: 70 },
            gap: { xs: 1, sm: 1.5 },
            pt: 'env(safe-area-inset-top)',
          }}
        >
          <Box component="img" src={logoWhite} alt="KIGTTS" sx={{ width: { xs: 108, sm: 118 }, flexShrink: 0 }} />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {currentItem.label}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {currentItem.caption}
            </Typography>
          </Box>
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)} aria-label="打开菜单">
            <SymbolIcon name="menu" size={24} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 296, px: 1.4 } }}
      >
        <Stack spacing={1.2} sx={{ p: 2.2, pb: 0 }}>
          <Box component="img" src={logoWhite} alt="KIGTTS" sx={{ width: 156 }} />
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            功能介绍 · 下载方式 · 制作鸣谢
          </Typography>
        </Stack>
        <List sx={{ px: 1.2, py: 2 }}>
          {navItems.map((item) => {
            const selected = item.id === activeId;

            return (
              <ListItemButton
                key={item.id}
                selected={selected}
                onClick={() => {
                  onSelect(item.id);
                  setDrawerOpen(false);
                }}
                sx={{
                  borderRadius: 1.2,
                  mb: 0.8,
                  '&.Mui-selected': {
                    backgroundColor: alpha('#038387', 0.16),
                    '&:hover': {
                      backgroundColor: alpha('#038387', 0.22),
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 42, color: selected ? 'primary.light' : 'inherit' }}>
                  <SymbolIcon name={item.icon} size={24} />
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  secondary={item.caption}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export function LoadingScreen({ progress, visible }) {
  if (!visible) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: `
          radial-gradient(circle at 72% 42%, ${alpha('#038387', 0.18)} 0, transparent 30%),
          linear-gradient(135deg, #151617 0%, #101213 48%, #17191a 100%)
        `,
        overflow: 'hidden',
        opacity: progress >= 100 ? 0 : 1,
        pointerEvents: progress >= 100 ? 'none' : 'auto',
        transition: 'opacity 420ms ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          width: { xs: 8, sm: 12 },
          height: `${progress}%`,
          backgroundColor: '#8ff5f7',
          boxShadow: `0 0 28px ${alpha('#8ff5f7', 0.72)}`,
          transition: 'height 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          opacity: 0.08,
          backgroundImage: `
            linear-gradient(135deg, rgba(255,255,255,0.12) 0 1px, transparent 1px),
            radial-gradient(circle at 55% 50%, rgba(255,255,255,0.12) 0 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px, 8px 8px',
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: { xs: 24, sm: 34 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <Typography sx={{ color: '#8ff5f7', fontSize: { xs: '2.2rem', sm: '3rem' }, lineHeight: 0.92, fontWeight: 700 }}>
          {Math.min(100, Math.round(progress))}%
        </Typography>
        <Stack direction="row" spacing={0.35} sx={{ mt: 1.1 }}>
          {[0, 1].map((item) => (
            <Box
              key={item}
              sx={{
                width: 6,
                height: 6,
                backgroundColor: alpha('#ffffff', 0.45),
                animation: `${loadingPulse} 1.2s ease-in-out ${item * 140}ms infinite`,
              }}
            />
          ))}
        </Stack>
        <Typography sx={{ mt: 0.45, color: alpha('#ffffff', 0.38), fontSize: '0.76rem' }}>Loading...</Typography>
      </Box>

      <Stack
        spacing={2.4}
        sx={{
          position: 'absolute',
          zIndex: 1,
          right: { xs: '10%', sm: '14%', lg: '18%' },
          top: '50%',
          transform: 'translateY(-50%)',
          width: { xs: 210, sm: 330 },
          alignItems: 'flex-start',
        }}
      >
        <Box component="img" src={logoWhite} alt="KIGTTS" sx={{ width: '100%', maxWidth: 330, filter: 'drop-shadow(0 18px 26px rgba(0,0,0,0.22))' }} />
        <Box sx={{ width: '100%', height: 1, backgroundColor: alpha('#ffffff', 0.12) }} />
        <Typography sx={{ fontSize: { xs: '0.78rem', sm: '0.92rem' }, letterSpacing: '0.05em', fontFamily: '"Noto Sans SC"', fontWeight: 900 }}>
          <Box component="span" sx={{ color: '#f5f7f7', fontWeight: 300 }}>让</Box>
          <Box component="span" sx={{ color: '#82cacb' }}>沉默的你</Box>
          <Box component="span" sx={{ color: '#f5f7f7', fontWeight: 300 }}>被听见</Box>
        </Typography>
      </Stack>
    </Box>
  );
}
