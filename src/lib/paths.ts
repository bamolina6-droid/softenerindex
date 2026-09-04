import type { CollectionEntry } from 'astro:content';

export function cityPath(city: CollectionEntry<'cities'>): string {
  const state = city.data.stateAbbr.toLowerCase();
  const slug = city.data.city.toLowerCase().replace(/\s+/g, '-');
  return `/${state}/${slug}`;
}

export function formatUtcDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
