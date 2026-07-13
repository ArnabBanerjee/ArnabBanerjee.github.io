import { onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import SectionWrapper from "~/components/SectionWrapper";
import LottiePlayer from "~/components/LottiePlayer";
import { resume } from "~/data/resume";
import WebDevUrl from "~/assets/animations/Web_Development_1.lottie?url";

export default function About() {
  let summaryEl, infoEl, ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      const st = { start: "top 85%", toggleActions: "play none none none" };
      gsap.fromTo(
        summaryEl,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: summaryEl, ...st },
        },
      );
      gsap.fromTo(
        infoEl,
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: infoEl, ...st },
        },
      );
    });
    onCleanup(() => ctx?.revert());
  });

  return (
    <SectionWrapper id="about" title="About" dark>
      <div class="grid md:grid-cols-3 gap-10">
        <div ref={summaryEl} class="md:col-span-2" style="opacity:0">
          <p class="text-(--color-muted) leading-relaxed text-base">
            {resume.summary}
          </p>
          <div class="mt-4 flex flex-wrap gap-2">
            {resume.certifications.map((cert) => (
              <span class="text-xs px-3 py-1 rounded-full bg-(--color-accent)/10 text-(--color-accent) border border-(--color-accent)/30 font-medium">
                {cert}
              </span>
            ))}
          </div>
          <br />
          <div>
            <div class="text-(--color-muted) text-xs uppercase tracking-widest mb-1">
              Location
            </div>
            <div class="text-(--color-text)">Kolkata, India</div>
          </div>
          <div>
            <div class="text-(--color-muted) text-xs uppercase tracking-widest mb-1">
              Experience
            </div>
            <div class="text-(--color-text)">8+ years</div>
          </div>
          <div>
            <div class="text-(--color-muted) text-xs uppercase tracking-widest mb-1">
              Domains
            </div>
            <div class="text-(--color-text)">
              Insurance · Healthcare · Property · E-commerce
            </div>
          </div>
          <div>
            <div class="text-(--color-muted) text-xs uppercase tracking-widest mb-2">
              Core Stack
            </div>
            <div class="flex flex-wrap gap-1.5">
              {resume.coreStack.map((tech) => (
                <span class="text-xs px-2 py-0.5 rounded bg-(--color-card) border border-(--color-border) text-(--color-muted)">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div ref={infoEl} class="hidden lg:flex flex-col gap-4 text-sm" style="opacity:0">
          <LottiePlayer
            src={WebDevUrl}
            class="w-100 h-100 aspect-square mx-auto md:mx-0 mb-2"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
