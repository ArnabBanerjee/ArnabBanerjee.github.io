import { onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import { resume } from "~/data/resume";
import LottiePlayer from "~/components/LottiePlayer";
import FeedbackUrl from "~/assets/animations/Feedback.lottie?url";

const SOCIAL = [
  {
    label: "GitHub",
    href: () => resume.github,
    icon: (
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: () => resume.linkedin,
    icon: (
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: () => `mailto:${resume.email}`,
    icon: (
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "Book a Call",
    href: () => resume.calendly,
    icon: (
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
];

export default function Footer() {
  let footerEl, headlineEl, subEl, socialEl, circuitEl, monogramEl, ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      const st = { trigger: footerEl, start: "top 90%", toggleActions: "play none none none" };

      // Vivus: circuit line draws left-to-right on scroll-enter
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        import("vivus").then(({ default: Vivus }) => {
          [circuitEl, monogramEl].forEach(el => {
            if (!el) return;
            el.querySelectorAll("path, line, polyline, rect, ellipse").forEach(s => {
              try {
                const len = s.getTotalLength();
                s.style.strokeDasharray = `${len}`;
                s.style.strokeDashoffset = `${len}`;
              } catch {}
            });
          });
          new Vivus(circuitEl,  { type: "delayed",   duration: 120, animTimingFunction: Vivus.EASE });
          new Vivus(monogramEl, { type: "oneByOne",  duration: 60,  animTimingFunction: Vivus.EASE_OUT, start: "autostart" });
        });
      }, { threshold: 0.1 });
      observer.observe(footerEl);

      // GSAP text reveals
      gsap.fromTo(headlineEl.children,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.85, stagger: 0.12, ease: "power3.out", scrollTrigger: st }
      );
      gsap.fromTo(subEl,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { ...st, start: "top 88%" } }
      );
      gsap.fromTo(socialEl.children,
        { y: 16, opacity: 0, scale: 0.85 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.5)",
          scrollTrigger: { ...st, start: "top 85%" } }
      );
    });

    onCleanup(() => ctx?.revert());
  });

  return (
    <footer ref={footerEl} id="footer" class="relative overflow-hidden bg-(--color-bg) border-t border-(--color-border)">

      {/* ── Vivus circuit line across the top ── */}
      <div class="absolute top-0 left-0 right-0 h-8 pointer-events-none" aria-hidden="true">
        <svg
          ref={circuitEl}
          viewBox="0 0 1200 28"
          preserveAspectRatio="none"
          class="w-full h-full text-(--color-accent)"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M 0 14 L 80 14 L 92 4 L 104 24 L 116 14 L 280 14" stroke-width="1" opacity="0.6" />
          <path d="M 280 14 L 360 14 L 372 4 L 384 24 L 396 14 L 520 14" stroke-width="1" opacity="0.4" />
          <path d="M 520 14 L 580 14 L 592 4 L 604 24 L 616 14 L 720 14" stroke-width="1.2" opacity="0.7" />
          <path d="M 720 14 L 800 14 L 812 4 L 824 24 L 836 14 L 960 14" stroke-width="1" opacity="0.4" />
          <path d="M 960 14 L 1040 14 L 1052 4 L 1064 24 L 1076 14 L 1200 14" stroke-width="1" opacity="0.6" />
          <circle cx="280" cy="14" r="3" fill="currentColor" stroke="none" opacity="0.5" />
          <circle cx="520" cy="14" r="3" fill="currentColor" stroke="none" opacity="0.5" />
          <circle cx="720" cy="14" r="3" fill="currentColor" stroke="none" opacity="0.5" />
          <circle cx="960" cy="14" r="3" fill="currentColor" stroke="none" opacity="0.5" />
        </svg>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div class="grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-20 items-center">

          {/* ── Left: headline + sub + socials ── */}
          <div>
            {/* Eyebrow */}
            <p class="text-xs font-bold uppercase tracking-[0.25em] text-(--color-accent) mb-5">
              Available for opportunities
            </p>

            {/* Big headline — each line wrapped for GSAP stagger */}
            <div ref={headlineEl} class="overflow-hidden mb-6">
              <div class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-(--color-text) leading-tight overflow-hidden">
                Building systems
              </div>
              <div class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight overflow-hidden"
                   style="background: linear-gradient(90deg, #38bdf8, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                that scale at speed.
              </div>
            </div>

            {/* Subtext */}
            <p ref={subEl} class="text-(--color-muted) text-base sm:text-lg leading-relaxed max-w-xl mb-10" style="opacity:0">
              Turning complex distributed problems into elegant, production-grade infrastructure.
              AWS · Kubernetes · Terraform · TypeScript — let's architect something extraordinary.
            </p>

            {/* Social links */}
            <div ref={socialEl} class="flex flex-wrap items-center gap-3">
              {SOCIAL.map(s => (
                <a
                  href={s.href()}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  class="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-(--color-border) text-(--color-muted) hover:border-(--color-accent)/60 hover:text-(--color-accent) hover:bg-(--color-accent)/5 transition-all duration-200"
                  style="opacity:0"
                >
                  {s.icon}
                  <span class="text-sm font-medium">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right: large AB monogram ── */}
          <div class="hidden lg:flex items-center justify-center" aria-hidden="true">
            <LottiePlayer src={FeedbackUrl} class="w-128 h-128 aspect-square" />
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div class="mt-14 pt-6 border-t border-(--color-border)/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-(--color-muted)">
          <span>© {new Date().getFullYear()} {resume.name} · All rights reserved.</span>
          <span class="flex items-center gap-1.5">
            Crafted with
            <svg class="w-3.5 h-3.5 text-red-400 inline" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
            </svg>
            using SolidJS · Tailwind CSS v4 · GSAP · Vivus
          </span>
        </div>
      </div>
    </footer>
  );
}
