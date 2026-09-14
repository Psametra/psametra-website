"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { headerVisibilityChange } from "@/lib/header-visibility";

/** Hides on downward travel while retaining a top-edge hover target. */
export function HeaderBehavior({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hovering = useRef(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const nextY = window.scrollY;
      setScrolled(nextY > 20);
      const visibilityChange = headerVisibilityChange({
        currentY: nextY,
        previousY: lastY,
        hovering: hovering.current,
      });
      if (visibilityChange !== null) setHidden(visibilityChange);
      lastY = nextY;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className="header"
      data-scrolled={scrolled || undefined}
      data-hidden={hidden || undefined}
      onPointerEnter={() => {
        hovering.current = true;
        setHidden(false);
      }}
      onPointerLeave={() => {
        hovering.current = false;
      }}
      onFocus={() => setHidden(false)}
    >
      {children}
    </header>
  );
}
