"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/lib/content";
import InView from "./InView";
import styles from "./Journey.module.css";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

const { stages } = journey;
const N = stages.length;
const R = 196;                       // dial radius (SVG units)
const C = 2 * Math.PI * R;           // circumference for the sweeping arc

/**
 * Scroll story. The tall track pins a stage for each step of the day.
 * Scroll progress is written to CSS variables (no re-render per frame):
 *   --p      overall progress 0→1      (dial arc, rail fills)
 *   --local  progress inside the stage (word-by-word ink)
 * React state only changes when the stage changes (iris photo + copy swap).
 */
export default function Journey() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);
  const stageRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(span, 1)));
      const scaled = Math.min(N - 0.0001, p * N);
      const s = Math.floor(scaled);
      track.style.setProperty("--p", p.toFixed(4));
      track.style.setProperty("--local", (scaled - s).toFixed(4));
      if (s !== stageRef.current) {
        stageRef.current = s;
        setStage(s);
      }
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
  }, []);

  const current = stages[stage];
  const words = current.statement.split(" ");

  return (
    <section className={styles.section} aria-label={journey.heading}>
      <InView className={styles.intro}>
        <span className={styles.label}>{journey.label}</span>
        <h2 className={styles.heading}>{journey.heading}</h2>
      </InView>

      {/* ---------- desktop: pinned scroll story ---------- */}
      <div ref={trackRef} className={styles.track} style={{ "--n": N } as Vars}>
        <InView className={styles.sticky} threshold={0.45}>
          {/* left rail with progress underlines */}
          <ol className={styles.rail}>
            {stages.map((s, i) => (
              <li key={s.name} className={i === stage ? styles.railActive : undefined} style={{ "--i": i } as Vars}>
                <span className={styles.railName}>{s.name}</span>
                <span className={styles.railLine}><span className={styles.railFill} /></span>
              </li>
            ))}
          </ol>

          {/* centre: wear-clock dial with iris photo window */}
          <div className={styles.dialWrap}>
            <svg className={styles.dial} viewBox="0 0 440 440" aria-hidden="true">
              <circle cx="220" cy="220" r={R} className={styles.dialTrack} />
              {Array.from({ length: 48 }, (_, i) => (
                <line
                  key={i}
                  x1="220" y1={220 - R - 10} x2="220" y2={220 - R - (i % 12 === 0 ? 22 : 15)}
                  className={styles.tick}
                  transform={`rotate(${i * 7.5} 220 220)`}
                />
              ))}
              <circle
                cx="220" cy="220" r={R}
                className={styles.dialArc}
                style={{ strokeDasharray: C, "--c": C } as Vars}
                transform="rotate(-90 220 220)"
              />
            </svg>
            <span className={styles.dialDot} aria-hidden="true" />

            <div className={styles.iris}>
              {stages.map((s, i) => (
                <div key={s.name} className={`${styles.irisImg} ${i <= stage ? styles.irisOpen : ""}`} style={{ zIndex: i + 1 }}>
                  <Image src={s.image.src} alt={i === stage ? s.image.alt : ""} fill sizes="380px" />
                </div>
              ))}
            </div>

            <div className={styles.time} aria-live="polite">
              <span key={current.time} className={styles.timeValue}>{current.time}</span>
              <span className={styles.timeLabel}>on skin</span>
            </div>
          </div>

          {/* right: the stage's statement, inking in as you scroll */}
          <div className={styles.panel}>
            <div key={stage} className={styles.panelInner}>
              <span className={styles.count}>{String(stage + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
              <p className={styles.statement} aria-label={current.statement}>
                {words.map((w, i) => (
                  <span key={i} aria-hidden="true">
                    <span className={styles.word} style={{ "--k": i / words.length } as Vars}>{w}</span>{" "}
                  </span>
                ))}
              </p>
              <p className={styles.text}>{current.text}</p>
              <ul className={styles.notes}>
                {current.notes.map((n) => <li key={n}>{n}</li>)}
              </ul>
            </div>
          </div>
        </InView>
      </div>

      {/* ---------- mobile: stacked stages ---------- */}
      <ol className={styles.list}>
        {stages.map((s, i) => (
          <InView as="li" key={s.name} className={styles.item} style={{ "--i": i } as Vars} threshold={0.05}>
            <span className={styles.itemTime}>{s.time}</span>
            <div className={styles.itemImg}>
              <Image src={s.image.src} alt={s.image.alt} fill sizes="160px" />
            </div>
            <span className={styles.count}>{String(i + 1).padStart(2, "0")} · {s.time}</span>
            <h3 className={styles.itemName}>{s.name}</h3>
            <p className={styles.itemStatement}>{s.statement}</p>
            <ul className={styles.notes}>
              {s.notes.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </InView>
        ))}
      </ol>
    </section>
  );
}
