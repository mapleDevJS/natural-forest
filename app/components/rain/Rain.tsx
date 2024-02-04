'use client'
import {FC, useEffect, useRef} from 'react';

class RainDrops {
    x: number;
    y: number;
    endy: number;
    velocity: number;
    opacity: number;

    constructor(x: number, y: number, endy: number, velocity: number, opacity: number) {
        this.x = x;
        this.y = y;
        this.endy = endy;
        this.velocity = velocity;
        this.opacity = opacity;
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y - this.endy);
        context.lineWidth = 1;
        context.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.stroke();
    }

    update(context: CanvasRenderingContext2D) {
        const rainEnd = window.innerHeight + 100;
        if (this.y >= rainEnd) {
            this.y = this.endy - 100;
        } else {
            this.y = this.y + this.velocity;
        }
        this.draw(context);
    }
}

const Rain: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rainArrayRef = useRef<RainDrops[]>([]);
    const animationIdRef = useRef<number | null>(null); // Added animationIdRef

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const rainArray: RainDrops[] = [];

        for (let i = 0; i < 140; i++) {
            const rainXLocation = Math.floor(Math.random() * window.innerWidth) + 1;
            const rainYLocation = Math.random() * -500;
            const randomRainHeight = Math.floor(Math.random() * 10) + 2;
            const randomSpeed = Math.random() * 20 + 0.2;
            const randomOpacity = Math.random() * 0.55;
            rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity));
        }

        rainArrayRef.current = rainArray;

        function animateRain() {
            animationIdRef.current = requestAnimationFrame(animateRain);
            context?.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (const raindrop of rainArrayRef.current) {
                if (context) raindrop.update(context);
            }
        }

        animateRain();

        return () => {
            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current);
            }
        };
    }, []);

    return <canvas ref={canvasRef}/>;
};

export default Rain;
