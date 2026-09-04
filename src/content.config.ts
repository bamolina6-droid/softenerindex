import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Numeric fields (hardness, prices, ratings) are optional on purpose.
 * Omit them until a source URL and verification date exist.
 * Nightly workflow: see README.md.
 */
const sourcedNumber = {
  source_url: z.string().url().optional(),
  verified_on: z.coerce.date().optional(),
};

const guides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    kicker: z.string().optional(),
    /** Only set when a documented, dated source exists. Never invent. */
    published_price_low: z.number().nonnegative().optional(),
    published_price_high: z.number().nonnegative().optional(),
    price_currency: z.string().length(3).optional(),
    price_unit: z.string().optional(),
    price_source_url: z.string().url().optional(),
    price_verified_on: z.coerce.date().optional(),
    price_notes: z.string().optional(),
  }),
});

const cities = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cities' }),
  schema: z.object({
    title: z.string(),
    state: z.string(),
    state_abbr: z.string().length(2),
    description: z.string(),
    published: z.coerce.date(),
    updated: z.coerce.date().optional(),
    water_utility: z.string().optional(),
    ccr_url: z.string().url().optional(),
    license_lookup_url: z.string().url().optional(),
    license_authority: z.string().optional(),
    /** Omit until copied from a public water-quality report. */
    hardness_gpg: z.number().nonnegative().optional(),
    hardness_ppm: z.number().nonnegative().optional(),
    hardness_source_url: z.string().url().optional(),
    hardness_verified_on: z.coerce.date().optional(),
    hardness_notes: z.string().optional(),
  }),
});

const installers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/installers' }),
  schema: z.object({
    name: z.string(),
    city: z.string(),
    listed: z.boolean().default(false),
    license_number: z.string().optional(),
    license_authority: z.string().optional(),
    website: z.string().url().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    ...sourcedNumber,
    notes: z.string().optional(),
  }),
});

const affiliates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/affiliates' }),
  schema: z
    .object({
      title: z.string(),
      partner: z.string(),
      description: z.string(),
      status: z.enum(['placeholder', 'live']),
      destination: z.string().url().optional(),
      cta_label: z.string().default('Continue to partner'),
    })
    .refine((entry) => entry.status !== 'live' || Boolean(entry.destination), {
      message: 'Live affiliate entries must include a destination URL.',
    }),
});

export const collections = { guides, cities, installers, affiliates };
