import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import logoWhite from '../../../ART/LOGOWhite.svg';
import { mobileHeaderHeight, clamp } from '../../app/appConstants';
import { navItems, SymbolIcon } from '../sections';
export function SideRail({ activeId, onSelect, densityScale = 1 }) {
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

export function MobileNavigation({ activeId, onSelect }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

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
            minHeight: { xs: mobileHeaderHeight.xs, sm: mobileHeaderHeight.sm },
            gap: { xs: 1, sm: 1.5 },
            pt: 'env(safe-area-inset-top)',
            justifyContent: 'space-between',
          }}
        >
          <Box component="img" src={logoWhite} alt="KIGTTS" sx={{ width: { xs: 118, sm: 132 }, flexShrink: 0 }} />
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
