"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";
import styles from "./Hero.module.css";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close the product card on outside click / Escape.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const { product, image } = hero;

  // Split the title into words → letters so each letter can rise from behind a mask.
  let letterIndex = 0;
  const titleWords = hero.title.split(" ").map((word, w) => (
    <span key={w} className={styles.word}>
      {Array.from(word).map((ch) => {
        const i = letterIndex++;
        return (
          <span key={i} className={styles.letter} style={{ animationDelay: `${0.95 + i * 0.05}s` }}>
            {ch}
          </span>
        );
      })}
    </span>
  ));

  return (
    <section className={styles.hero}>
      {/* intro: brand-colour panel wipes away */}
      <div className={styles.wipe} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.headings}>
          <h1 className={styles.title} aria-label={hero.title}>
            <span aria-hidden="true">
              {titleWords.reduce<React.ReactNode[]>((acc, w, i) => (i ? [...acc, " ", w] : [w]), [])}
            </span>
          </h1>
        </div>

        <div className={styles.media} ref={wrapRef}>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} priority className={styles.product} />

          <button
            className={styles.dot}
            aria-label="View product details"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.pulse} />
          </button>

          {open && (
            <div className={styles.card}>
              <a href={product.href} className={styles.cardLink}>
                <div className={styles.thumb}>
                  <Image src={product.thumb} alt="" width={image.width} height={image.height} />
                </div>
                <div className={styles.cardBody}>
                  <h4 className={styles.cardTitle}>{product.title}</h4>
                  <div className={styles.price}>
                    <span className={styles.strike}>{product.comparePrice}</span>
                    <span className={styles.final}>{product.price}</span>
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>

        <p className={styles.text}>{hero.text}</p>

        <div className={styles.buttons}>
          {hero.ctas.map((c) => (
            <a key={c.label} href={c.href} className={`btn btn--${c.variant}`}>{c.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
