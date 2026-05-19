import { useEffect, useState } from 'react';

export function useLoadingProgress() {
  const [loadingProgress, setLoadingProgress] = useState(1);
  const [loadingVisible, setLoadingVisible] = useState(true);

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

  return { loadingProgress, loadingVisible };
}
