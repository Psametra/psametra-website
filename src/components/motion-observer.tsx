"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is visible without JS; only approaching groups animate once. */
export function MotionObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set<Animation>();
    const counterFrames = new Map<Element, number>();
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          element.dataset.inView = String(entry.isIntersecting);
          if (!entry.isIntersecting || seen.has(element)) continue;
          seen.add(element);
          if (!preference.matches && element.hasAttribute("data-reveal")) {
            const animation = element.animate(
              [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 450, easing: "cubic-bezier(.2,.7,.3,1)" },
            );
            animations.add(animation);
            void animation.finished.then(
              () => animations.delete(animation),
              () => animations.delete(animation),
            );
          }
          if (
            !preference.matches &&
            element.hasAttribute("data-counter-target")
          ) {
            const target = Number(element.dataset.counterTarget);
            const prefix = element.dataset.counterPrefix ?? "";
            const suffix = element.dataset.counterSuffix ?? "";
            if (!Number.isFinite(target)) continue;
            const startedAt = performance.now();
            const duration = 1100;
            const update = (now: number) => {
              const progress = Math.min((now - startedAt) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              element.textContent = `${prefix}${Math.round(target * eased).toLocaleString()}${suffix}`;
              if (progress < 1) {
                const frame = requestAnimationFrame(update);
                counterFrames.set(element, frame);
              } else counterFrames.delete(element);
            };
            element.textContent = `${prefix}0${suffix}`;
            const frame = requestAnimationFrame(update);
            counterFrames.set(element, frame);
          }
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal], [data-ambient]")
      .forEach((element) => observer.observe(element));
    document
      .querySelectorAll("[data-counter-target]")
      .forEach((element) => observer.observe(element));
    const stopMotion = () => {
      if (preference.matches) {
        animations.forEach((animation) => animation.cancel());
        counterFrames.forEach((frame, element) => {
          cancelAnimationFrame(frame);
          const target = Number((element as HTMLElement).dataset.counterTarget);
          const prefix = (element as HTMLElement).dataset.counterPrefix ?? "";
          const suffix = (element as HTMLElement).dataset.counterSuffix ?? "";
          element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        });
        counterFrames.clear();
      }
    };
    preference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", stopMotion);
      animations.forEach((animation) => animation.cancel());
      counterFrames.forEach((frame) => cancelAnimationFrame(frame));
      counterFrames.clear();
    };
  }, [pathname]);
  return null;
}
