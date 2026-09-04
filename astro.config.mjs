import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://softenerindex.com',
  output: 'static',
  trailingSlash: 'never',
  integrations: [sitemap()],
  redirects: {
    '/cost': '/guides/water-softener-cost-2026',
    '/phoenix': '/cities/phoenix-az',
    '/quote': '/guides/how-to-read-a-dealer-quote',
    '/salt': '/guides/salt-based-vs-salt-free',
  },
});
