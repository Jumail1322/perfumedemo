import Image from "next/image";
import { ritual } from "@/lib/content";
import InView from "./InView";
import styles from "./ShopRitual.module.css";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

export default function ShopRitual() {
  return (
    <InView as="section" className={styles.section} threshold={0.3}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.small}>{ritual.label}</span>
            <h2 className={styles.heading}>{ritual.heading}</h2>
            <p className={styles.accent}>{ritual.accent}</p>
          </div>
          <p className={styles.headerRight}>{ritual.description}</p>
        </div>

        <div className={styles.boxes}>
          {ritual.steps.map((step, i) => (
            <a key={step.title} href={step.product.href} className={styles.box} style={{ "--i": i } as Vars}>
              <div className={styles.image}>
                <Image src={step.image.src} alt={step.image.alt} fill sizes="(max-width: 768px) 0px, 300px" />
              </div>

              <div className={styles.content}>
                <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{step.title}</h3>
                <div className={styles.desc}>
                  <div className={styles.descInner}>
                    <p>{step.text}</p>
                  </div>
                </div>
              </div>

              <div className={styles.product}>
                <div className={styles.card}>
                  <div className={styles.info}>
                    <span className={styles.name}>{step.product.name}</span>
                    <span className={styles.price}>{step.product.price}</span>
                  </div>
                  <div className={styles.thumb}>
                    <Image src={ritual.productImage} alt="" width={440} height={648} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </InView>
  );
}
