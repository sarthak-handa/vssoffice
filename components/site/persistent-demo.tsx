import Link from "next/link";
import { CalendarCheck } from "lucide-react";

export function PersistentDemo() {
  return <Link href="/book-demo" className="persistent-demo"><CalendarCheck size={16} /> <span>Book a demo</span></Link>;
}
