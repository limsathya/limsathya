"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref and a boolean: true when the element has scrolled into view.
 * @param {Object} [options]
 * @param {number} [options.threshold=0.12] — how much of the element must be visible
 * @param {string} [options.rootMargin="0px 0px -40px 0px"] — triggers slightly before it enters
 * @param {boolean} [options.once=true] — only trigger once
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

/**
 * Returns Tailwind classes for a section reveal animation.
 * Combine with useScrollReveal for scroll-triggered entrance.
 *
 * @param {boolean} isVisible
 * @param {number} [delay=0] — stagger delay index (0, 1, 2…)
 * @param {"up"|"down"|"left"|"right"|"scale"} [direction="up"]
 */
export function revealClasses(isVisible, delay = 0, direction = "up") {
  const dirMap = {
    up: "translate-y-6",
    down: "-translate-y-6",
    left: "translate-x-6",
    right: "-translate-x-6",
    scale: "scale-95",
  };

  const base =
    "transition-all duration-700 ease-out";
  const hidden = `opacity-0 ${dirMap[direction] || dirMap.up}`;
  const visible = "opacity-100 translate-y-0 translate-x-0 scale-100";
  const delayStyle = delay > 0 ? { transitionDelay: `${delay * 80}ms` } : {};

  return {
    className: `${base} ${isVisible ? visible : hidden}`,
    style: delayStyle,
  };
}
