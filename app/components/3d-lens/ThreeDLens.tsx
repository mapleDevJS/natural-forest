'use client'
import { useEffect, useCallback, ReactNode, FC } from 'react';

interface Props {
  children: ReactNode;
}

const ThreeDLens: FC<Props> = ({ children }) => {
  let moveX: number | undefined;
  let moveY: number | undefined;

  const eventListener = useCallback((ev: MouseEvent) => {
    moveX = (ev.clientX - window.innerWidth / 2) * -0.005;
    moveY = (ev.clientY - window.innerHeight / 2) * 0.01;

    document.documentElement.style.setProperty('--move-x', `${moveX}deg`);
    document.documentElement.style.setProperty('--move-y', `${moveY}deg`);
  }, []);

  const throttledEventListener = useCallback(
    (func: (ev: MouseEvent) => void, limit: number) => {
      let inThrottle: boolean = false;

      return function (this: Document, ev: MouseEvent) {
        const context = this;

        if (!inThrottle) {
          func.call(context, ev);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    },
    []
  );

  useEffect(() => {
    const handleMouseMove = throttledEventListener(eventListener, 10);

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [eventListener, throttledEventListener]);

  return <>{children}</>;
};

export default ThreeDLens;
