import { onMount, onCleanup } from "solid-js";
import Nav from "~/components/Nav";
import Hero from "~/components/Hero";
import About from "~/components/About";
import Experience from "~/components/Experience";
import Skills from "~/components/Skills";
import Certifications from "~/components/Certifications";
import Education from "~/components/Education";
import Footer from "~/components/Footer";

function ScrollProgress() {
  let barEl;
  onMount(() => {
    import("~/lib/animations").then(({ gsap, ScrollTrigger }) => {
      gsap.to(barEl, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    });
    onCleanup(() => {});
  });
  return <div id="scroll-progress" ref={barEl} />;
}

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
        <Footer />
      </main>
    </>
  );
}
