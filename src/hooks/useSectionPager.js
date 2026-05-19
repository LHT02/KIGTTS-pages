import { useEffect, useRef, useState } from 'react';
import {
  clamp,
  easeOutCubic,
  getInitialSection,
  SCROLL_EPSILON,
  WHEEL_INTENT_RESET_MS,
  WHEEL_INTENT_THRESHOLD,
} from '../app/appConstants';
import { navItems } from '../components/sections/data';

export function useSectionPager(compactNavigation) {
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef({});
  const activeIdRef = useRef(getInitialSection());
  const targetIdRef = useRef(null);
  const animationFrameRef = useRef(0);
  const wheelIntentRef = useRef(0);
  const wheelResetTimerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);
  const [activeId, setActiveId] = useState(getInitialSection);
  const [downloadTabId, setDownloadTabId] = useState('android');

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
      },
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

  return {
    activeId,
    downloadTabId,
    handleDownloadSelect,
    handleSelect,
    scrollContainerRef,
    setDownloadTabId,
    setSectionRef,
  };
}
