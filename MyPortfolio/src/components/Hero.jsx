import { onMount, onCleanup } from "solid-js";
import { gsap, splitWords } from "~/lib/animations";
import { resume } from "~/data/resume";
import SkillsCanvas from "~/components/SkillsCanvas";
import LottiePlayer from "~/components/LottiePlayer";
import CodingUrl from "~/assets/animations/Coding.lottie?url";

export default function Hero() {
  let nameEl, titleEl, subtitleEl, certsEl, stackEl, ctaEl;
  let ctx;

  onMount(() => {
    // ── GSAP entrance sequence ────────────────────────────────────
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const nameWords = splitWords(nameEl);
      tl.fromTo(nameWords,
        { y: "110%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.9, stagger: 0.08 },
        0
      );
      tl.fromTo(titleEl,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.55
      );
      tl.fromTo(subtitleEl,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.75
      );
      tl.fromTo(certsEl.children,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        0.9
      );
      tl.fromTo(stackEl.children,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.04 },
        1.1
      );
      tl.fromTo(ctaEl.children,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        1.35
      );
    });

    onCleanup(() => ctx?.revert());
  });

  return (
    <div
      class="relative min-h-screen flex items-center overflow-hidden"
      style="padding-top: var(--nav-height); background: #071222"
    >
      {/* Skills text particle canvas */}
      <SkillsCanvas />

      {/* Bottom fade */}
      <div class="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none" style="background: linear-gradient(to top, #071222, transparent)" />

      <div class="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-20 items-center">

        {/* ── Text column ── */}
        <div class="text-center lg:text-left">

          <h1
            ref={nameEl}
            class="text-5xl sm:text-6xl lg:text-5xl xl:text-7xl font-extrabold tracking-tight text-(--color-text) mb-3 leading-tight"
            style="opacity: 0"
          >
            {resume.name}
          </h1>

          <p ref={titleEl} class="text-xl sm:text-2xl font-medium text-(--color-accent) mb-1" style="opacity:0">
            {resume.title}
          </p>

          <p ref={subtitleEl} class="text-base sm:text-lg text-(--color-muted) mb-7" style="opacity:0">
            {resume.subtitle}
          </p>

          <div ref={certsEl} class="flex flex-wrap justify-center lg:justify-start gap-2 mb-7">
            {resume.certifications.map(cert => (
              <span
                class="text-xs px-3 py-1 rounded-full border border-(--color-accent)/40 text-(--color-accent) bg-(--color-accent)/5 font-medium"
                style="opacity:0"
              >
                {cert}
              </span>
            ))}
          </div>

          <div ref={stackEl} class="flex flex-wrap justify-center lg:justify-start gap-2 mb-9">
            {resume.coreStack.map(tech => (
              <span
                class="text-xs px-3 py-1 rounded-md bg-(--color-card) text-(--color-muted) border border-(--color-border)"
                style="opacity:0"
              >
                {tech}
              </span>
            ))}
          </div>

          <div ref={ctaEl} class="flex flex-wrap justify-center lg:justify-start gap-3">
            <a
              href={resume.cv}
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-(--color-accent) text-slate-950 font-semibold text-sm hover:bg-sky-300 transition-colors"
              style="opacity:0"
              target="_blank"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
            <a
              href={resume.github}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-(--color-border) text-(--color-text) font-semibold text-sm hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
              style="opacity:0"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href={resume.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-(--color-border) text-(--color-text) font-semibold text-sm hover:border-(--color-accent) hover:text-(--color-accent) transition-colors"
              style="opacity:0"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a
              href={resume.calendly}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-(--color-accent)/10 border border-(--color-accent)/40 text-(--color-accent) font-semibold text-sm hover:bg-(--color-accent)/20 transition-colors"
              style="opacity:0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Book a Call
            </a>
          </div>
        </div>

        {/* ── Lottie coding animation (desktop only) ── */}
        <div class="hidden lg:flex items-center justify-center">
          <LottiePlayer
            src={CodingUrl}
            class="w-128 h-128 aspect-square drop-shadow-[0_0_48px_rgba(56,189,248,0.12)]"
          />
        </div>
      </div>
    </div>
  );
}
