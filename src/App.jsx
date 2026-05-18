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
  CreditsSection,
  DownloadSection,
  HomeSection,
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

const SCROLL_EPSILON = 1;
const WHEEL_INTENT_THRESHOLD = 72;
const WHEEL_INTENT_RESET_MS = 180;
const mobileHeaderHeight = { xs: 64, sm: 70, lg: 70 };
const appViewportHeight = 'var(--app-viewport-height, 100svh)';
const desktopDpiBaselineHeight = 720;
const mobileDpiBaselineWidth = 390;
const mobileDpiBaselineHeight = 760;

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

function LoadingScreen({ progress, visible }) {
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
        <Typography sx={{ mt: 0.45, color: alpha('#ffffff', 0.38), fontSize: '0.76rem' }}>资源加载中…</Typography>
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
        <Typography sx={{ color: '#f5f7f7', fontSize: { xs: '0.78rem', sm: '0.92rem' }, letterSpacing: '0.05em', fontWeight: 700 }}>
          让沉默的你被听见
        </Typography>
      </Stack>
    </Box>
  );
}

export default function App() {
  const theme = useTheme();
  const narrowViewport = useMediaQuery(theme.breakpoints.down('lg'));
  const landscapeDesktop = useMediaQuery('(min-width: 560px) and (min-aspect-ratio: 4/3)');
  const compactNavigation = narrowViewport && !landscapeDesktop;
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef({});
  const [activeId, setActiveId] = useState(getInitialSection);
  const [downloadTabId, setDownloadTabId] = useState('android');
  const [loadingProgress, setLoadingProgress] = useState(1);
  const [loadingVisible, setLoadingVisible] = useState(true);
  const activeIdRef = useRef(getInitialSection());
  const targetIdRef = useRef(null);
  const animationFrameRef = useRef(0);
  const wheelIntentRef = useRef(0);
  const wheelResetTimerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const [viewportMetrics, setViewportMetrics] = useState(() => {
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
  });
  const desktopDensityScale = compactNavigation ? 1 : viewportMetrics.desktopDensityScale;
  const mobileStageScale = compactNavigation ? viewportMetrics.mobileDensityScale : 1;

  useEffect(() => {
    let currentProgress = 1;
    let finished = false;

    const tickId = window.setInterval(() => {
      if (finished) {
        return;
      }
      currentProgress = Math.min(92, currentProgress + Math.max(1.2, (94 - currentProgress) * 0.11));
      setLoadingProgress(currentProgress);
    }, 90);

    const finishLoading = () => {
      if (finished) {
        return;
      }
      finished = true;
      window.clearInterval(tickId);
      setLoadingProgress(100);
      window.setTimeout(() => setLoadingVisible(false), 460);
    };

    const readyTimerId = window.setTimeout(() => {
      if (document.readyState === 'complete') {
        finishLoading();
      }
    }, 680);
    const hardTimerId = window.setTimeout(finishLoading, 3200);
    window.addEventListener('load', finishLoading, { once: true });

    return () => {
      window.clearInterval(tickId);
      window.clearTimeout(readyTimerId);
      window.clearTimeout(hardTimerId);
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const updateViewportHeight = () => {
      const viewport = window.visualViewport;
      const viewportWidth = Math.round(viewport?.width ?? window.innerWidth);
      const viewportHeight = Math.round(viewport?.height ?? window.innerHeight);
      const aspectRatio = viewportWidth / Math.max(viewportHeight, 1);
      const minDesktopScale = aspectRatio >= 4 / 3 && viewportWidth < 920 ? 0.68 : 0.5;
      const densityScale = aspectRatio >= 4 / 3 ? clamp(viewportHeight / desktopDpiBaselineHeight, minDesktopScale, 1) : 1;
      const mobileChromeHeight = viewportWidth < 600 ? mobileHeaderHeight.xs : mobileHeaderHeight.sm;
      const mobileDensityScale = clamp(
        Math.min(viewportWidth / mobileDpiBaselineWidth, (viewportHeight - mobileChromeHeight) / mobileDpiBaselineHeight),
        0.74,
        1,
      );

      root.style.setProperty('--app-viewport-height', `${viewportHeight}px`);
      root.style.setProperty('--desktop-density-scale', densityScale.toFixed(3));
      root.style.setProperty('--mobile-density-scale', mobileDensityScale.toFixed(3));
      setViewportMetrics((current) => {
        if (
          current.width === viewportWidth &&
          current.height === viewportHeight &&
          current.desktopDensityScale === densityScale &&
          current.mobileDensityScale === mobileDensityScale
        ) {
          return current;
        }

        return {
          width: viewportWidth,
          height: viewportHeight,
          desktopDensityScale: densityScale,
          mobileDensityScale,
        };
      });
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

  const updateHash = (sectionId) => {
    if (window.location.hash !== `#${sectionId}`) {
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const setScrollSnapEnabled = (enabled) => {
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

  const finishProgrammaticScroll = () => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }

    setScrollSnapEnabled(true);
    targetIdRef.current = null;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 120);
  };

  const getSectionIndex = (sectionId) => navItems.findIndex((item) => item.id === sectionId);

  const getNearestSectionId = () => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot) {
      return activeIdRef.current;
    }

    const probeTop = scrollRoot.scrollTop + scrollRoot.clientHeight * 0.5;
    return navItems.reduce(
      (closest, item) => {
        const sectionNode = sectionRefs.current[item.id];
        if (!sectionNode) {
          return closest;
        }

        const sectionCenter = sectionNode.offsetTop + sectionNode.offsetHeight * 0.5;
        const distance = Math.abs(sectionCenter - probeTop);
        if (distance < closest.distance) {
          return { id: item.id, distance };
        }

        return closest;
      },
      { id: activeIdRef.current, distance: Number.POSITIVE_INFINITY },
    ).id;
  };

  const animateToSection = (nextId, duration = compactNavigation ? 480 : 700) => {
    const scrollRoot = scrollContainerRef.current;
    const targetNode = sectionRefs.current[nextId];
    if (!scrollRoot || !targetNode) {
      return;
    }

    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }

    setActiveId(nextId);
    activeIdRef.current = nextId;
    targetIdRef.current = nextId;
    updateHash(nextId);

    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const startTop = scrollRoot.scrollTop;
    const targetTop = targetNode.offsetTop;
    const travel = targetTop - startTop;

    if (Math.abs(travel) <= SCROLL_EPSILON) {
      scrollRoot.scrollTop = targetTop;
      finishProgrammaticScroll();
      return;
    }

    setScrollSnapEnabled(false);

    const startTime = performance.now();
    const step = (now) => {
      const progress = clamp((now - startTime) / duration, 0, 1);
      scrollRoot.scrollTop = startTop + travel * easeOutCubic(progress);

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      scrollRoot.scrollTop = targetTop;
      finishProgrammaticScroll();
    };

    animationFrameRef.current = window.requestAnimationFrame(step);
  };

  const handleSelect = (nextId) => {
    animateToSection(nextId);
  };

  const handleDownloadSelect = (tabId) => {
    setDownloadTabId(tabId);
    animateToSection('download');
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
              activeIdRef.current = sectionId;
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
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const scrollRoot = scrollContainerRef.current;
    if (!scrollRoot || compactNavigation) {
      return undefined;
    }

    const resetWheelIntent = () => {
      if (wheelResetTimerRef.current) {
        clearTimeout(wheelResetTimerRef.current);
      }
      wheelResetTimerRef.current = setTimeout(() => {
        wheelIntentRef.current = 0;
      }, WHEEL_INTENT_RESET_MS);
    };

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) {
        return;
      }

      const innerScrollRoot = event.target instanceof Element
        ? event.target.closest('[data-inner-scroll="true"]')
        : null;
      if (innerScrollRoot) {
        const canScrollDown = innerScrollRoot.scrollTop + innerScrollRoot.clientHeight < innerScrollRoot.scrollHeight - 2;
        const canScrollUp = innerScrollRoot.scrollTop > 2;
        if ((event.deltaY > 0 && canScrollDown) || (event.deltaY < 0 && canScrollUp)) {
          return;
        }
      }

      event.preventDefault();
      resetWheelIntent();

      if (animationFrameRef.current || targetIdRef.current) {
        return;
      }

      wheelIntentRef.current += event.deltaY;
      if (Math.abs(wheelIntentRef.current) < WHEEL_INTENT_THRESHOLD) {
        return;
      }

      const direction = wheelIntentRef.current > 0 ? 1 : -1;
      wheelIntentRef.current = 0;

      const currentIndex = getSectionIndex(getNearestSectionId());
      const nextIndex = clamp(currentIndex + direction, 0, navItems.length - 1);
      if (nextIndex !== currentIndex) {
        animateToSection(navItems[nextIndex].id, 720);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelResetTimerRef.current) {
        clearTimeout(wheelResetTimerRef.current);
      }
    };
  }, [compactNavigation]);

  useEffect(() => {
    const handleHashChange = () => {
      const nextId = getInitialSection();
      handleSelect(nextId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (wheelResetTimerRef.current) {
        clearTimeout(wheelResetTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const initialId = getInitialSection();
    const timerId = window.setTimeout(() => {
      const scrollRoot = scrollContainerRef.current;
      const targetNode = sectionRefs.current[initialId];
      if (scrollRoot && targetNode) {
        scrollRoot.scrollTop = targetNode.offsetTop;
        setActiveId(initialId);
        activeIdRef.current = initialId;
      }
    }, 120);

    return () => window.clearTimeout(timerId);
  }, []);

  const setSectionRef = (sectionId) => (node) => {
    if (node) {
      sectionRefs.current[sectionId] = node;
    } else {
      delete sectionRefs.current[sectionId];
    }
  };

  const desktopStageScale = compactNavigation ? 1 : desktopDensityScale;

  return (
    <Box
      sx={{
        minHeight: appViewportHeight,
        height: appViewportHeight,
        overflow: 'hidden',
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      <BackgroundEffects />
      <LoadingScreen progress={loadingProgress} visible={loadingVisible} />
      {compactNavigation ? <MobileNavigation activeId={activeId} onSelect={handleSelect} /> : null}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          gap: 0,
          width: compactNavigation ? `calc(100% / ${mobileStageScale})` : `calc(100% / ${desktopStageScale})`,
          height: compactNavigation
            ? {
                xs: `calc((${appViewportHeight} - ${mobileHeaderHeight.xs}px - env(safe-area-inset-top)) / ${mobileStageScale})`,
                sm: `calc((${appViewportHeight} - ${mobileHeaderHeight.sm}px - env(safe-area-inset-top)) / ${mobileStageScale})`,
                lg: `calc((${appViewportHeight} - ${mobileHeaderHeight.lg}px - env(safe-area-inset-top)) / ${mobileStageScale})`,
              }
            : `calc(${appViewportHeight} / ${desktopStageScale})`,
          mt: compactNavigation
            ? {
                xs: 'calc(64px + env(safe-area-inset-top))',
                sm: 'calc(70px + env(safe-area-inset-top))',
                lg: 'calc(70px + env(safe-area-inset-top))',
              }
            : 0,
          transform: compactNavigation ? `scale(${mobileStageScale})` : `scale(${desktopStageScale})`,
          transformOrigin: 'top left',
          overflow: 'clip',
          backgroundColor: compactNavigation ? { lg: alpha('#0a1415', 0.26) } : alpha('#0a1415', 0.26),
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
              scrollBehavior: 'auto',
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
                height: '100%',
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
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%', height: '100%' }}
              >
                <HomeSection
                  onSelect={handleSelect}
                  onSelectDownloadTab={handleDownloadSelect}
                  desktopLayout={!compactNavigation}
                  densityScale={1}
                  dpiScale={desktopStageScale}
                />
              </Box>
              <Box
                component="section"
                id="about"
                data-section-id="about"
                ref={setSectionRef('about')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%', height: '100%' }}
              >
                <AboutSection />
              </Box>
              <Box
                component="section"
                id="download"
                data-section-id="download"
                ref={setSectionRef('download')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%', height: '100%' }}
              >
                <DownloadSection activeTabId={downloadTabId} onTabChange={setDownloadTabId} />
              </Box>
              <Box
                component="section"
                id="credits"
                data-section-id="credits"
                ref={setSectionRef('credits')}
                sx={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', minHeight: '100%', height: '100%' }}
              >
                <CreditsSection />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
