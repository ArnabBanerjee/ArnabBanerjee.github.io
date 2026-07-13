import { For, onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import SectionWrapper from "~/components/SectionWrapper";
import { resume } from "~/data/resume";

function highlightMetrics(text) {
  const parts = text.split(/(\b\d[\d,.×xX]*[%×xK+ms]*\b|\d+s\s*→\s*\d+ms|\d+[KkMm]\+?)/g);
  return parts.map((part, i) => {
    if (/(\b\d[\d,.×]*[%×xK+ms]*\b|\d+s\s*→\s*\d+ms|\d+[KkMm]\+?)/.test(part) && i % 2 === 1) {
      return <span class="text-(--color-accent) font-semibold">{part}</span>;
    }
    return part;
  });
}

export default function Experience() {
  let listEl, lineEl, ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(lineEl,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1, duration: 1.4, ease: "power2.inOut",
          scrollTrigger: { trigger: listEl, start: "top 80%", end: "bottom 60%", scrub: 0.6 },
        }
      );
      listEl.querySelectorAll(".job-entry").forEach(entry => {
        gsap.fromTo(entry,
          { x: -30, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: entry, start: "top 87%", toggleActions: "play none none none" },
          }
        );
      });
    });
    onCleanup(() => ctx?.revert());
  });

  return (
    <SectionWrapper id="experience" title="Experience">
      <div class="relative" ref={listEl}>
        <div
          ref={lineEl}
          class="absolute left-3 top-2 bottom-2 w-px bg-(--color-border)"
          style="transform: scaleY(0); transform-origin: top center"
        />

        <div class="flex flex-col gap-12">
          <For each={resume.experience}>
            {(job, i) => (
              <div class="job-entry pl-10 relative" style="opacity:0">
                <div class={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${i() === 0
                    ? "border-(--color-accent) bg-(--color-accent)/20"
                    : "border-(--color-border) bg-(--color-bg)"
                  }`}>
                  <div class={`w-2 h-2 rounded-full ${i() === 0 ? "bg-(--color-accent)" : "bg-(--color-border)"}`} />
                </div>

                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
                  <h3 class="text-sm sm:text-base font-bold text-(--color-text) leading-snug">{job.title}</h3>
                  <span class="text-xs text-(--color-muted) whitespace-nowrap shrink-0">{job.period}</span>
                </div>
                <div class="text-sm text-(--color-accent) mb-3">
                  {job.company} · <span class="text-(--color-muted)">{job.location}</span>
                </div>

                <ul class="flex flex-col gap-2">
                  <For each={job.bullets}>
                    {bullet => (
                      <li class="flex gap-2 text-sm text-(--color-muted) leading-relaxed">
                        <span class="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-(--color-border)" />
                        <span>{highlightMetrics(bullet)}</span>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
      </div>
    </SectionWrapper>
  );
}
