import { useEffect, useRef } from "react";

const SPACING = 26;
const MOUSE_RADIUS = 170;
const BASE_RADIUS = 1.1;

export default function DotMatrix() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let frameId;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time) {
      ctx.clearRect(0, 0, width, height);

      // o cursor é suavizado para os pontos "seguirem" em vez de pular
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;

      const t = reduceMotion ? 0 : time * 0.00028;
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      const offsetX = (width - (cols - 1) * SPACING) / 2;
      const offsetY = (height - (rows - 1) * SPACING) / 2;

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = offsetX + col * SPACING;
          const y = offsetY + row * SPACING;

          // onda diagonal lenta atravessando a página
          const wave = Math.sin((x + y) * 0.006 - t * 6) * 0.5 + 0.5;
          const sweep = Math.pow(wave, 6);

          const dist = Math.hypot(x - mouse.x, y - mouse.y);
          const near = dist < MOUSE_RADIUS ? 1 - dist / MOUSE_RADIUS : 0;
          const glow = near * near;

          const radius = BASE_RADIUS + sweep * 0.9 + glow * 2.6;
          const alpha = 0.14 + sweep * 0.22 + glow * 0.75;

          // perto do cursor os pontos esquentam de roxo para azul-ciano
          const r = Math.round(120 - glow * 41);
          const g = Math.round(110 + glow * 99);
          const b = Math.round(190 + glow * 65);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      if (!reduceMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    function onMouseMove(event) {
      mouse.tx = event.clientX;
      mouse.ty = event.clientY;
      if (mouse.x < -999) {
        mouse.x = mouse.tx;
        mouse.y = mouse.ty;
      }
    }

    function onMouseLeave() {
      mouse.tx = -9999;
      mouse.ty = -9999;
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onVisibility() {
      cancelAnimationFrame(frameId);
      if (!document.hidden && !reduceMotion) {
        frameId = requestAnimationFrame(draw);
      }
    }

    resize();
    frameId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-matrix" aria-hidden="true" />;
}
