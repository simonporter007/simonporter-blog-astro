import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    description: z.string(),
    isPublished: z.boolean(),
    isDraft: z.boolean().default(false),
    tags: z.array(z.string()),
  }),
});

export const collections = { posts: postsCollection };
