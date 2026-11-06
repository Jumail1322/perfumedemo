import { announcements } from "@/lib/content";
import styles from "./AnnouncementBar.module.css";

// Repeat the messages so one track is always wider than the screen.
const items = Array.from({ length: 4 }, () => announcements).flat();

function Track({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={styles.track} aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <span key={i} className={styles.item}>
          {text}
          <span className={styles.sep}>•</span>
        </span>
      ))}
    </div>
  );
}

export default function AnnouncementBar() {
  return (
    <div className={styles.bar} role="region" aria-label="Announcements">
      <div className={styles.marquee}>
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
