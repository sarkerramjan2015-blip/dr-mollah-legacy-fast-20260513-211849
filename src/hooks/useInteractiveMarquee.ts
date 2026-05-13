import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type DragEvent as ReactDragEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';

type MarqueeDirection = 'left' | 'right';

type UseInteractiveMarqueeOptions = {
  direction?: MarqueeDirection;
  speed?: number;
  autoScroll?: boolean;
  resumeDelay?: number;
  resetKey?: unknown;
  segmentCount?: number;
};

type DragState = {
  active: boolean;
  moved: boolean;
  pausedUntil: number;
  pointerId: number | null;
  startScrollLeft: number;
  startX: number;
};

const DEFAULT_SEGMENT_COUNT = 3;

export function useInteractiveMarquee<T extends HTMLElement>({
  direction = 'left',
  speed = 18,
  autoScroll = true,
  resumeDelay = 1200,
  resetKey,
  segmentCount = DEFAULT_SEGMENT_COUNT,
}: UseInteractiveMarqueeOptions = {}) {
  const ref = useRef<T | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const resetDragClickTimer = useRef<number | undefined>(undefined);
  const dragState = useRef<DragState>({
    active: false,
    moved: false,
    pausedUntil: 0,
    pointerId: null,
    startScrollLeft: 0,
    startX: 0,
  });

  const getSegmentWidth = useCallback((element: T) => {
    return element.scrollWidth / Math.max(1, segmentCount);
  }, [segmentCount]);

  const canLoop = useCallback((element: T) => {
    const segmentWidth = getSegmentWidth(element);
    return segmentWidth > 0 && element.scrollWidth > element.clientWidth;
  }, [getSegmentWidth]);

  const centerMarquee = useCallback((element: T) => {
    if (!canLoop(element)) return;

    const segmentWidth = getSegmentWidth(element);
    element.scrollLeft = segmentWidth;
  }, [canLoop, getSegmentWidth]);

  const normalizeScroll = useCallback((element: T) => {
    const segmentWidth = getSegmentWidth(element);
    if (!canLoop(element)) {
      return 0;
    }

    const lowerBound = segmentWidth * 0.5;
    const upperBound = segmentWidth * 1.5;

    if (element.scrollLeft < lowerBound) {
      element.scrollLeft += segmentWidth;
      return segmentWidth;
    }

    if (element.scrollLeft > upperBound) {
      element.scrollLeft -= segmentWidth;
      return -segmentWidth;
    }

    return 0;
  }, [canLoop, getSegmentWidth]);

  const pause = useCallback((duration = resumeDelay) => {
    dragState.current.pausedUntil = performance.now() + duration;
  }, [resumeDelay]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frameId = 0;
    let timeoutId = 0;
    const recenter = () => centerMarquee(element);

    const resizeObserver = typeof ResizeObserver === 'undefined'
      ? null
      : new ResizeObserver(recenter);

    resizeObserver?.observe(element);
    if (element.firstElementChild && resizeObserver) {
      resizeObserver.observe(element.firstElementChild);
    }

    frameId = window.requestAnimationFrame(recenter);
    timeoutId = window.setTimeout(recenter, 300);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timeoutId);
      resizeObserver?.disconnect();
    };
  }, [centerMarquee, resetKey]);

  useEffect(() => {
    const element = ref.current;
    if (!element || !autoScroll) return;

    let frameId = 0;
    let previousTime = performance.now();

    const tick = (time: number) => {
      const elapsed = Math.min(80, time - previousTime) / 1000;
      previousTime = time;

      const isPaused = dragState.current.active || time < dragState.current.pausedUntil;

      if (!isPaused) {
        if (element.scrollLeft === 0) {
          centerMarquee(element);
        }

        element.scrollLeft += (direction === 'left' ? 1 : -1) * speed * elapsed;
        normalizeScroll(element);
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [autoScroll, centerMarquee, direction, normalizeScroll, speed]);

  useEffect(() => {
    const finishStuckDrag = () => {
      const state = dragState.current;
      if (!state.active) return;

      state.active = false;
      state.pointerId = null;
      state.pausedUntil = performance.now() + resumeDelay;
      setIsDragging(false);
    };

    window.addEventListener('blur', finishStuckDrag);
    window.addEventListener('pointerup', finishStuckDrag);

    return () => {
      window.removeEventListener('blur', finishStuckDrag);
      window.removeEventListener('pointerup', finishStuckDrag);
    };
  }, [resumeDelay]);

  useEffect(() => {
    return () => {
      if (resetDragClickTimer.current !== undefined) {
        window.clearTimeout(resetDragClickTimer.current);
      }
    };
  }, []);

  const handlePointerDown = useCallback((event: ReactPointerEvent<T>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const element = ref.current;
    if (!element) return;

    if (resetDragClickTimer.current !== undefined) {
      window.clearTimeout(resetDragClickTimer.current);
    }

    dragState.current = {
      active: true,
      moved: false,
      pausedUntil: Number.POSITIVE_INFINITY,
      pointerId: event.pointerId,
      startScrollLeft: element.scrollLeft,
      startX: event.clientX,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  }, []);

  const handlePointerMove = useCallback((event: ReactPointerEvent<T>) => {
    const element = ref.current;
    const state = dragState.current;
    if (!element || !state.active) return;

    const deltaX = event.clientX - state.startX;
    if (Math.abs(deltaX) > 4) {
      if (!state.moved) {
        state.moved = true;
        setIsDragging(true);
      }
    }

    if (state.moved) {
      event.preventDefault();
      element.scrollLeft = state.startScrollLeft - deltaX;
      state.startScrollLeft += normalizeScroll(element);
    }
  }, [normalizeScroll]);

  const finishDrag = useCallback((event: ReactPointerEvent<T>) => {
    const state = dragState.current;
    if (!state.active) return;

    if (event.currentTarget.hasPointerCapture(state.pointerId ?? event.pointerId)) {
      event.currentTarget.releasePointerCapture(state.pointerId ?? event.pointerId);
    }

    state.active = false;
    state.pointerId = null;
    state.pausedUntil = performance.now() + resumeDelay;
    setIsDragging(false);

    if (state.moved) {
      resetDragClickTimer.current = window.setTimeout(() => {
        dragState.current.moved = false;
      }, 250);
    }
  }, [resumeDelay]);

  const handleWheel = useCallback((event: ReactWheelEvent<T>) => {
    if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey) {
      pause();
      window.requestAnimationFrame(() => {
        const element = ref.current;
        if (element) normalizeScroll(element);
      });
    }
  }, [normalizeScroll, pause]);

  const handleDragStart = useCallback((event: ReactDragEvent<T>) => {
    event.preventDefault();
  }, []);

  const shouldIgnoreClick = useCallback(() => {
    if (!dragState.current.moved) return false;
    dragState.current.moved = false;
    return true;
  }, []);

  return {
    ref,
    isDragging,
    marqueeProps: {
      onDragStart: handleDragStart,
      onLostPointerCapture: finishDrag,
      onPointerCancel: finishDrag,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: finishDrag,
      onWheel: handleWheel,
    },
    pause,
    shouldIgnoreClick,
  };
}
