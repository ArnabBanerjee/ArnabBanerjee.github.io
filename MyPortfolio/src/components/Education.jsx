import { For, onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import SectionWrapper from "~/components/SectionWrapper";
import { resume } from "~/data/resume";

export default function Education() {
  let containerEl, ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      containerEl.querySelectorAll(".edu-card").forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -50 : 50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: i * 0.12,
            scrollTrigger: { trigger: containerEl, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      });
    });
    onCleanup(() => ctx?.revert());
  });

  return (
    <SectionWrapper id="education" title="Education" dark>
      <div ref={containerEl} class="grid sm:grid-cols-2 gap-5">
        <For each={resume.education}>
          {edu => (
            <div
              class="edu-card bg-(--color-card) border border-(--color-border) rounded-xl p-6 hover:border-(--color-accent)/40 transition-colors"
              style="opacity:0"
            >
              <div class="flex items-start justify-between gap-4 mb-3">
                <span class="text-2xl font-extrabold text-(--color-accent)">{edu.degree}</span>
                <span class="text-xs font-bold text-(--color-accent) bg-(--color-accent)/10 px-3 py-1 rounded-full border border-(--color-accent)/30 whitespace-nowrap">
                  {edu.grade}
                </span>
              </div>
              <div class="text-sm font-medium text-(--color-text) leading-snug mb-1">{edu.institution}</div>
              <div class="text-xs text-(--color-muted)">{edu.period}</div>
            </div>
          )}
        </For>
      </div>
    </SectionWrapper>
  );
}
