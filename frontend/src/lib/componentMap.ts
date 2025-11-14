import CtaBanner from "@/components/modules/CtaBanner/CtaBanner.astro";
import Feature from "@/components/modules/Feature/Feature.astro";
import Headline from "@/components/modules/Headline/Headline.astro";
import Hero from "@/components/modules/Hero/Hero.astro";
import Multicard from "@/components/modules/Multicard/Multicard.astro";

export const componentMap: Record<string, any> = {
  ctaBanner: CtaBanner,
  feature: Feature,
  headline: Headline,
  hero: Hero,
  multicard: Multicard,
  // Add more components here as you create them
};

