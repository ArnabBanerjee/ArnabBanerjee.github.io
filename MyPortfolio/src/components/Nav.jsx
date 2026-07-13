import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import { resume } from "~/data/resume";

const NAV_LINKS = [
  { label: "About",          href: "#about"          },
  { label: "Experience",     href: "#experience"     },
  { label: "Skills",         href: "#skills"         },
  { label: "Certifications", href: "#certifications" },
  { label: "Education",      href: "#education"      },
];

function vivusDraw(el, duration = 30) {
  if (!el) return;
  import("vivus").then(({ default: Vivus }) => {
    el.querySelectorAll("path, polyline, line, rect, ellipse").forEach(s => {
      try {
        const len = s.getTotalLength();
        s.style.strokeDasharray = `${len}`;
        s.style.strokeDashoffset = `${len}`;
      } catch {}
    });
    new Vivus(el, { type: "oneByOne", duration, animTimingFunction: Vivus.EASE_OUT });
  });
}

function NavLinkItem(props) {
  let ulSvg;

  const onEnter = () => {
    if (props.active) return;
    ulSvg.style.opacity = "1";
    vivusDraw(ulSvg, 10);
  };
  const onLeave = () => {
    if (!ulSvg || props.active) return;
    gsap.to(ulSvg, { opacity: 0, duration: 0.15 });
  };

  createEffect(() => {
    if (!ulSvg) return;
    if (props.active) {
      ulSvg.style.opacity = "1";
      vivusDraw(ulSvg, 10);
    } else {
      ulSvg.style.opacity = "0";
    }
  });

  return (
    <li>
      <a
        href={props.href}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        class={`group relative inline-flex flex-col items-center px-2.5 py-1.5 text-[13px] font-medium tracking-wide rounded-md transition-colors duration-200 ${
          props.active
            ? "text-(--color-accent)"
            : "text-(--color-muted) hover:text-(--color-text)"
        }`}
      >
        {/* bracket decorators */}
        <span class="flex items-center gap-1">
          <span class={`font-mono text-[11px] transition-all duration-200 text-(--color-accent) ${props.active ? "opacity-70" : "opacity-0 group-hover:opacity-50"}`}>[</span>
          {props.label}
          <span class={`font-mono text-[11px] transition-all duration-200 text-(--color-accent) ${props.active ? "opacity-70" : "opacity-0 group-hover:opacity-50"}`}>]</span>
        </span>
        {/* Vivus underline */}
        <svg
          ref={ulSvg}
          viewBox="0 0 40 2"
          class="w-full h-[2px] mt-0.5"
          style="opacity: 0"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
        >
          <path d="M 0 1 L 40 1" />
        </svg>
      </a>
    </li>
  );
}

export default function Nav() {
  const [active,   setActive]   = createSignal("");
  const [menuOpen, setMenu]     = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);
  let navEl, logoEl, mobileMenuEl;

  onMount(() => {
    gsap.set(navEl, { y: -72, opacity: 0 });
    gsap.to(navEl, {
      y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.55,
      onComplete: () => vivusDraw(logoEl, 222),
    });

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = NAV_LINKS
      .map(l => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive("#" + e.target.id); }),
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(s => obs.observe(s));

    onCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    });
  });

  // Stagger mobile links in when menu opens
  createEffect(() => {
    if (menuOpen() && mobileMenuEl) {
      gsap.fromTo(
        mobileMenuEl.querySelectorAll(".mobile-link"),
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.06, duration: 0.38, ease: "power2.out" }
      );
    }
  });

  return (
    <>
      <nav
        ref={navEl}
        class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={`height: var(--nav-height); ${
          scrolled()
            ? "background: rgba(15,23,42,0.97); backdrop-filter: blur(20px); box-shadow: 0 4px 32px rgba(0,0,0,0.5);"
            : "background: rgba(15,23,42,0.72); backdrop-filter: blur(12px);"
        }`}
      >
        {/* Animated gradient bottom border */}
        <div class="nav-accent-border absolute bottom-0 left-0 right-0 h-px opacity-70" />

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <a href="#" aria-label="Home" class="flex items-center gap-3 shrink-0 group">
            {/* Glow halo behind SVG */}
            <div class="relative">
              <div class="absolute inset-0 scale-150 rounded-full blur-lg bg-(--color-accent)/0 group-hover:bg-(--color-accent)/15 transition-all duration-500 pointer-events-none" />
              <svg
                ref={logoEl}
                viewBox="0 0 80 36"
                width="80"
                height="36"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="relative text-(--color-accent) transition-all duration-300"
                style="filter: drop-shadow(0 0 6px rgba(56,189,248,0.35))"
              >
                {/* A */}
                <path d="M 2 32 L 14 4 L 26 32" stroke-width="2.2" />
                <path d="M 6.5 21 L 21.5 21" stroke-width="2.2" />
                <path d="M 14 4 L 14 1"   stroke-width="1.2" opacity="0.45" />
                <path d="M 2 32 L 0 32"   stroke-width="1.2" opacity="0.35" />
                <path d="M 26 32 L 28 32" stroke-width="1.2" opacity="0.35" />
                {/* Divider */}
                <line x1="35" y1="8" x2="35" y2="28" stroke-width="0.7" opacity="0.3" />
                {/* B */}
                <path d="M 42 4 L 42 32" stroke-width="2.2" />
                <path d="M 42 4 C 57 4 59 18 42 18"  stroke-width="2.2" />
                <path d="M 42 18 C 62 18 64 32 42 32" stroke-width="2.2" />
                <path d="M 42 4 L 39 4"   stroke-width="1.2" opacity="0.45" />
                <path d="M 42 32 L 39 32" stroke-width="1.2" opacity="0.45" />
              </svg>
            </div>
          </a>

          {/* ── Desktop nav links ── */}
          <ul class="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <NavLinkItem
                label={link.label}
                href={link.href}
                active={active() === link.href}
              />
            ))}
          </ul>

          {/* ── CTA + Hamburger ── */}
          <div class="flex items-center gap-3 shrink-0">
            <a
              href="#footer"
              class="cta-shine hidden lg:inline-flex relative overflow-hidden items-center gap-1.5 text-[13px] font-bold px-5 py-2 rounded-lg transition-transform duration-150 active:scale-95"
              style="background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%); color: #020617;"
            >
              <span class="relative z-10">Hire Me</span>
              <svg class="w-3.5 h-3.5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            {/* Animated hamburger → X */}
            <button
              class="lg:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-(--color-card) transition-colors"
              onClick={() => setMenu(o => !o)}
              aria-label="Toggle menu"
            >
              <span class={`block h-[2px] bg-(--color-muted) rounded-full transition-all duration-300 origin-center ${menuOpen() ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`} />
              <span class={`block h-[2px] bg-(--color-muted) rounded-full transition-all duration-150 ${menuOpen() ? "w-0 opacity-0" : "w-3.5 opacity-100"}`} />
              <span class={`block h-[2px] bg-(--color-muted) rounded-full transition-all duration-300 origin-center ${menuOpen() ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Full-screen mobile overlay ── */}
      {menuOpen() && (
        <div
          ref={mobileMenuEl}
          class="fixed inset-0 z-40 flex flex-col justify-center px-8 sm:px-12"
          style="padding-top: var(--nav-height); background: rgba(2,6,23,0.97); backdrop-filter: blur(24px);"
        >
          {/* Decorative accent orb */}
          <div class="absolute top-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
               style="background: rgba(56,189,248,0.06)" />

          <ul class="flex flex-col gap-1 mb-10">
            {NAV_LINKS.map((link, i) => (
              <li class="mobile-link" style="opacity: 0">
                <a
                  href={link.href}
                  onClick={() => setMenu(false)}
                  class={`group flex items-end gap-4 py-3.5 border-b transition-colors duration-200 ${
                    active() === link.href
                      ? "border-(--color-accent)/40 text-(--color-accent)"
                      : "border-(--color-border)/30 text-(--color-text)/80 hover:text-(--color-accent) hover:border-(--color-accent)/30"
                  }`}
                >
                  <span class="font-mono text-xs text-(--color-muted)/50 mb-1 w-6 text-right shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span class="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">
                    {link.label}
                  </span>
                  <svg class="w-5 h-5 mb-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#footer"
            onClick={() => setMenu(false)}
            class="mobile-link cta-shine relative overflow-hidden inline-flex items-center gap-2 self-start text-sm font-bold px-7 py-3.5 rounded-xl"
            style="background: linear-gradient(135deg, #38bdf8, #3b82f6); color: #020617; opacity: 0"
          >
            <span class="relative z-10">Hire Me →</span>
          </a>
        </div>
      )}
    </>
  );
}
