import { Box, useMediaQuery } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import {
  appViewportHeight,
  mobileHeaderHeight,
  pageReveal,
} from './app/appConstants';
import { BackgroundEffects } from './components/BackgroundEffects';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { MobileNavigation, SideRail } from './components/layout/AppNavigation';
import {
  AboutSection,
  CreditsSection,
  DownloadSection,
  HomeSection,
} from './components/sections';
import { useLoadingProgress } from './hooks/useLoadingProgress';
import { useSectionPager } from './hooks/useSectionPager';
import { useViewportMetrics } from './hooks/useViewportMetrics';

export default function App() {
  const theme = useTheme();
  const narrowViewport = useMediaQuery(theme.breakpoints.down('lg'));
  const landscapeDesktop = useMediaQuery('(min-width: 560px) and (min-aspect-ratio: 4/3)');
  const compactNavigation = narrowViewport && !landscapeDesktop;
  const viewportMetrics = useViewportMetrics();
  const { loadingProgress, loadingVisible } = useLoadingProgress();
  const {
    activeId,
    downloadTabId,
    handleDownloadSelect,
    handleSelect,
    scrollContainerRef,
    setDownloadTabId,
    setSectionRef,
  } = useSectionPager(compactNavigation);

  const desktopDensityScale = compactNavigation ? 1 : viewportMetrics.desktopDensityScale;
  const mobileStageScale = compactNavigation ? viewportMetrics.mobileDensityScale : 1;
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
