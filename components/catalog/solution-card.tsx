import Link from "next/link";
import { Camera, Clapperboard, DoorOpen, GitPullRequestArrow, KeyRound, PhoneCall, ShieldAlert, Sparkles, Video } from "lucide-react";
import type { Solution } from "@/lib/cms/types";

const icons = { Camera, Clapperboard, DoorOpen, GitPullRequestArrow, KeyRound, PhoneCall, ShieldAlert, Sparkles, Video };

export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = icons[solution.icon as keyof typeof icons] ?? Sparkles;
  return <Link className="solution-card" href={`/solutions#${solution.slug}`} id={solution.slug}><Icon size={21} strokeWidth={1.5} /><p className="category">{solution.category}</p><h3>{solution.title}</h3><p>{solution.description}</p><ul>{solution.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></Link>;
}
