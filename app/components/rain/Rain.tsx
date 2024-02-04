'use client'
import {FC, useEffect, useRef} from 'react';

class RainDrops {
    x: number;
    y: number;
    endy: number;
    velocity: number;
    opacity: number;
    size: number;
    weight: number;

    constructor(x: number, y: number, endy: number, velocity: number, opacity: number, size: number) {
        this.x = x;
        this.y = y;
        this.endy = endy;
        this.velocity = velocity * size; // Modify the velocity based on size
        this.opacity = opacity;
        this.size = size; // Add a new size property
        this.weight = size * 0.05; // Add a new weight property
    }

    draw(context: CanvasRenderingContext2D) {
        // Draw the path of raindrop
        context.beginPath();
        context.moveTo(this.x, this.y);
        context.lineTo(this.x, this.y + this.endy);
        context.lineWidth = 1;
        context.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.stroke();

        // Draw the raindrop itself as an ellipse
        context.beginPath();
        let raindropRadius = 2; // define an appropriate radius for the ellipse
        context.ellipse(this.x, this.y, raindropRadius, raindropRadius*2, 0, 0, 2 * Math.PI);
        context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.fill();
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
            const randomSize = Math.random() * 2 + 1; // Assign a random size to each raindrop between 1 and 3
            rainArray.push(new RainDrops(rainXLocation, rainYLocation, randomRainHeight, randomSpeed, randomOpacity, randomSize));
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
