'use client';
import React, {FC, ReactNode, useCallback, useEffect, useRef} from 'react';

interface Props {
    children: ReactNode;
}

const LensEffect: FC<Props> = ({children}) => {
    const moveX = useRef<number | undefined>();
    const moveY = useRef<number | undefined>();
    const eventListener = useCallback((ev: MouseEvent) => {
        moveX.current = (ev.clientX - window.innerWidth / 2) * -0.005;
        moveY.current = (ev.clientY - window.innerHeight / 2) * 0.01;
        document.documentElement.style.setProperty('--move-x', `${moveX.current}deg`);
        document.documentElement.style.setProperty('--move-y', `${moveY.current}deg`);
    }, []);

    const throttledEventListener = useCallback(
        (func: (ev: MouseEvent) => void, limit: number) => {
            let inThrottle = false;
            return function (this: Document, ev: MouseEvent) {
                if (!inThrottle) {
                    func.call(this, ev);
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

export default LensEffect;
