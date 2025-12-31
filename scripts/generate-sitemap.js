// Script to generate sitemap with blog posts from Medium RSS
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  try {
    // Fetch articles from Medium RSS
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@deepan.ppgit'
    );
    const data = await response.json();

    if (data.status !== 'ok') {
      console.error('Failed to fetch Medium RSS');
      return;
    }

    const today = new Date().toISOString().split('T')[0];

    // Generate blog post URLs
    const blogPosts = data.items.map((item) => {
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const pubDate = new Date(item.pubDate).toISOString().split('T')[0];

      return `  <!-- Blog Post: ${item.title.substring(0, 50)}... -->
  <url>
    <loc>https://www.deepankumar.com/blog/${slug}.html</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join('\n\n');

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>https://www.deepankumar.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://www.deepankumar.com/images/logo.png</image:loc>
      <image:title>Deepan Kumar Portfolio Logo</image:title>
    </image:image>
  </url>

  <!-- About Section -->
  <url>
    <loc>https://www.deepankumar.com/#about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- What I Do Section -->
  <url>
    <loc>https://www.deepankumar.com/#what-i-do</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Career Section -->
  <url>
    <loc>https://www.deepankumar.com/#career</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Achievements Section -->
  <url>
    <loc>https://www.deepankumar.com/#achievements</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Tech Stack Section -->
  <url>
    <loc>https://www.deepankumar.com/#tech-stack</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>

  <!-- Blog Section -->
  <url>
    <loc>https://www.deepankumar.com/#blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Contact Section -->
  <url>
    <loc>https://www.deepankumar.com/#contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog Posts -->
${blogPosts}

</urlset>
`;

    // Write sitemap to public folder
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap);

    console.log('✅ Sitemap generated successfully!');
    console.log(`📝 Total blog posts: ${data.items.length}`);
    console.log(`📍 Location: ${sitemapPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();
