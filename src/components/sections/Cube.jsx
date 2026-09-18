"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

function createDotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#121316";
  ctx.fillRect(0, 0, 512, 512);

  const step = 512 / 12; // 12x12 precise grid
  const radius = step * 0.28;

  for (let x = step / 2; x < 512; x += step) {
    for (let y = step / 2; y < 512; y += step) {
      // Dark bevel rim
      ctx.beginPath();
      ctx.arc(x, y, radius + 1, 0, Math.PI * 2);
      ctx.fillStyle = "#22242a";
      ctx.fill();

      // Deep dark hole
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "#020203";
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function createSpeckleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#141518";
  ctx.fillRect(0, 0, 512, 512);

  // Subtle stippled speckles matching reference
  for (let i = 0; i < 2800; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const alpha = 0.08 + Math.random() * 0.22;
    ctx.fillStyle = `rgba(225, 225, 230, ${alpha})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

function createBrushedTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#131417";
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y += 2) {
    const alpha = 0.02 + Math.random() * 0.07;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fillRect(0, y, 512, 1);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  return tex;
}

export default function Cube({ className = "", style = {} }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 560;
    let height = container.clientHeight || 560;

    // ── Scene, Camera & Renderer ──
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true, // Transparent canvas so it blends seamlessly with the page
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── Monochromatic Studio Lighting (Pure Black & Neutral White) ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    // Key overhead directional light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 8, 4.5);
    scene.add(keyLight);

    // Soft front fill
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-3.5, 2, 5);
    scene.add(fillLight);

    // Subtle rim light from rear top (neutral white, NO blue)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(-2, 6, -4);
    scene.add(rimLight);

    // ── Textures & Materials ──
    const dotTex = createDotTexture();
    const speckleTex = createSpeckleTexture();
    const brushedTex = createBrushedTexture();

    // Dark charcoal obsidian
    const matteMat = new THREE.MeshStandardMaterial({
      color: 0x0e1013,
      roughness: 0.52,
      metalness: 0.28,
    });

    // Deep pitch-black
    const deepBlackMat = new THREE.MeshStandardMaterial({
      color: 0x040506,
      roughness: 0.62,
      metalness: 0.18,
    });

    const dotMat = new THREE.MeshStandardMaterial({
      map: dotTex,
      roughness: 0.42,
      metalness: 0.32,
    });

    const speckleMat = new THREE.MeshStandardMaterial({
      map: speckleTex,
      roughness: 0.58,
      metalness: 0.22,
    });

    const brushedMat = new THREE.MeshStandardMaterial({
      map: brushedTex,
      roughness: 0.44,
      metalness: 0.38,
    });

    // ── Crisp, High-Tolerance Rounded Cubie Geometry ──
    const cubieSize = 0.95;
    const cubieRadius = 0.034; // Subtle, precision bevel matching reference
    const cubieGeometry = new RoundedBoxGeometry(cubieSize, cubieSize, cubieSize, 4, cubieRadius);

    // ── Build 3x3x3 Rubik's Cube ──
    const mainGroup = new THREE.Group();
    const bottomGroup = new THREE.Group();
    const topGroup = new THREE.Group();

    mainGroup.add(bottomGroup);
    mainGroup.add(topGroup);
    scene.add(mainGroup);

    const step = 0.985; // Razor-thin seam between cubies

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          let cubieMat = matteMat;

          // Realistic distribution matching reference screenshot
          if (y === 1 && x === -1 && z === 0) {
            // Top layer left: speckled
            cubieMat = speckleMat;
          } else if (y === 1 && x === 0 && z === 1) {
            // Top front: dotted
            cubieMat = dotMat;
          } else if (y === 1 && x === 1 && z === 1) {
            // Top right: brushed
            cubieMat = brushedMat;
          } else if (y === 0 && x === 0 && z === 1) {
            // Middle front: deep black
            cubieMat = deepBlackMat;
          } else if (y === 0 && x === -1 && z === 1) {
            // Middle left: dotted
            cubieMat = dotMat;
          } else if (y === -1 && x === 0 && z === 1) {
            // Bottom front: dotted
            cubieMat = dotMat;
          } else if (y === -1 && x === -1 && z === 1) {
            // Bottom left: speckled
            cubieMat = speckleMat;
          } else if ((x + y + z) % 4 === 0) {
            cubieMat = deepBlackMat;
          }

          const cubie = new THREE.Mesh(cubieGeometry, cubieMat);
          cubie.position.set(x * step, y * step, z * step);

          if (y === 1) {
            topGroup.add(cubie);
          } else {
            bottomGroup.add(cubie);
          }
        }
      }
    }

    // ── Signature Twist on Top Layer (~36 degrees) ──
    topGroup.rotation.y = 0.62;

    // ── Exact Isometric Tilt Angle Matching Reference ──
    const DEFAULT_RX = 0.44;
    const DEFAULT_RY = -0.68;
    const DEFAULT_RZ = -0.16;

    mainGroup.rotation.x = DEFAULT_RX;
    mainGroup.rotation.y = DEFAULT_RY;
    mainGroup.rotation.z = DEFAULT_RZ;

    // ── Interactive Mouse Tracking ──
    let targetRx = DEFAULT_RX;
    let targetRy = DEFAULT_RY;
    let lastUserInteraction = 0;

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      const normX = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const normY = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      targetRx = DEFAULT_RX + normY * 0.28;
      targetRy = DEFAULT_RY + normX * 0.36;
      lastUserInteraction = performance.now();
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });

    // ── Window Resize ──
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 560;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ── Render & Animation Loop ──
    let animId;
    let startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) / 1000;
      const idleTime = (performance.now() - lastUserInteraction) / 1000;

      // Subtle breathing motion when idle
      if (idleTime > 1.2) {
        const swayX = Math.cos(elapsed * 0.7) * 0.03;
        const swayY = Math.sin(elapsed * 0.9) * 0.04;
        targetRx = DEFAULT_RX + swayX;
        targetRy = DEFAULT_RY + swayY;
      }

      mainGroup.rotation.x += (targetRx - mainGroup.rotation.x) * 0.055;
      mainGroup.rotation.y += (targetRy - mainGroup.rotation.y) * 0.055;

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handlePointerMove);
      resizeObserver.disconnect();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }

      cubieGeometry.dispose();
      matteMat.dispose();
      deepBlackMat.dispose();
      dotMat.dispose();
      speckleMat.dispose();
      brushedMat.dispose();
      dotTex.dispose();
      speckleTex.dispose();
      brushedTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "480px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab",
        background: "transparent",
        ...style,
      }}
      aria-label="3D Rubik's Cube"
    />
  );
}