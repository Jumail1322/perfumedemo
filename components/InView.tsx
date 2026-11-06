"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ElementType, type ReactNode } from "react";

// useLayoutEffect warns on the server; fall back to useEffect there.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Marks an element with data-inview="false" before first paint, then "true" once it
 * scrolls into view (once). CSS modules key their entrance animations off this attribute.
 * Without JavaScript the attribute is never set, so content simply shows.
 */
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "false" | "true">("idle");

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("false");
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || state !== "false") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("true");
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [state, threshold]);

  return [ref, state === "idle" ? undefined : state] as const;
}

type Props = {
  as?: ElementType;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  threshold?: number;
  /** Also write --s (0 → 1) as the element travels from the bottom to the top of the viewport. */
  scrollVar?: boolean;
  children: ReactNode;
};

/** Wrapper for server components that want scroll-in animations. */
export default function InView({ as: Tag = "div", className, id, style, threshold, scrollVar, children }: Props) {
  const [ref, inView] = useInView<HTMLElement>(threshold);

  useEffect(() => {
    const el = ref.current;
    if (!scrollVar || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const s = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      el.style.setProperty("--s", s.toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref, scrollVar]);

  return (
    <Tag ref={ref} className={className} id={id} style={style} data-inview={inView}>
      {children}
    </Tag>
  );
}
