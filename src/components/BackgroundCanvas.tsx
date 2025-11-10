import React, { useEffect, useRef } from "react";

/**
 * Full-screen starry background:
 * 1. Animates stars (twinkling + drifting)
 * 2. Changes appearance based on theme
 * 3. Lives behind all other content
 */

interface BackgroundCanvasProps {
  theme: string; // 'light', 'dark', 'ocean', etc...
}

// Star class - each star is an object with its own properties
class Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeSpeed: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number, color: string) {
    // Random position
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;

    // Random size (some stars bigger than others)
    this.size = Math.random() * 2 + 0.5; // 0.5 to 2.5 pixels

    // Drift speed (very slow movement)
    this.speedX = (Math.random() - 0.5) * 0.5; // -0.15 to +0.15
    this.speedY = (Math.random() - 0.5) * 0.5;

    // Twinkle properties
    this.opacity = Math.random(); // Start at random brightness
    this.fadeSpeed = (Math.random() - 0.5) * 0.02;

    this.color = color;
  }

  // Update star position and opacity each frame
  update(canvasWidth: number, canvasHeight: number) {
    // Move the star
    this.x += this.speedX;
    this.y += this.speedY;

    // Twinkle effect - fade in and out
    this.opacity += this.fadeSpeed;

    // Reverse fade direction at extremes
    if (this.opacity <= 0.1) {
      this.opacity = 0.1;
      this.fadeSpeed = Math.abs(this.fadeSpeed); // Make positive
    }
    if (this.opacity >= 1) {
      this.opacity = 1;
      this.fadeSpeed = -Math.abs(this.fadeSpeed); // Make negative
    }

    // Wrap around screen edges (teleport to other side)
    if (this.x < 0) this.x = canvasWidth;
    if (this.x > canvasWidth) this.x = 0;
    if (this.y < 0) this.y = canvasHeight;
    if (this.y > canvasHeight) this.y = 0;
  }

  // Draw the star on the canvas
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color.replace("COLOR", this.opacity.toString());
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Theme-specific settings
const themeConfig = {
  light: {
    particleCount: 80,
    color: "rgba(59, 130, 246, COLOR)", // Blue stars
    backgroundColor: "#fafaf9",
  },
  dark: {
    particleCount: 150,
    color: "rgba(255, 255, 255, COLOR)", // White stars
    backgroundColor: "#1c1917",
  },
  "high-contrast": {
    particleCount: 60,
    color: "rgba(0, 255, 0, COLOR)", // Bright green
    backgroundColor: "#000000",
  },
  ocean: {
    particleCount: 120,
    color: "rgba(6, 182, 212, COLOR)", // Cyan
    backgroundColor: "#0f172a",
  },
  forest: {
    particleCount: 100,
    color: "rgba(74, 222, 128, COLOR)", // Green glow
    backgroundColor: "#14532d",
  },
};

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Get theme configuration
    const config =
      themeConfig[theme as keyof typeof themeConfig] || themeConfig.dark;

    // Create stars array (only once or when theme changes)
    starsRef.current = [];
    for (let i = 0; i < config.particleCount; i++) {
      starsRef.current.push(
        new Star(canvas.width, canvas.height, config.color)
      );
    }

    // Animation loop - runs ~60 times per second
    const animate = () => {
      // Clear the canvas
      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw each star
      starsRef.current.forEach((star) => {
        star.update(canvas.width, canvas.height);
        star.draw(ctx);
      });

      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function - stops animation when component unmounts
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Behind all content
        pointerEvents: "none", // Don't block clicks
      }}
    />
  );
};

export default BackgroundCanvas;
