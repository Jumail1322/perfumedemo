"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/content";
import styles from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 5l14 14M19 5L5 19" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7h18M3 12h18M3 17h18" /></svg>
          )}
        </button>

        <nav id="nav" className={`${styles.nav} ${open ? styles.navOpen : ""}`} aria-label="Main">
          {navLinks.map((l, i) => (
            <Link key={l.label} href={l.href} aria-current={i === 0 ? "page" : undefined} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className={styles.logo}>Élara</Link>

        <div className={styles.icons}>
          <a href="#" aria-label="Search">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          </a>
          <a href="#" aria-label="Log in" className={styles.hideSm}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
          </a>
          <a href="#" aria-label="Cart">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
          </a>
        </div>
      </div>
    </header>
  );
}
