import Image from "next/image";
import { about } from "@/lib/content";
import InView from "./InView";
import styles from "./About.module.css";

// Cards alternate -4deg / +4deg; later cards sit on top.
const tilt = (i: number) => (i % 2 === 0 ? -4 : 4);

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function About() {
  const { feature } = about;
  const words = about.statement.split(" ");

  return (
    <InView as="section" className={styles.about} id="about" threshold={0.35} scrollVar>
      <div className={styles.container}>
        <div className={styles.left}>
          <h2 className={styles.label}>{about.label}</h2>

          {/* words come into focus one after another */}
          <p className={styles.statement} aria-label={about.statement}>
            {words.map((w, i) => (
              <span key={i} aria-hidden="true">
                <span className={styles.word} style={{ "--i": i } as Vars}>{w}</span>{" "}
              </span>
            ))}
          </p>

          <a href={about.cta.href} className={`btn btn--primary ${styles.cta}`} style={{ "--d": `${0.25 + words.length * 0.035}s` } as Vars}>
            {about.cta.label}
          </a>

          <div className={styles.feature}>
            <div className={styles.featureImg}>
              <Image src={feature.image.src} alt={feature.image.alt} width={500} height={493} />
            </div>
            <h4 className={styles.featureTitle}>{feature.title}</h4>
            <a href={feature.link.href} className={styles.link}>{feature.link.label}</a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.stack}>
            {about.stack.map((s, i) => (
              <div
                key={s.src}
                className={styles.item}
                style={{ "--tilt": `${tilt(i)}deg`, "--dir": i % 2 === 0 ? -1 : 1, "--i": i, zIndex: i + 1 } as Vars}
              >
                <div className={styles.card}>
                  <Image src={s.src} alt={s.alt} fill sizes="(max-width: 749px) 100vw, 300px" className={styles.img} />
                </div>
              </div>
            ))}
          </div>
          <p className={styles.caption}>{about.caption}</p>
        </div>
      </div>
    </InView>
  );
}
