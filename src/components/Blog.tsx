import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Blog.css";

interface Article {
  title: string;
  link: string;
  slug: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
  rawPubDate?: string;
}

const Blog = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediumArticles();
  }, []);

  const fetchMediumArticles = async () => {
    try {
      // Using RSS2JSON service to convert Medium RSS to JSON
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@deepan.ppgit`
      );
      const data = await response.json();

      if (data.status === "ok") {
        console.log("Medium RSS data:", data.items[0]); // Debug first item
        const parsedArticles = data.items.slice(0, 6).map((item: any) => {
          // Extract thumbnail from content if not in thumbnail field
          let thumbnail = item.thumbnail || item.enclosure?.link;

          // Try to extract first image from description/content
          if (!thumbnail && item.description) {
            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
            thumbnail = imgMatch ? imgMatch[1] : null;
          }

          // Generate URL-friendly slug from title
          const slug = item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return {
            title: item.title,
            link: item.link,
            slug: slug,
            rawPubDate: item.pubDate,
            pubDate: new Date(item.pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            description: item.description.replace(/<[^>]*>/g, "").slice(0, 150) + "...",
            thumbnail: thumbnail,
            categories: item.categories || [],
          };
        });
        setArticles(parsedArticles);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Medium articles:", error);
      setLoading(false);
    }
  };

  // Generate structured data for articles
  const generateBlogPostSchema = () => {
    const blogPosts = articles.map((article) => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.description,
      "image": article.thumbnail || "https://www.deepankumar.com/images/logo.png",
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
        "name": "Deepan Kumar",
        "url": "https://www.deepankumar.com"
      },
      "datePublished": article.rawPubDate,
      "url": article.link,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": article.link
      },
      "keywords": article.categories.join(", ")
    }));

    return JSON.stringify(blogPosts);
  };

  return (
    <div className="blog-section section-container" id="blog">
      {/* Structured Data for Blog Articles */}
      {!loading && articles.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateBlogPostSchema() }}
        />
      )}

      <div className="blog-container">
        <h1>
          Latest <span>Articles by Deepan Kumar</span>
        </h1>
        <p className="blog-subtitle">
          Insights on software engineering, AI, system architecture, Ruby on Rails, React, and building
          scalable distributed systems. Practical guides and lessons from 10+ years of engineering.
        </p>

        {loading ? (
          <div className="blog-loading">Loading articles...</div>
        ) : (
          <div className="blog-grid">
            {articles.map((article, index) => (
              <a
                key={index}
                href={`/blog/${article.slug}.html`}
                className="blog-card"
                data-cursor="disable"
              >
                <div className={`blog-image ${!article.thumbnail ? 'blog-image-placeholder' : ''}`}>
                  {article.thumbnail ? (
                    <>
                      <img
                        src={article.thumbnail}
                        alt={`${article.title} - Article by Deepan Kumar on ${article.categories[0] || 'Software Engineering'}`}
                        loading="lazy"
                        width="400"
                        height="250"
                      />
                      <div className="blog-overlay">
                        <MdArrowOutward />
                      </div>
                    </>
                  ) : (
                    <div className="blog-placeholder-gradient">
                      <div className="blog-placeholder-icon" role="img" aria-label="Blog article placeholder">📝</div>
                    </div>
                  )}
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="blog-date">{article.pubDate}</span>
                    {article.categories.length > 0 && (
                      <span className="blog-category">{article.categories[0]}</span>
                    )}
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <div className="blog-read-more">
                    Read Article <MdArrowOutward />
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        <a
          href="https://medium.com/@deepan.ppgit"
          target="_blank"
          rel="noopener noreferrer"
          className="blog-view-all"
          data-cursor="disable"
        >
          View All Articles on Medium <MdArrowOutward />
        </a>
      </div>
    </div>
  );
};

export default Blog;
