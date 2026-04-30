const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Video = require('../models/Video');

// Static routes from the frontend
const STATIC_ROUTES = [
  '',
  '/biography-of-dr-hammad-lakhvi',
  '/islamic-short-clips',
  '/islamic-lectures-and-series',
  '/research-articles-by-dr-hammad-lakhvi',
  '/islamic-qa-and-fatwa',
  '/events-and-activities',
  '/tv-programs-and-community',
  '/contact-us'
];

router.get('/', async (req, res) => {
  try {
    const SITE_URL = process.env.SITE_URL || 'https://drhammadlakhvi.com';
    
    // Fetch all dynamic content
    const articles = await Article.find({}, 'id updatedAt').lean();
    const series = await Video.find({ type: { $in: ['SERIES', 'TV_PROGRAM'] } }, 'slug updatedAt').lean();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // 1. Add Static Routes
    STATIC_ROUTES.forEach(route => {
      xml += `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // 2. Add Dynamic Articles
    articles.forEach(article => {
      xml += `
  <url>
    <loc>${SITE_URL}/article/${article.id}</loc>
    <lastmod>${article.updatedAt ? article.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // 3. Add Dynamic TV/Series
    series.forEach(item => {
      if (item.slug) {
        xml += `
  <url>
    <loc>${SITE_URL}/tv/${item.slug}</loc>
    <lastmod>${item.updatedAt ? item.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      }
    });

    xml += `
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
