import { For, onMount, onCleanup } from "solid-js";
import { gsap } from "~/lib/animations";
import SectionWrapper from "~/components/SectionWrapper";
import LottiePlayer from "~/components/LottiePlayer";
import { resume } from "~/data/resume";
import WebDev0Url from "~/assets/animations/Web_Development_0.lottie?url";

function SkillCard(props) {
  return (
    <div
      class="skill-card bg-(--color-card) border border-(--color-border) rounded-xl p-5 hover:border-(--color-accent)/40 transition-colors cursor-default"
      style="opacity:0; will-change: transform"
    >
      <h3 class="text-xs font-bold uppercase tracking-widest text-(--color-accent) mb-3">
        {props.skill.category}
      </h3>
      <div class="flex flex-wrap gap-2">
        <For each={props.skill.items}>
          {item => (
            <span class="text-xs px-2.5 py-1 rounded-md bg-(--color-surface) border border-(--color-border) text-(--color-muted)">
              {item}
            </span>
          )}
        </For>
      </div>
    </div>
  );
}

export default function Skills() {
  let containerEl, ctx;
  const skills = resume.skills;

  onMount(() => {
    ctx = gsap.context(() => {
      const cards = containerEl.querySelectorAll(".skill-card");

      gsap.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6,
          stagger: { amount: 0.5, from: "start" }, ease: "power3.out",
          scrollTrigger: { trigger: containerEl, start: "top 82%", toggleActions: "play none none none" },
        }
      );

      cards.forEach(card => {
        card.addEventListener("mousemove", e => {
          const rect = card.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          gsap.to(card, { rotateX: -dy * 5, rotateY: dx * 5, duration: 0.3, ease: "power1.out", transformPerspective: 600 });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
        });
      });
    });
    onCleanup(() => ctx?.revert());
  });

  return (
    <SectionWrapper id="skills" title="Skills" dark>
      <div ref={containerEl}>

        {/* ── Desktop: tiles surrounding centered animation ── */}
        <div class="hidden lg:grid grid-cols-4 gap-5">
          {/* Row 1 — 4 tiles */}
          <SkillCard skill={skills[0]} />
          <SkillCard skill={skills[1]} />
          <SkillCard skill={skills[2]} />
          <SkillCard skill={skills[3]} />

          {/* Rows 2-3 — side tile | animation (2×2) | side tile */}
          <SkillCard skill={skills[4]} />
          <div class="col-span-2 row-span-2 hidden lg:flex items-center justify-center rounded-2xl border border-(--color-border)/40 bg-(--color-card)/20">
            <LottiePlayer
              src={WebDev0Url}
              class="w-128 h-128 aspect-square drop-shadow-[0_0_48px_rgba(56,189,248,0.12)]"
            />
          </div>
          <SkillCard skill={skills[5]} />

          <SkillCard skill={skills[6]} />
          <SkillCard skill={skills[7]} />
        </div>

        {/* ── Mobile / tablet: animation above, 2-col grid below ── */}
        <div class="lg:hidden">
          <div class="hidden lg:flex justify-center mb-6">
            <LottiePlayer
              src={WebDev0Url}
              class="w-128 h-128 aspect-square drop-shadow-[0_0_48px_rgba(56,189,248,0.12)]"
            />
          </div>
          <div class="grid sm:grid-cols-2 gap-5">
            <For each={skills}>
              {skill => <SkillCard skill={skill} />}
            </For>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}
