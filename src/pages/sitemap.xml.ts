import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cityPath } from '../lib/paths';

export const GET: APIRoute = async ({ site }) => {
  const origin = site ?? new URL('https://softenerindex.com');
  const guides = await getCollection('guides');
  const cities = await getCollection('cities');
  const affiliates = await getCollection('affiliates');

  const paths = [
    '/',
    '/guides',
    '/cities',
    '/about',
    '/disclosure',
    '/methodology',
    '/go',
    ...guides.map((guide) => `/guides/${guide.id}`),
    ...cities.map((city) => cityPath(city)),
    ...affiliates.map((offer) => `/go/${offer.id}`),
  ];

  const urls = paths
    .map((path) => `  <url><loc>${new URL(path, origin).toString()}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
