import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><p className="eyebrow">VSS Salesco</p><h2>Technology is better<br />when it feels considered.</h2></div>
      <div className="footer-links"><Link href="/solutions">Solutions</Link><Link href="/experience">Experience Centre</Link><Link href="/book-demo">Book a consultation</Link><Link href="/contact">Contact</Link></div>
      <p className="footer-note">Experience Centre Preview. Final photography, verified product assets and authorised-dealer statements will replace concept media before launch.</p>
    </footer>
  );
}
