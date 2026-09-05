import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sourceSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  retrieved: z.coerce.date(),
  notes: z.string().optional(),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    kicker: z.string(),
    relatedGuides: z.array(reference('guides')).optional(),
    relatedCities: z.array(reference('cities')).optional(),
    affiliateOffers: z.array(reference('affiliates')).optional(),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/cities' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      city: z.string(),
      state: z.string(),
      stateAbbr: z.string().length(2),
      published: z.coerce.date(),
      lastVerified: z.coerce.date(),
      /**
       * research = no verified installer roster or sourced hardness figure yet.
       * listed = at least one installer row was added from a named public source.
       */
      listingStatus: z.enum(['research', 'listed']),
      hardnessNote: z.string(),
      /**
       * Only set when a named source published this figure. Never estimate.
       */
      hardnessGpg: z.number().positive().optional(),
      hardnessMgL: z.number().positive().optional(),
      hardnessSource: sourceSchema.optional(),
      installerSources: z.array(sourceSchema),
      installers: z.array(
        z.object({
          name: z.string(),
          licenseId: z.string().optional(),
          website: z.string().url().optional(),
          notes: z.string().optional(),
          sourceName: z.string(),
        }),
      ),
      sources: z.array(sourceSchema),
      relatedGuides: z.array(reference('guides')).optional(),
      affiliateOffers: z.array(reference('affiliates')).optional(),
    })
    .refine((data) => data.hardnessGpg == null || data.hardnessSource != null, {
      message: 'hardnessGpg requires hardnessSource (never invent hardness numbers).',
      path: ['hardnessSource'],
    })
    .refine((data) => data.hardnessMgL == null || data.hardnessSource != null, {
      message: 'hardnessMgL requires hardnessSource (never invent hardness numbers).',
      path: ['hardnessSource'],
    })
    .refine(
      (data) =>
        data.listingStatus !== 'listed' || data.installers.length > 0,
      {
        message: 'listingStatus "listed" requires at least one sourced installer row.',
        path: ['installers'],
      },
    ),
});

const affiliates = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/affiliates' }),
  schema: z.object({
    title: z.string(),
    partner: z.string(),
    destinationUrl: z.string().url(),
    status: z.enum(['placeholder', 'live']),
    ctaLabel: z.string(),
    disclosure: z.string(),
  }),
});

export const collections = { guides, cities, affiliates };
