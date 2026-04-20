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

const SCROLL_EPSILON = 2;
const WHEEL_TRIGGER_DELTA = 24;
const SWIPE_DISTANCE_RATIO = 0.11;
const SWIPE_VELOCITY_THRESHOLD = 0.42;
const DRAG_START_DELTA = 4;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

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
      <Stack spacing={1.4} sx={{ width: '100%', mt: 2 }}>
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
                minHeight: 68,
                borderRadius: 0,
                color: selected ? '#f5fbfb' : alpha('#f5fbfb', 0.6),
                transition: 'color 180ms ease, background-color 180ms ease',
                '&::before': selected
                  ? {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: 12,
                      bottom: 12,
                      width: 4,
                      borderRadius: 999,
                      backgroundColor: 'primary.main',
                      boxShadow: `0 0 24px ${alpha('#038387', 0.48)}`,
                    }
                  : {},
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
  const activeIdRef = useRef(getInitialSection());
  const targetIdRef = useRef(null);
  const animationFrameRef = useRef(0);
  const animationLockRef = useRef(false);
  const touchStateRef = useRef({
    startY: 0,
    lastY: 0,
    startScrollTop: 0,
    startSectionId: 'home',
    startTime: 0,
    tracking: false,
  });
  const mouseDragStateRef = useRef({
    startY: 0,
    lastY: 0,
    startScrollTop: 0,
    startSectionId: 'home',
    startTime: 0,
    moved: false,
    tracking: false,
  });
  const [activeId, setActiveId] = useState(getInitialSection);

  const setCurrentSection = (nextId) => {
    activeIdRef.current = nextId;
    setActiveId((previousId) => (previousId === nextId ? previousId : nextId));
  };

  const updateHash = (sectionId) => {
    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const getSectionIndex = (sectionId) => navItems.findIndex((item) => item.id === sectionId);

  const getNearestSectionId = () => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) {
      return activeIdRef.current;
    }

    const probeOffset = scrollRoot.clientHeight * (compactNavigation ? 0.2 : 0.18);
    return navItems.reduce(
      (closest, item) => {
        const sectionNode = sectionRefs.current[item.id];
        if (!sectionNode) {
          return closest;
        }

        const distance = Math.abs(sectionNode.offsetTop - scrollRoot.scrollTop - probeOffset);
        if (distance < closest.distance) {
          return { id: item.id, distance };
        }

        return closest;
      },
      { id: activeIdRef.current, distance: Number.POSITIVE_INFINITY },
    ).id;
  };

  const setSnapEnabled = (enabled) => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) {
      return;
    }

    if (enabled) {
      scrollRoot.style.removeProperty('scroll-snap-type');
      scrollRoot.style.removeProperty('scroll-behavior');
      return;
    }

    scrollRoot.style.scrollSnapType = 'none';
    scrollRoot.style.scrollBehavior = 'auto';
  };

  const finishAnimation = () => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }

    animationLockRef.current = false;
    targetIdRef.current = null;
    setSnapEnabled(true);
  };

  const animateToSection = (sectionId, duration = compactNavigation ? 460 : 540) => {
    const scrollRoot = scrollContainerRef.current;
    const targetNode = sectionRefs.current[sectionId];
    if (!scrollRoot || !targetNode) {
      return;
    }

    const targetTop = targetNode.offsetTop;
    const startTop = scrollRoot.scrollTop;
    const travel = targetTop - startTop;

    finishAnimation();
    setSnapEnabled(false);

    if (Math.abs(travel) <= SCROLL_EPSILON) {
      scrollRoot.scrollTop = targetTop;
      setCurrentSection(sectionId);
      updateHash(sectionId);
      setSnapEnabled(true);
      return;
    }

    targetIdRef.current = sectionId;
    animationLockRef.current = true;
    setCurrentSection(sectionId);
    updateHash(sectionId);

    const startTime = performance.now();
    const easing = (progress) => 1 - Math.pow(1 - progress, 4);

    const step = (now) => {
      const progress = clamp((now - startTime) / duration, 0, 1);
      scrollRoot.scrollTop = startTop + travel * easing(progress);

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      scrollRoot.scrollTop = targetTop;
      finishAnimation();
      const settledId = getNearestSectionId();
      setCurrentSection(settledId);
      updateHash(settledId);
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  };

  const snapFromSection = (sectionId, direction) => {
    const currentIndex = getSectionIndex(sectionId);
    const baseIndex = currentIndex >= 0 ? currentIndex : getSectionIndex(activeIdRef.current);
    const nextIndex = clamp(baseIndex + direction, 0, navItems.length - 1);

    if (nextIndex === baseIndex) {
      animateToSection(navItems[baseIndex]?.id ?? activeIdRef.current, compactNavigation ? 360 : 420);
      return;
    }

    animateToSection(navItems[nextIndex].id);
  };

  const snapByDirection = (direction) => {
    snapFromSection(targetIdRef.current ?? getNearestSectionId(), direction);
  };

  const settleDrag = (travel, elapsed, startSectionId) => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) {
      setSnapEnabled(true);
      return;
    }

    const velocity = Math.abs(travel) / Math.max(elapsed, 1);
    const travelThreshold = scrollRoot.clientHeight * SWIPE_DISTANCE_RATIO;

    if (Math.abs(travel) >= travelThreshold || velocity >= SWIPE_VELOCITY_THRESHOLD) {
      snapFromSection(startSectionId, travel > 0 ? 1 : -1);
      return;
    }

    animateToSection(getNearestSectionId(), compactNavigation ? 320 : 360);
  };

  const setSectionRef = (sectionId) => (node) => {
    if (node) {
      sectionRefs.current[sectionId] = node;
      return;
    }

    delete sectionRefs.current[sectionId];
  };

  useEffect(() => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) {
      return undefined;
    }

    const updateActiveSection = () => {
      if (animationLockRef.current && targetIdRef.current) {
        setCurrentSection(targetIdRef.current);
        return;
      }

      const nextId = getNearestSectionId();
      setCurrentSection(nextId);
      updateHash(nextId);
    };

    let scrollRafId = 0;

    const handleScroll = () => {
      window.cancelAnimationFrame(scrollRafId);
      scrollRafId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    scrollRoot.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollRoot.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(scrollRafId);
    };
  }, [compactNavigation]);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) {
      return undefined;
    }

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < WHEEL_TRIGGER_DELTA || Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();

      if (animationLockRef.current) {
        return;
      }

      snapByDirection(event.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) {
        touchStateRef.current.tracking = false;
        return;
      }

      const touch = event.touches[0];
      finishAnimation();
      setSnapEnabled(false);
      touchStateRef.current = {
        startY: touch.clientY,
        lastY: touch.clientY,
        startScrollTop: scrollRoot.scrollTop,
        startSectionId: getNearestSectionId(),
        startTime: performance.now(),
        tracking: true,
      };
    };

    const handleTouchMove = (event) => {
      if (!touchStateRef.current.tracking || event.touches.length !== 1) {
        return;
      }

      if (event.cancelable) {
        event.preventDefault();
      }

      const nextY = event.touches[0].clientY;
      const touchState = touchStateRef.current;
      const travel = touchState.startY - nextY;
      const maxScrollTop = Math.max(scrollRoot.scrollHeight - scrollRoot.clientHeight, 0);

      touchStateRef.current.lastY = nextY;
      scrollRoot.scrollTop = clamp(touchState.startScrollTop + travel, 0, maxScrollTop);
    };

    const handleTouchEnd = () => {
      const touchState = touchStateRef.current;
      if (!touchState.tracking || animationLockRef.current) {
        touchStateRef.current.tracking = false;
        if (!animationLockRef.current) {
          setSnapEnabled(true);
        }
        return;
      }

      touchStateRef.current.tracking = false;

      const travel = touchState.startY - touchState.lastY;
      const elapsed = performance.now() - touchState.startTime;

      settleDrag(travel, elapsed, touchState.startSectionId);
    };

    const handleMouseDown = (event) => {
      if (event.button !== 0 || event.defaultPrevented) {
        return;
      }

      const targetElement = event.target instanceof Element ? event.target : event.target?.parentElement;
      const interactiveTarget = targetElement?.closest(
        'a, button, input, textarea, select, [role="button"], [aria-haspopup="true"]',
      );
      if (interactiveTarget) {
        return;
      }

      finishAnimation();
      setSnapEnabled(false);

      mouseDragStateRef.current = {
        startY: event.clientY,
        lastY: event.clientY,
        startScrollTop: scrollRoot.scrollTop,
        startSectionId: getNearestSectionId(),
        startTime: performance.now(),
        moved: false,
        tracking: true,
      };
    };

    const handleMouseMove = (event) => {
      const dragState = mouseDragStateRef.current;
      if (!dragState.tracking) {
        return;
      }

      const travel = dragState.startY - event.clientY;
      if (!dragState.moved && Math.abs(travel) < DRAG_START_DELTA) {
        return;
      }

      event.preventDefault();
      const maxScrollTop = Math.max(scrollRoot.scrollHeight - scrollRoot.clientHeight, 0);

      mouseDragStateRef.current.lastY = event.clientY;
      mouseDragStateRef.current.moved = true;
      scrollRoot.scrollTop = clamp(dragState.startScrollTop + travel, 0, maxScrollTop);
    };

    const handleMouseUp = () => {
      const dragState = mouseDragStateRef.current;
      if (!dragState.tracking || animationLockRef.current) {
        mouseDragStateRef.current.tracking = false;
        if (!animationLockRef.current) {
          setSnapEnabled(true);
        }
        return;
      }

      mouseDragStateRef.current.tracking = false;

      if (!dragState.moved) {
        setSnapEnabled(true);
        return;
      }

      const travel = dragState.startY - dragState.lastY;
      const elapsed = performance.now() - dragState.startTime;

      settleDrag(travel, elapsed, dragState.startSectionId);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    scrollRoot.addEventListener('touchstart', handleTouchStart, { passive: true });
    scrollRoot.addEventListener('touchmove', handleTouchMove, { passive: false });
    scrollRoot.addEventListener('touchend', handleTouchEnd, { passive: true });
    scrollRoot.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    scrollRoot.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      scrollRoot.removeEventListener('touchstart', handleTouchStart);
      scrollRoot.removeEventListener('touchmove', handleTouchMove);
      scrollRoot.removeEventListener('touchend', handleTouchEnd);
      scrollRoot.removeEventListener('touchcancel', handleTouchEnd);
      scrollRoot.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setSnapEnabled(true);
    };
  }, [compactNavigation]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextId = getInitialSection();
      animateToSection(nextId, compactNavigation ? 360 : 420);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [compactNavigation]);

  useEffect(() => {
    const initialId = getInitialSection();
    const timerId = window.setTimeout(() => {
      const scrollRoot = scrollContainerRef.current;
      const targetNode = sectionRefs.current[initialId];
      if (scrollRoot && targetNode) {
        scrollRoot.scrollTop = targetNode.offsetTop;
        setCurrentSection(initialId);
        updateHash(initialId);
      }
    }, 30);

    return () => window.clearTimeout(timerId);
  }, []);

  const handleSelect = (nextId) => {
    animateToSection(nextId, compactNavigation ? 420 : 520);
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
            px: { xs: 2, sm: 3, md: 4, lg: 0 },
            pt: { xs: 2.2, md: compactNavigation ? 3 : 0 },
            pb: { xs: 5, md: 6, lg: 0 },
          }}
        >
          <Box
            sx={{
              height: '100%',
              borderRadius: 0,
              border: compactNavigation ? `1px solid ${alpha('#f5fbfb', 0.08)}` : 'none',
              backgroundColor: compactNavigation
                ? alpha(theme.palette.background.paper, 0.42)
                : 'transparent',
              backdropFilter: 'blur(12px)',
              boxShadow: compactNavigation ? `0 28px 72px ${alpha('#000000', 0.24)}` : 'none',
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollSnapType: 'y mandatory',
              scrollbarWidth: 'thin',
              overscrollBehaviorY: 'contain',
              touchAction: 'none',
              cursor: 'grab',
              userSelect: 'none',
              '&:active': {
                cursor: 'grabbing',
              },
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
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', scrollMarginTop: 24 }}
              >
                <HomeSection onSelect={handleSelect} />
              </Box>
              <Box
                component="section"
                id="about"
                data-section-id="about"
                ref={setSectionRef('about')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', scrollMarginTop: 24 }}
              >
                <AboutSection />
              </Box>
              <Box
                component="section"
                id="download"
                data-section-id="download"
                ref={setSectionRef('download')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', scrollMarginTop: 24 }}
              >
                <DownloadSection />
              </Box>
              <Box
                component="section"
                id="lab"
                data-section-id="lab"
                ref={setSectionRef('lab')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', scrollMarginTop: 24 }}
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
