import { onMount, onCleanup } from "solid-js";
import { gsap, splitWords } from "~/lib/animations";

export default function SectionWrapper(props) {
  let titleEl, lineEl, ctx;

  onMount(() => {
    if (!titleEl) return;
    ctx = gsap.context(() => {
      const words = splitWords(titleEl);
      gsap.fromTo(words,
        { y: "110%", opacity: 0 },
        {
          y: "0%", opacity: 1, duration: 0.75, stagger: 0.07, ease: "power3.out",
          scrollTrigger: { trigger: titleEl, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      gsap.fromTo(lineEl,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 0.6, ease: "power2.out", delay: 0.25,
          scrollTrigger: { trigger: titleEl, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
    onCleanup(() => ctx?.revert());
  });

  return (
    <section
      id={props.id}
      class={`py-12 px-4 sm:px-6 lg:px-8 md:py-20 ${props.dark ? "bg-(--color-surface)" : "bg-(--color-bg)"}`}
    >
      <div class="max-w-6xl mx-auto">
        {props.title && (
          <div class="mb-8 md:mb-12">
            <h2
              ref={titleEl}
              class="text-2xl sm:text-3xl font-bold text-(--color-text) tracking-tight overflow-hidden"
              style="opacity: 0"
            >
              {props.title}
            </h2>
            <div ref={lineEl} class="mt-2 h-0.5 w-16 bg-(--color-accent) rounded origin-left" style="transform: scaleX(0)" />
          </div>
        )}
        {props.children}
      </div>
    </section>
  );
}
