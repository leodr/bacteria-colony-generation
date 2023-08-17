import { useCallback, useEffect } from "react";
import { ISettings } from "./settings-interface";

interface CanvasProps {
  settings: ISettings;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function Canvas({ settings, canvasRef }: CanvasProps) {
  const drawBackground = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      // Draw the background color
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(0, 0, settings.canvasWidth, settings.canvasHeight);

      // Draw the bounding circle
      ctx.beginPath();
      const centerX = settings.canvasWidth / 2;
      const centerY = settings.canvasHeight / 2;
      const boundingRadius = Math.min(centerX, centerY) - settings.padding;
      ctx.arc(centerX, centerY, boundingRadius, 0, 2 * Math.PI);
      ctx.fillStyle = settings.boundingCircleColor;
      ctx.fill();
    },
    [
      settings.backgroundColor,
      settings.boundingCircleColor,
      settings.canvasHeight,
      settings.canvasWidth,
      settings.padding,
    ]
  );

  const drawRandomCircleWithinBounds = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const getRandom = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      let circleRadius;
      let circleX;
      let circleY;
      const centerX = settings.canvasWidth / 2;
      const centerY = settings.canvasHeight / 2;
      const boundingRadius = Math.min(centerX, centerY) - settings.padding;

      // Ensure the circle is entirely within the bounding circle
      do {
        circleRadius = getRandom(
          settings.minCircleSize,
          settings.maxCircleSize
        ); // 5 is the minimum radius
        circleX = getRandom(circleRadius, settings.canvasWidth - circleRadius);
        circleY = getRandom(circleRadius, settings.canvasHeight - circleRadius);
      } while (
        Math.sqrt(
          Math.pow(circleX - centerX, 2) + Math.pow(circleY - centerY, 2)
        ) >
        boundingRadius - circleRadius
      );

      ctx.beginPath();
      ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
      ctx.fillStyle = settings.randomCircleColor;
      ctx.fill();
    },
    [
      settings.canvasHeight,
      settings.canvasWidth,
      settings.maxCircleSize,
      settings.minCircleSize,
      settings.padding,
      settings.randomCircleColor,
    ]
  );

  const drawCircles = useCallback(
    (ctx: CanvasRenderingContext2D, count: number) => {
      drawBackground(ctx);
      for (let i = 0; i < count; i++) {
        drawRandomCircleWithinBounds(ctx);
      }
    },
    [drawBackground, drawRandomCircleWithinBounds]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawCircles(ctx, 10);
  }, [canvasRef, drawCircles]);

  return (
    <canvas
      ref={canvasRef}
      width={settings.canvasWidth}
      height={settings.canvasHeight}
    ></canvas>
  );
}
