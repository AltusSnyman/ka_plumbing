// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://kaplumbingltd.co.nz',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const url = item.url;
        // Homepage — highest priority
        if (url === 'https://kaplumbingltd.co.nz/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        }
        // Service index page
        else if (url === 'https://kaplumbingltd.co.nz/services/') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Individual service pages
        else if (url.includes('/services/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Sectors index page
        else if (url === 'https://kaplumbingltd.co.nz/sectors/') {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Individual sector pages
        else if (url.includes('/sectors/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // North Shore location pages (priority suburbs)
        else if (url.match(/\/areas\/(takapuna|albany|browns-bay|devonport|glenfield|torbay|long-bay|beach-haven|greenhithe|paremoremo)\//)) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Other location pages
        else if (url.includes('/areas/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        // Contact and booking — high conversion pages
        else if (url.includes('/contact/') || url.includes('/booking/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // About page
        else if (url.includes('/about/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        // Default
        else {
          item.priority = 0.5;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
