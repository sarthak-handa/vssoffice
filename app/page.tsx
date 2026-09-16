import { ExperienceJourney } from "@/components/immersive/experience-journey";
import { SiteFooter } from "@/components/site/site-footer";
import { getScenes } from "@/lib/cms/adapter";

export default async function HomePage() {
  const scenes = await getScenes();
  return <><ExperienceJourney scenes={scenes} /><SiteFooter /></>;
}
