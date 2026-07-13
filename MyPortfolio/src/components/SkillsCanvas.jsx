import { onMount, onCleanup } from "solid-js";
import { resume } from "~/data/resume";

const CORE = new Set(resume.coreStack);

// Deduplicated pool of all skill strings
const SKILL_POOL = [
  ...resume.coreStack,
  ...resume.skills.flatMap(cat => cat.items),
].filter((v, i, a) => a.indexOf(v) === i);

const PARTICLE_COUNT = 65;

function spawn(canvas) {
  const text  = SKILL_POOL[Math.floor(Math.random() * SKILL_POOL.length)];
  const core  = CORE.has(text);
  const speed = core ? 0.28 : 0.18;
  return {
    text,
    x:        Math.random() * canvas.width,
    y:        Math.random() * canvas.height,
    vx:       (Math.random() - 0.5) * speed,
    vy:       (Math.random() - 0.5) * speed * 0.7,
    alpha:    core
                ? Math.random() * 0.22 + 0.32   // 0.32–0.54
                : Math.random() * 0.18 + 0.18,   // 0.18–0.36
    fontSize: core
                ? Math.floor(Math.random() * 4) + 13  // 13–16 px
                : Math.floor(Math.random() * 4) + 11,  // 11–14 px
    rotation:  (Math.random() - 0.5) * 0.26,     // ±~7.5°
    rotVel:    (Math.random() - 0.5) * 0.0007,   // very slow drift
    // 65 % accent (sky-400), 35 % muted — core always accent
    color:    (core || Math.random() > 0.35) ? "56,189,248" : "148,163,184",
  };
}

export default function SkillsCanvas() {
  let canvasEl;
  let raf;

  onMount(() => {
    const canvas = canvasEl;
    const ctx    = canvas.getContext("2d");
    let particles = [];

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => spawn(canvas));
    }
    resize();

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;

      for (const p of particles) {
        p.x        += p.vx;
        p.y        += p.vy;
        p.rotation += p.rotVel;

        // Wrap around with a generous off-screen margin
        if (p.x < -130) p.x = W + 130;
        if (p.x > W + 130) p.x = -130;
        if (p.y < -30)    p.y = H + 30;
        if (p.y > H + 30) p.y = -30;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.font      = `${p.fontSize}px "JetBrains Mono","Fira Code",Consolas,monospace`;
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.fillText(p.text, 0, 0);
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    }
    tick();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    onCleanup(() => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    });
  });

  return (
    <canvas
      ref={canvasEl}
      aria-hidden="true"
      class="absolute inset-0 w-full h-full pointer-events-none"
      style="z-index: 1"
    />
  );
}
