// Script to generate static HTML pages for each blog post
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTML template for blog posts
const generateBlogPostHTML = (article, slug) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Primary Meta Tags -->
    <title>${article.title} - Deepan Kumar's Blog</title>
    <meta name="title" content="${article.title} - Deepan Kumar's Blog" />
    <meta name="description" content="${article.description}" />
    <meta name="keywords" content="${article.categories.join(', ')}, Deepan Kumar, Software Engineering, Blog" />
    <meta name="author" content="Deepan Kumar" />
    <meta name="robots" content="index, follow" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.deepankumar.com/blog/${slug}.html" />
    <meta property="og:title" content="${article.title}" />
    <meta property="og:description" content="${article.description}" />
    <meta property="og:image" content="${article.thumbnail || 'https://www.deepankumar.com/images/logo.png'}" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.deepankumar.com/blog/${slug}.html" />
    <meta property="twitter:title" content="${article.title}" />
    <meta property="twitter:description" content="${article.description}" />
    <meta property="twitter:image" content="${article.thumbnail || 'https://www.deepankumar.com/images/logo.png'}" />

    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.deepankumar.com/blog/${slug}.html" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/images/logo.png" />

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${article.title}",
      "description": "${article.description}",
      "image": "${article.thumbnail || 'https://www.deepankumar.com/images/logo.png'}",
      "author": {
        "@type": "Person",
        "name": "Deepan Kumar",
        "url": "https://www.deepankumar.com",
        "jobTitle": "Staff Engineer",
        "worksFor": {
          "@type": "Organization",
          "name": "G2"
        }
      },
      "publisher": {
        "@type": "Person",
        "name": "Deepan Kumar"
      },
      "datePublished": "${article.pubDate}",
      "url": "https://www.deepankumar.com/blog/${slug}.html",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.deepankumar.com/blog/${slug}.html"
      },
      "keywords": "${article.categories.join(', ')}"
    }
    </script>

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        background: #000;
        color: #fff;
        line-height: 1.6;
        min-height: 100vh;
      }

      .blog-post-page {
        padding: 80px 20px 40px;
        max-width: 800px;
        margin: 0 auto;
      }

      .back-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: #fff;
        text-decoration: none;
        font-size: 1rem;
        margin-bottom: 2rem;
        padding: 8px 16px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        transition: all 0.3s ease;
      }

      .back-link:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.4);
      }

      .blog-post-content {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        padding: 40px;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .blog-post-hero {
        width: 100%;
        height: auto;
        border-radius: 8px;
        margin-bottom: 2rem;
      }

      .blog-post-meta {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 1.5rem;
        color: rgba(255, 255, 255, 0.7);
        font-size: 0.9rem;
        flex-wrap: wrap;
      }

      .blog-post-categories {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
      }

      .category-tag {
        padding: 4px 12px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
        font-size: 0.85rem;
      }

      h1 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      .blog-post-author {
        margin-bottom: 2rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
      }

      .blog-post-body {
        line-height: 1.8;
        font-size: 1.1rem;
      }

      .blog-post-body h2 {
        font-size: 1.8rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
      }

      .blog-post-body h3 {
        font-size: 1.4rem;
        margin-top: 1.5rem;
        margin-bottom: 0.8rem;
      }

      .blog-post-body p {
        margin-bottom: 1.2rem;
      }

      .blog-post-body img {
        max-width: 100%;
        height: auto;
        border-radius: 8px;
        margin: 2rem 0;
      }

      .blog-post-body a {
        color: #4a9eff;
        text-decoration: underline;
      }

      .blog-post-body a:hover {
        color: #6bb3ff;
      }

      .blog-post-body pre,
      .blog-post-body code {
        background: rgba(0, 0, 0, 0.3);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: "Courier New", monospace;
      }

      .blog-post-body pre {
        padding: 1rem;
        overflow-x: auto;
        margin: 1.5rem 0;
      }

      .blog-post-body ul,
      .blog-post-body ol {
        margin-left: 2rem;
        margin-bottom: 1.2rem;
      }

      .blog-post-body li {
        margin-bottom: 0.5rem;
      }

      .blog-post-body blockquote {
        border-left: 4px solid rgba(255, 255, 255, 0.3);
        padding-left: 1.5rem;
        margin: 1.5rem 0;
        font-style: italic;
        color: rgba(255, 255, 255, 0.8);
      }

      .blog-post-footer {
        margin-top: 3rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .medium-link {
        color: #4a9eff;
        text-decoration: none;
        font-weight: 600;
      }

      .medium-link:hover {
        text-decoration: underline;
      }

      @media (max-width: 768px) {
        .blog-post-page {
          padding: 60px 15px 30px;
        }

        .blog-post-content {
          padding: 20px;
        }

        h1 {
          font-size: 1.8rem;
        }

        .blog-post-body {
          font-size: 1rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="blog-post-page">
      <a href="/#blog" class="back-link">
        ← Back to Blog
      </a>

      <article class="blog-post-content">
        ${article.thumbnail ? `<img src="${article.thumbnail}" alt="${article.title} - Article by Deepan Kumar" class="blog-post-hero" />` : ''}

        <div class="blog-post-meta">
          <time datetime="${article.pubDate}">${article.formattedDate}</time>
          ${article.categories.length > 0 ? `
          <div class="blog-post-categories">
            ${article.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
          </div>
          ` : ''}
        </div>

        <h1>${article.title}</h1>

        <div class="blog-post-author">
          <p>By ${article.author}</p>
        </div>

        <div class="blog-post-body">
          ${article.content}
        </div>

        <div class="blog-post-footer">
          <p>
            Read the full article on Medium:
            <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="medium-link">
              View on Medium →
            </a>
          </p>
        </div>
      </article>
    </div>
  </body>
</html>`;
};

async function generateBlogPages() {
  try {
    console.log('🚀 Generating blog pages...\n');

    // Fetch articles from Medium RSS
    const response = await fetch(
      'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@deepan.ppgit'
    );
    const data = await response.json();

    if (data.status !== 'ok') {
      console.error('❌ Failed to fetch Medium RSS');
      return;
    }

    // Create blog directory if it doesn't exist
    const blogDir = path.join(__dirname, '..', 'public', 'blog');
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // Generate HTML page for each article
    let generatedCount = 0;
    for (const item of data.items) {
      const slug = item.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      // Extract thumbnail
      let thumbnail = item.thumbnail || item.enclosure?.link;
      if (!thumbnail && item.description) {
        const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
        thumbnail = imgMatch ? imgMatch[1] : null;
      }

      const article = {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        formattedDate: new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: item.description.replace(/<[^>]*>/g, "").slice(0, 160),
        content: item.content || item.description,
        thumbnail: thumbnail,
        categories: item.categories || [],
        author: item.author || "Deepan Kumar",
      };

      const html = generateBlogPostHTML(article, slug);
      const filePath = path.join(blogDir, `${slug}.html`);

      fs.writeFileSync(filePath, html);
      console.log(`✅ Generated: /blog/${slug}.html`);
      generatedCount++;
    }

    console.log(`\n🎉 Successfully generated ${generatedCount} blog pages!`);
    console.log(`📁 Location: ${blogDir}`);
  } catch (error) {
    console.error('❌ Error generating blog pages:', error);
  }
}

generateBlogPages();
