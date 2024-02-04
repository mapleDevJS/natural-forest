'use client'
import {FC, useEffect, useRef} from 'react';

class RainDropConfig {
    dropQuantity: number;
    heightRange: number[];  // Height range as [min, max]
    speedRange: number[];  // Speed range as [min, max]
    opacityRange: number[];  // Opacity range as [min, max]
    sizeRange: number[];  // Size range as [min, max]
    wind: number;  // Wind effect on raindrops' x-axis direction. Negative for left, positive for right

    constructor(dropQuantity: number, heightRange: number[], speedRange: number[], opacityRange: number[], sizeRange: number[], wind: number) {
        this.dropQuantity = dropQuantity;
        this.heightRange = heightRange;
        this.speedRange = speedRange;
        this.opacityRange = opacityRange;
        this.sizeRange = sizeRange;
        this.wind = wind;
    }
}

class RainDrops {
    x: number;
    y: number;
    endy: number;
    velocity: number;
    opacity: number;
    size: number;
    weight: number;

    constructor(config: RainDropConfig) {
        this.x = Math.floor(Math.random() * window.innerWidth) + 1;
        this.y = Math.random() * -500;
        this.endy = Math.floor(Math.random() * (config.heightRange[1] - config.heightRange[0])) + config.heightRange[0];
        this.velocity = Math.random() * (config.speedRange[1] - config.speedRange[0]) + config.speedRange[0];
        this.opacity = Math.random() * (config.opacityRange[1] - config.opacityRange[0]) + config.opacityRange[0];
        this.size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0];
        this.weight = this.size * 0.05 + Math.random() / 5;
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
        let raindropRadius = 1; // define an appropriate radius for the ellipse
        context.ellipse(this.x, this.y, raindropRadius, raindropRadius*2, 0, 0, 2 * Math.PI);
        context.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        context.fill();
    }

    update(context: CanvasRenderingContext2D) {
        const rainEnd = window.innerHeight + 100;
        const gravity = 0.1; // Define gravity for your scene
        if (this.y >= rainEnd) {
            this.y = this.endy - 100;
        } else {
            this.velocity += gravity * this.weight; // Weight influence on the drop velocity
            this.y = this.y + this.velocity;
        }
        // Add wind influence to the x position
        this.x = this.x + RainDropConfigInstance.wind;
        this.draw(context);
    }
}

const RainDropConfigInstance = new RainDropConfig(140, [2, 7], [15, 17], [0, 0.55], [1, 3], 0.3);

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

        for (let i = 0; i < RainDropConfigInstance.dropQuantity; i++)
        {
            rainArray.push(new RainDrops(RainDropConfigInstance));
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
