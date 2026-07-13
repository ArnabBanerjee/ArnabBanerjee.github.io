import { For, onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import SectionWrapper from "~/components/SectionWrapper";
import { resume } from "~/data/resume";

function ShieldIcon(props) {
  return (
    <svg class={props.class} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

export default function Certifications() {
  let gridEl, ctx;

  onMount(() => {
    ctx = gsap.context(() => {
      gsap.fromTo(
        gridEl.querySelectorAll(".cert-card"),
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65,
          stagger: { amount: 0.45, from: "start" }, ease: "power3.out",
          scrollTrigger: { trigger: gridEl, start: "top 84%", toggleActions: "play none none none" },
        }
      );

      const primary = gridEl.querySelector(".cert-card-primary");
      if (primary) {
        gsap.to(primary, {
          boxShadow: "0 0 24px 4px rgba(56,189,248,0.18)",
          repeat: -1, yoyo: true, duration: 2.2, ease: "sine.inOut", delay: 1.5,
        });
      }
    });
    onCleanup(() => ctx?.revert());
  });

  return (
    <SectionWrapper id="certifications" title="Certifications">
      <div ref={gridEl} class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <For each={resume.certificationsList}>
          {cert => (
            <div
              class={`cert-card rounded-xl border p-5 flex flex-col gap-3 transition-colors ${
                cert.primary
                  ? "cert-card-primary bg-(--color-accent)/5 border-(--color-accent)/40 hover:border-(--color-accent)/70"
                  : "bg-(--color-card) border-(--color-border) hover:border-(--color-accent)/30"
              }`}
              style="opacity:0"
            >
              <div class="flex items-start gap-3">
                <ShieldIcon class={`w-6 h-6 shrink-0 mt-0.5 ${cert.primary ? "text-(--color-accent)" : "text-(--color-muted)"}`} />
                <div>
                  <div class="text-sm font-semibold leading-snug text-(--color-text)">{cert.name}</div>
                  <div class="text-xs text-(--color-muted) mt-1">{cert.issuer}</div>
                </div>
              </div>
              {cert.period && (
                <div class="text-xs text-(--color-accent) font-medium">{cert.period}</div>
              )}
            </div>
          )}
        </For>
      </div>
    </SectionWrapper>
  );
}
