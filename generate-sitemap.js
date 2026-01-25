import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

const sitemap = new SitemapStream({ hostname: 'https://abdallahkirombafoundation.org/' });

const pages = ['/', '/about', '/programs', '/press', '/founder/biography'];

pages.forEach((page) => {
  sitemap.write({ url: page, changefreq: 'monthly', priority: 0.8 });
});

sitemap.end();

streamToPromise(sitemap).then((sm) => createWriteStream('./public/sitemap.xml').write(sm));
