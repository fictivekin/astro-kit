import { z } from "astro:content";
import { slugZ } from "./page";

// Topic schema for the topics collection
export const topicZ = z.object({
  _id: z.string(),
  _type: z.literal("topic"),
  title: z.string(),
  slug: slugZ,
});

// Export TypeScript type
export type Topic = z.infer<typeof topicZ>;

