import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Wraps each word in a <span class="word"> and each char in a <span class="char">
 * so GSAP can animate per-character. Returns the wrapper spans.
 */
export function splitChars(el) {
  const text = el.textContent;
  el.textContent = "";
  el.style.overflow = "hidden";

  const chars = [];
  [...text].forEach(char => {
    const span = document.createElement("span");
    span.textContent = char === " " ? " " : char;
    span.style.display = "inline-block";
    el.appendChild(span);
    chars.push(span);
  });
  return chars;
}

/**
 * Splits text into word spans (each word wrapped in an overflow:hidden container
 * so words clip-reveal upward — the brandonbartram style).
 */
export function splitWords(el) {
  const words = el.textContent.trim().split(/\s+/);
  el.textContent = "";

  const spans = [];
  words.forEach((word, i) => {
    const wrapper = document.createElement("span");
    wrapper.style.display = "inline-block";
    wrapper.style.overflow = "hidden";
    wrapper.style.verticalAlign = "bottom";

    const inner = document.createElement("span");
    inner.textContent = word;
    inner.style.display = "inline-block";

    wrapper.appendChild(inner);
    el.appendChild(wrapper);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    spans.push(inner);
  });
  return spans;
}

/**
 * Fade + slide up on scroll — used by most sections.
 */
export function revealOnScroll(targets, options = {}) {
  const { stagger = 0, delay = 0, y = 40, duration = 0.8, ...rest } = options;
  return gsap.fromTo(
    targets,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: Array.isArray(targets) ? targets[0] : targets,
        start: "top 88%",
        toggleActions: "play none none none",
      },
      ...rest,
    }
  );
}

/**
 * Animated counter — counts from 0 to a target number.
 */
export function animateCounter(el, targetStr, options = {}) {
  const match  = targetStr.match(/([\d.]+)(.*)/);
  if (!match) return;
  const target  = parseFloat(match[1]);
  const suffix  = match[2];        // %, ×, etc.
  const decimals = match[1].includes(".") ? 1 : 0;

  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: options.duration || 1.6,
    ease: "power2.out",
    delay: options.delay || 0,
    onUpdate() {
      el.textContent = obj.val.toFixed(decimals) + suffix;
    },
    scrollTrigger: options.scrollTrigger,
  });
}
