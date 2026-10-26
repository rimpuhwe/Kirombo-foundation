import { type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function useGalleryReveal(scope: RefObject<HTMLElement>, reducedMotion: boolean) {
  useGSAP((_context, contextSafe) => {
    if (reducedMotion) return;
    const tiles = scope.current?.querySelectorAll(".wall-tile");
    if (!tiles?.length) return;
    ScrollTrigger.batch(tiles, {
      start: "top 88%",
      once: true,
      onEnter: contextSafe((batch: Element[]) => {
        gsap.from(batch, {
          yPercent: 10,
          autoAlpha: 0,
          clipPath: "inset(100% 0 0 0)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          clearProps: "transform,opacity,visibility,clipPath",
        });
      }),
    });
  }, { scope, dependencies: [reducedMotion], revertOnUpdate: true });
}
