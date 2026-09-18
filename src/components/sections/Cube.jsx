"use client";

import { useEffect, useRef, useState } from "react";

export default function Cube({ className = "", style = {} }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    async function initSpline() {
      // Don't load full WebGL spline on small mobile screens to conserve battery/memory
      if (window.innerWidth < 768) {
        return;
      }

      try {
        const { Application } = await import("@splinetool/runtime");
        if (!isMounted || !canvasRef.current) return;

        const app = new Application(canvasRef.current);
        appRef.current = app;

        await app.load("/static/cube.splinecode");

        if (isMounted) {
          setIsSplineLoaded(true);
        }
      } catch (err) {
        console.warn("Spline runtime failed to load, falling back to high-res video loop:", err);
      }
    }

    initSpline();

    return () => {
      isMounted = false;
      if (appRef.current) {
        try {
          appRef.current.dispose();
        } catch (e) {
          // ignore dispose errors
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: "100%",
        maxWidth: "580px",
        aspectRatio: "1 / 1",
        overflow: "visible",
        background: "transparent",
        ...style,
      }}
      aria-label="3D Rubik's Cube"
    >
      {/* High-Fidelity Video Fallback (Plays instantly while Spline initializes or on mobile) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/static/cube-fallback.jpg"
        src="/static/cube.mp4"
        className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-700 ease-in-out ${
          isSplineLoaded ? "opacity-0" : "opacity-100"
        }`}
        style={{
          width: "100%",
          height: "100%",
          transform: "scale(1.12)", // Perfectly align size with canvas
        }}
        aria-hidden="true"
      />

      {/* Interactive 3D WebGL Spline Canvas (Moving pieces, twist animations, mouse parallax) */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
          isSplineLoaded ? "opacity-100 cursor-grab active:cursor-grabbing" : "opacity-0 pointer-events-none"
        }`}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      />
    </div>
  );
}