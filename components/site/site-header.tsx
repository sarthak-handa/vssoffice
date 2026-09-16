"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["Experience", "/experience"],
  ["Solutions", "/solutions"],
  ["Products", "/products"],
  ["Theatre & Automation", "/home-theatre-automation"],
  ["Commercial", "/commercial-security"],
  ["About", "/about"],
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="VSS Salesco home">
        <span>VSS</span> Salesco
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
      </nav>
      <Link className="header-book" href="/book-demo">Book a demo <span>↗</span></Link>
      <button className="mobile-menu" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav id="mobile-nav" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation">
        {links.map(([label, href]) => <Link href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/book-demo" onClick={() => setOpen(false)}>Book a demo ↗</Link>
      </nav>
    </header>
  );
}
