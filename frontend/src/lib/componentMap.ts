import Accordion from "@/components/modules/Accordion/Accordion.astro";
import CtaBanner from "@/components/modules/CtaBanner/CtaBanner.astro";
import Feature from "@/components/modules/Feature/Feature.astro";
import FeatureStack from "@/components/modules/FeatureStack/FeatureStack.astro";
import Headline from "@/components/modules/Headline/Headline.astro";
import Hero from "@/components/modules/Hero/Hero.astro";
import List from "@/components/modules/List/List.astro";
import Multicard from "@/components/modules/Multicard/Multicard.astro";
import Stats from "@/components/modules/Stats/Stats.astro";

export const componentMap: Record<string, any> = {
  accordion: Accordion,
  ctaBanner: CtaBanner,
  feature: Feature,
  featureStack: FeatureStack,
  headline: Headline,
  hero: Hero,
  list: List,
  multicard: Multicard,
  stats: Stats,
  // Add more components here as you create them
};

