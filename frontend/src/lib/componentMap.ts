import CtaBanner from "../components/CtaBanner/CtaBanner.astro";
import Feature from "../components/Feature/Feature.astro";
import Headline from "../components/Headline/Headline.astro";
import Hero from "../components/Hero/Hero.astro";
import Multicard from "../components/Multicard/Multicard.astro";

export const componentMap: Record<string, any> = {
  ctaBanner: CtaBanner,
  feature: Feature,
  headline: Headline,
  hero: Hero,
  multicard: Multicard,
  // Add more components here as you create them
};

