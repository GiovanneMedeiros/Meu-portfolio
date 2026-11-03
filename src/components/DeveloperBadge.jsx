import { useEffect, useRef } from "react";
import { createBadgeSim } from "./badgePhysics.js";
import lanyardImage from "../../assets/badge/lanyard-clip.png";
import cardImage from "../../assets/badge/badge-card.png";
import "../styles/badge.css";

// medidas em px para escala 1 (desktop)
const CARD_W = 190;
const CARD_H = 259;
const HW_W = 87; // largura da presilha/cordão da imagem
const HW_H = 122;
const HW_RING_Y = 64; // distância do topo da imagem até o centro da argola
const CARD_TOP = 53; // da argola até o topo do cartão
const ROPE_LENGTH = 150;
const STRAP_TOP_W = 46;
const STRAP_END_W = 40; // largura da faixa clara da imagem (as abas escuras laterais são cortadas no CSS)
const OVERLAP = 14; // quanto o cordão desenhado entra por baixo do topo da imagem (onde ela ainda tem a largura cheia)

function getScale() {
  const w = window.innerWidth;
  if (w >= 1024) return 1;
  if (w >= 640) return 0.82;
  return 0.58;
}

// contorno suave do cordão passando pelos pontos (curvas quadráticas entre pontos médios)
function smoothPath(points) {
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const mx = (points[i][0] + points[i + 1][0]) / 2;
    const my = (points[i][1] + points[i + 1][1]) / 2;
    d += `Q${points[i][0].toFixed(1)} ${points[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const last = points[points.length - 1];
  return `${d}L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
}

export default function DeveloperBadge() {
  const layerRef = useRef(null);
  const bodyRef = useRef(null);
  const sheenRef = useRef(null);
  const strapRef = useRef(null);
  const strapEdgeRef = useRef(null);
  const strapStitchRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    const body = bodyRef.current;
    const card = cardRef.current;
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    let sim;
    let scale;
    let frameId = 0;
    let lastTime = 0;
    let dragPointerId = null;
    let grabOffset = { x: 0, y: 0 };
    let lastMove = null;

    function build() {
      scale = getScale();
      const width = Math.min(520 * scale, window.innerWidth);
      const height = Math.min(window.innerHeight, 640 * scale);
      layer.style.width = `${width}px`;
      layer.style.height = `${height}px`;
      layer.style.setProperty("--s", scale);
      layer.querySelector("svg").setAttribute("viewBox", `0 0 ${width} ${height}`);

      sim = createBadgeSim({
        width,
        height,
        anchorX: width - (window.innerWidth < 640 ? 74 : 112) * scale,
        ropeLength: ROPE_LENGTH * scale,
        hangLength: (CARD_TOP + CARD_H / 2) * scale,
        scale,
        reduced: reducedQuery.matches,
      });
      render();
    }

    function render() {
      const { x, y, ring } = sim.nodes;
      const pose = sim.pose();
      const sin = Math.sin(pose.angle);
      const cos = Math.cos(pose.angle);

      body.style.transform = `translate3d(${pose.x.toFixed(2)}px, ${pose.y.toFixed(2)}px, 0) rotate(${pose.angle.toFixed(4)}rad)`;

      // o cordão termina exatamente no topo da imagem da presilha (que gira junto com o cartão)
      const endDist = (HW_RING_Y - OVERLAP) * scale;
      const topX = pose.x + sin * endDist;
      const topY = pose.y - cos * endDist;
      const pts = [];
      // só entram os pontos do cordão que ficam acima do topo da presilha (senão o traço voltaria sobre si mesmo)
      const hwTop = endDist;
      let fromRing = 0;
      const keep = [];
      for (let i = ring - 1; i >= 0; i -= 1) {
        fromRing += Math.hypot(x[i + 1] - x[i], y[i + 1] - y[i]);
        if (fromRing > hwTop + 12 * scale) keep.push([x[i], y[i]]);
      }
      for (let i = keep.length - 1; i >= 0; i -= 1) pts.push(keep[i]);
      pts.push([topX, topY]);

      // bordas esquerda/direita: ponto ± normal * meia-largura (afunila no topo)
      const left = [];
      const right = [];
      const center = [];
      for (let i = 0; i < pts.length; i += 1) {
        const a = pts[Math.max(i - 1, 0)];
        const b = pts[Math.min(i + 1, pts.length - 1)];
        let tx = b[0] - a[0];
        let ty = b[1] - a[1];
        if (i === pts.length - 1) {
          // na junção, a faixa segue o eixo da presilha
          tx = -sin;
          ty = cos;
        }
        const len = Math.hypot(tx, ty) || 1;
        tx /= len;
        ty /= len;
        const t = i / (pts.length - 1);
        const half = ((STRAP_TOP_W + (STRAP_END_W - STRAP_TOP_W) * t * t) / 2) * scale;
        left.push([pts[i][0] - ty * half, pts[i][1] + tx * half]);
        right.push([pts[i][0] + ty * half, pts[i][1] - tx * half]);
        center.push(pts[i]);
      }
      const l = smoothPath(left);
      const r = smoothPath(right.slice().reverse()).replace(/^M/, "L");
      strapRef.current.setAttribute("d", `${l}${r}Z`);
      strapEdgeRef.current.setAttribute("d", `${l} ${smoothPath(right)}`);
      strapStitchRef.current.setAttribute("d", smoothPath(center));

      // brilho do cartão desliza conforme a inclinação
      sheenRef.current.style.backgroundPositionX = `${50 - pose.angle * 260}%`;
    }

    function frame(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      sim.advance(dt);
      render();
      if (sim.isAsleep()) {
        frameId = 0;
        return;
      }
      frameId = requestAnimationFrame(frame);
    }

    function wake() {
      if (frameId) return;
      lastTime = performance.now();
      frameId = requestAnimationFrame(frame);
    }

    function localPoint(event) {
      const rect = layer.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function onPointerDown(event) {
      enableMotion();
      if (event.button !== undefined && event.button > 0) return;
      const p = localPoint(event);
      const center = { x: sim.nodes.x[sim.nodes.card], y: sim.nodes.y[sim.nodes.card] };
      grabOffset = { x: center.x - p.x, y: center.y - p.y };
      dragPointerId = event.pointerId;
      card.setPointerCapture(event.pointerId);
      card.classList.add("is-dragging");
      sim.grab(p.x + grabOffset.x, p.y + grabOffset.y);
      wake();
    }

    function onPointerMove(event) {
      if (event.pointerId === dragPointerId) {
        const p = localPoint(event);
        sim.dragTo(p.x + grabOffset.x, p.y + grabOffset.y);
        return;
      }
      // hover: velocidade do mouse perto do crachá vira empurrão
      if (event.pointerType !== "mouse" || reducedQuery.matches || !finePointer.matches) return;
      const now = event.timeStamp;
      const prev = lastMove;
      lastMove = { x: event.clientX, y: event.clientY, t: now };
      if (!prev || now - prev.t > 80 || now === prev.t) return;

      const rect = card.getBoundingClientRect();
      const reach = 36 * scale;
      const dx = Math.max(rect.left - event.clientX, 0, event.clientX - rect.right);
      const dy = Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist > reach) return;

      const dtMs = now - prev.t;
      sim.nudge((event.clientX - prev.x) / dtMs, (event.clientY - prev.y) / dtMs, 1 - dist / reach);
      wake();
    }

    function endDrag(event) {
      if (event.pointerId !== dragPointerId) return;
      dragPointerId = null;
      card.classList.remove("is-dragging");
      sim.release();
    }

    // ---- balançar o aparelho: acelerômetro empurra o cartão no sentido oposto ao movimento ----
    const gravityEstimate = { x: 0, y: 0, z: 0 };
    let motionOn = false;

    function onDeviceMotion(event) {
      if (reducedQuery.matches) return;
      let a = event.acceleration;
      if (!a || a.x == null) {
        // sem "acceleration" pura: tira a gravidade do valor bruto com um filtro passa-baixa
        const g = event.accelerationIncludingGravity;
        if (!g || g.x == null) return;
        gravityEstimate.x += (g.x - gravityEstimate.x) * 0.1;
        gravityEstimate.y += (g.y - gravityEstimate.y) * 0.1;
        a = { x: g.x - gravityEstimate.x, y: g.y - gravityEstimate.y };
      }
      // eixos do aparelho -> eixos da tela, conforme a orientação
      const angle = (screen.orientation && screen.orientation.angle) || window.orientation || 0;
      let sx;
      let sy;
      switch ((angle + 360) % 360) {
        case 90: sx = -a.y; sy = -a.x; break;
        case 180: sx = -a.x; sy = a.y; break;
        case 270: sx = a.y; sy = a.x; break;
        default: sx = a.x; sy = -a.y;
      }
      const gain = 260 * scale;
      const dead = 0.35; // ignora tremidinha de segurar na mão
      const fx = Math.abs(sx) > dead ? sx : 0;
      const fy = Math.abs(sy) > dead ? sy : 0;
      if (!fx && !fy) return;
      sim.shake(-fx * gain, -fy * gain);
      wake();
    }

    function enableMotion() {
      if (motionOn || typeof DeviceMotionEvent === "undefined") return;
      if (typeof DeviceMotionEvent.requestPermission === "function") {
        // iOS: a permissão só pode ser pedida a partir de um toque do usuário
        motionOn = true;
        DeviceMotionEvent.requestPermission()
          .then((state) => {
            if (state === "granted") window.addEventListener("devicemotion", onDeviceMotion);
            else motionOn = false;
          })
          .catch(() => {
            motionOn = false;
          });
        return;
      }
      motionOn = true;
      window.addEventListener("devicemotion", onDeviceMotion);
    }

    function onResize() {
      const wasAsleep = !frameId;
      build();
      if (!wasAsleep) wake();
    }

    build();
    wake();
    if (typeof DeviceMotionEvent !== "undefined" && typeof DeviceMotionEvent.requestPermission !== "function") enableMotion();

    card.addEventListener("pointerdown", onPointerDown);
    card.addEventListener("pointerup", endDrag);
    card.addEventListener("pointercancel", endDrag);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize);
    reducedQuery.addEventListener("change", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      card.removeEventListener("pointerdown", onPointerDown);
      card.removeEventListener("pointerup", endDrag);
      card.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("devicemotion", onDeviceMotion);
      reducedQuery.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <div className="dev-badge" ref={layerRef} aria-hidden="true">
      <svg className="dev-badge-strap" preserveAspectRatio="none">
        <defs>
          <linearGradient id="strapFill" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#520a8a" />
            <stop offset="0.5" stopColor="#6a0cb0" />
            <stop offset="1" stopColor="#520a8a" />
          </linearGradient>
        </defs>
        <path ref={strapRef} fill="url(#strapFill)" />
        <path ref={strapEdgeRef} className="dev-badge-edge" fill="none" />
        <path ref={strapStitchRef} className="dev-badge-stitch" fill="none" />
      </svg>

      <div className="dev-badge-body" ref={bodyRef}>
        <div
          className="dev-badge-card"
          ref={cardRef}
          style={{
            width: `calc(${CARD_W}px * var(--s))`,
            height: `calc(${CARD_H}px * var(--s))`,
            top: `calc(${CARD_TOP}px * var(--s))`,
            left: `calc(${-CARD_W / 2}px * var(--s))`,
          }}
        >
          <img src={cardImage} alt="" draggable="false" />
          <span
            className="dev-badge-sheen"
            ref={sheenRef}
            style={{ maskImage: `url(${cardImage})`, WebkitMaskImage: `url(${cardImage})` }}
          />
        </div>
        <img
          className="dev-badge-clip"
          src={lanyardImage}
          alt=""
          draggable="false"
          style={{
            width: `calc(${HW_W}px * var(--s))`,
            height: `calc(${HW_H}px * var(--s))`,
            left: `calc(${-HW_W / 2}px * var(--s))`,
            top: `calc(${-HW_RING_Y}px * var(--s))`,
          }}
        />
      </div>
    </div>
  );
}
