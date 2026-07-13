import { onMount, onCleanup } from "solid-js";

export default function LottiePlayer(props) {
  let canvasEl;
  let player;

  onMount(() => {
    import("@lottiefiles/dotlottie-web").then(({ DotLottie }) => {
      player = new DotLottie({
        canvas: canvasEl,
        src: props.src,
        loop: props.loop ?? true,
        autoplay: props.autoplay ?? true,
        speed: props.speed ?? 1,
      });
    });

    onCleanup(() => player?.destroy());
  });

  return (
    <canvas
      ref={canvasEl}
      class={props.class}
      style={props.style}
      aria-hidden="true"
    />
  );
}
