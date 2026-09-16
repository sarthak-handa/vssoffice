import { PanoramaTour } from "@/components/immersive/panorama-tour";
import { SiteFooter } from "@/components/site/site-footer";
import { getScenes } from "@/lib/cms/adapter";

export default async function ExperiencePage() { return <><PanoramaTour scenes={await getScenes()} /><SiteFooter /></>; }
