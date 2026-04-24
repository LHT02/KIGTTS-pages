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
  useMediaQuery,
} from '@mui/material';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';
import logoWhite from '../ART/LOGOWhite.svg';
import { BackgroundEffects } from './components/BackgroundEffects';
import {
  AboutSection,
  DownloadSection,
  HomeSection,
  LabSection,
  navItems,
  SymbolIcon,
} from './components/sections';

const pageReveal = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 18px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

function getInitialSection() {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.replace('#', '');
  return navItems.some((item) => item.id === hash) ? hash : 'home';
}

function SideRail({ activeId, onSelect }) {
  return (
    <Box
      sx={{
        width: 108,
        minWidth: 108,
        px: 0,
        py: 3,
        backgroundColor: '#2f3132',
        borderRight: `1px solid ${alpha('#f5fbfb', 0.08)}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', mt: 2, position: 'relative' }}>
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 4,
            height: 44,
            borderRadius: 999,
            backgroundColor: 'primary.main',
            boxShadow: `0 0 24px ${alpha('#038387', 0.48)}`,
            transform: `translateY(${
              Math.max(0, navItems.findIndex((item) => item.id === activeId)) * (68 + 11.2) + 12
            }px)`,
            transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <Stack spacing={1.4} sx={{ width: '100%' }}>
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
                  height: 68,
                  borderRadius: 0,
                  color: selected ? '#f5fbfb' : alpha('#f5fbfb', 0.6),
                  transition: 'color 180ms ease, background-color 180ms ease',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.03),
                  },
                }}
              >
                <SymbolIcon name={item.icon} size={28} />
              </Button>
            );
          })}
        </Stack>
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box
        sx={{
          width: 192,
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          mb: 9.5,
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
      <AppBar position="sticky">
        <Toolbar sx={{ minHeight: 74, gap: 1.5 }}>
          <Box component="img" src={logoWhite} alt="KIGTTS" sx={{ width: 118, flexShrink: 0 }} />
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
            切换页面内容，布局会根据屏宽自动调整。
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

export default function App() {
  const theme = useTheme();
  const narrowViewport = useMediaQuery(theme.breakpoints.down('lg'));
  const touchNavigation = useMediaQuery('(hover: none) and (pointer: coarse)');
  const compactNavigation = narrowViewport || touchNavigation;
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeId, setActiveId] = useState(getInitialSection);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const updateHash = (sectionId) => {
    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const handleSelect = (nextId) => {
    setActiveId(nextId);
    updateHash(nextId);

    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 850);

    const targetNode = sectionRefs.current[nextId];
    if (targetNode && scrollContainerRef.current) {
      targetNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            const sectionId = entry.target.getAttribute('data-section-id');
            if (sectionId) {
              setActiveId(sectionId);
              updateHash(sectionId);
            }
          }
        });
      },
      {
        root: scrollRoot,
        threshold: 0.5,
      }
    );

    Object.values(sectionRefs.current).forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const nextId = getInitialSection();
      handleSelect(nextId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const initialId = getInitialSection();
    const timerId = window.setTimeout(() => {
      const targetNode = sectionRefs.current[initialId];
      if (targetNode) {
        targetNode.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }, 30);

    return () => window.clearTimeout(timerId);
  }, []);

  const setSectionRef = (sectionId) => (node) => {
    if (node) {
      sectionRefs.current[sectionId] = node;
    } else {
      delete sectionRefs.current[sectionId];
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', isolation: 'isolate' }}>
      <BackgroundEffects />
      {compactNavigation ? <MobileNavigation activeId={activeId} onSelect={handleSelect} /> : null}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
          height: compactNavigation ? 'calc(100svh - 74px)' : '100svh',
          overflow: 'clip',
          backgroundColor: { lg: alpha('#0a1415', 0.26) },
        }}
      >
        {!compactNavigation ? <SideRail activeId={activeId} onSelect={handleSelect} /> : null}
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            height: '100%',
            boxSizing: 'border-box',
            px: 0,
            pt: 0,
            pb: 0,
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: 0,
              border: 'none',
              backgroundColor: 'transparent',
              backdropFilter: 'blur(12px)',
              boxShadow: 'none',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollSnapType: 'y mandatory',
              scrollBehavior: 'smooth',
              scrollbarWidth: 'thin',
              overscrollBehaviorY: 'contain',
              '&::-webkit-scrollbar': {
                width: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: alpha('#77d7d9', 0.26),
                borderRadius: 999,
              },
            }}
            ref={scrollContainerRef}
          >
            <Box
              sx={{
                animation: `${pageReveal} 520ms cubic-bezier(0.2, 0.8, 0.2, 1)`,
                minHeight: '100%',
                width: '100%',
                maxWidth: { lg: '1720px', xl: '1840px' },
                mx: 'auto',
              }}
            >
              <Box
                component="section"
                id="home"
                data-section-id="home"
                ref={setSectionRef('home')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%' }}
              >
                <HomeSection onSelect={handleSelect} />
              </Box>
              <Box
                component="section"
                id="about"
                data-section-id="about"
                ref={setSectionRef('about')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%' }}
              >
                <AboutSection />
              </Box>
              <Box
                component="section"
                id="download"
                data-section-id="download"
                ref={setSectionRef('download')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%' }}
              >
                <DownloadSection />
              </Box>
              <Box
                component="section"
                id="lab"
                data-section-id="lab"
                ref={setSectionRef('lab')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%' }}
              >
                <LabSection onSelect={handleSelect} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
