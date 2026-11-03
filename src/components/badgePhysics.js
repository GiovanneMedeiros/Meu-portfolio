// Simulação física do crachá (sem DOM, sem React).
// Cordão = corrente de pontos (verlet) presa ao topo; o crachá é um corpo rígido
// pendurado no último ponto (a argola). Gravidade, inércia, amortecimento e a
// "mola" do arrasto saem das restrições de distância + integração de verlet.

const STEP = 1 / 120;
const MAX_STEPS_PER_FRAME = 6;
const ITERATIONS = 20;

export function createBadgeSim({ width, height, anchorX, ropeLength, hangLength, scale, reduced }) {
  const SEGMENTS = 5;
  const segLen = ropeLength / SEGMENTS;
  const gravity = 3400 * scale;

  // nós: 0 = âncora (fixa no topo), 1..SEGMENTS = cordão (SEGMENTS = argola), SEGMENTS+1 = centro do cartão
  const count = SEGMENTS + 2;
  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const px = new Float32Array(count);
  const py = new Float32Array(count);
  const invMass = new Float32Array(count).fill(1);
  invMass[0] = 0;
  invMass[count - 1] = 0.45;

  const ring = SEGMENTS;
  const card = count - 1;
  const damping = reduced ? 0.97 : 0.9962;
  const tilt = 0.1; // inclinação inicial (rad)
  const maxStep = 38 * scale;

  for (let i = 0; i <= SEGMENTS; i += 1) {
    x[i] = px[i] = anchorX;
    y[i] = py[i] = -24 + i * ((ropeLength + 24) / SEGMENTS);
  }
  x[card] = px[card] = x[ring] + Math.sin(tilt) * hangLength;
  y[card] = py[card] = y[ring] + Math.cos(tilt) * hangLength;

  const drag = { active: false, tx: 0, ty: 0 };
  const external = { ax: 0, ay: 0 }; // aceleração externa (balançar o aparelho), px/s²
  let time = 0;
  let accumulator = 0;
  let restFrames = 0;

  function solve(a, b, rest) {
    const dx = x[b] - x[a];
    const dy = y[b] - y[a];
    const dist = Math.hypot(dx, dy) || 1e-6;
    const wa = invMass[a];
    const wb = invMass[b];
    const diff = (dist - rest) / (dist * (wa + wb));
    x[a] += dx * diff * wa;
    y[a] += dy * diff * wa;
    x[b] -= dx * diff * wb;
    y[b] -= dy * diff * wb;
  }

  function step() {
    time += STEP;
    const g = gravity * STEP * STEP;

    // brisa mínima: mantém o crachá "vivo" sem parecer animação em loop
    const wind = reduced
      ? 0
      : (Math.sin(time * 0.83) * 0.6 + Math.sin(time * 1.91 + 1.3) * 0.4) * 52 * scale;

    for (let i = 1; i < count; i += 1) {
      let vx = (x[i] - px[i]) * damping;
      let vy = (y[i] - py[i]) * damping;
      const speed = Math.hypot(vx, vy);
      if (speed > maxStep) {
        vx = (vx / speed) * maxStep;
        vy = (vy / speed) * maxStep;
      }
      px[i] = x[i];
      py[i] = y[i];
      x[i] += vx + (i === card ? wind * STEP * STEP : 0) + external.ax * STEP * STEP;
      y[i] += vy + g + external.ay * STEP * STEP;
    }

    // a aceleração do aparelho dura só um instante: some sozinha se os eventos pararem
    external.ax *= 0.9;
    external.ay *= 0.9;

    // arrasto: o cartão persegue o ponteiro como uma mola (a velocidade fica implícita no verlet)
    if (drag.active) {
      x[card] += (drag.tx - x[card]) * 0.28;
      y[card] += (drag.ty - y[card]) * 0.28;
    }

    for (let it = 0; it < ITERATIONS; it += 1) {
      for (let i = 0; i < SEGMENTS; i += 1) solve(i, i + 1, segLen);
      solve(ring, card, hangLength);
    }

    // paredes da área do crachá: quica levemente em vez de sair da tela
    const margin = 24 * scale;
    for (let i = 1; i < count; i += 1) {
      if (x[i] < margin) {
        x[i] = margin;
        px[i] = x[i] + (x[i] - px[i]) * 0.4;
      } else if (x[i] > width - margin) {
        x[i] = width - margin;
        px[i] = x[i] + (x[i] - px[i]) * 0.4;
      }
      if (y[i] > height - margin) y[i] = height - margin;
    }
  }

  return {
    nodes: { x, y, ring, card, segments: SEGMENTS },

    advance(deltaSeconds) {
      accumulator = Math.min(accumulator + deltaSeconds, STEP * MAX_STEPS_PER_FRAME);
      while (accumulator >= STEP) {
        step();
        accumulator -= STEP;
      }
    },

    // true quando o sistema parou de vez (permite suspender o rAF)
    isAsleep() {
      if (!reduced || drag.active) return false;
      let energy = 0;
      for (let i = 1; i < count; i += 1) {
        energy = Math.max(energy, Math.abs(x[i] - px[i]) + Math.abs(y[i] - py[i]));
      }
      restFrames = energy < 0.002 * scale ? restFrames + 1 : 0;
      return restFrames > 45;
    },

    // ângulo do corpo rígido (em rad, sentido horário do CSS) e posição da argola
    pose() {
      const dx = x[card] - x[ring];
      const dy = y[card] - y[ring];
      return { x: x[ring], y: y[ring], angle: Math.atan2(-dx, dy) };
    },

    // empurrão ao passar o mouse: vx/vy em px/ms
    nudge(vx, vy, strength) {
      const k = 6 * strength * scale;
      const cap = 24 * scale;
      px[card] -= Math.max(-cap, Math.min(cap, vx * k));
      py[card] -= Math.max(-cap * 0.5, Math.min(cap * 0.5, vy * k * 0.5));
      restFrames = 0;
    },

    // aceleração do aparelho em px/s² (já no referencial da tela, sinal de força de inércia)
    shake(ax, ay) {
      const cap = 9000 * scale;
      external.ax = Math.max(-cap, Math.min(cap, ax));
      external.ay = Math.max(-cap, Math.min(cap, ay));
      restFrames = 0;
    },

    grab(tx, ty) {
      drag.active = true;
      drag.tx = tx;
      drag.ty = ty;
      restFrames = 0;
    },
    dragTo(tx, ty) {
      drag.tx = tx;
      drag.ty = ty;
    },
    release() {
      drag.active = false;
    },
    isDragging: () => drag.active,
  };
}
