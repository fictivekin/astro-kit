import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '09ojk07u',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

