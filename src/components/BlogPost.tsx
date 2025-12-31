import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import "./styles/BlogPost.css";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
  thumbnail?: string;
  categories: string[];
  author: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleBackClick = () => {
    navigate("/");
    // Wait for navigation to complete, then scroll to blog section
    setTimeout(() => {
      const blogSection = document.getElementById("blog");
      if (blogSection) {
        blogSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@deepan.ppgit`
      );
      const data = await response.json();

      if (data.status === "ok") {
        // Find article by slug
        const foundArticle = data.items.find((item: any) => {
          const articleSlug = item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
          return articleSlug === slug;
        });

        if (foundArticle) {
          // Extract thumbnail
          let thumbnail = foundArticle.thumbnail || foundArticle.enclosure?.link;
          if (!thumbnail && foundArticle.description) {
            const imgMatch = foundArticle.description.match(/<img[^>]+src="([^">]+)"/);
            thumbnail = imgMatch ? imgMatch[1] : null;
          }

          setArticle({
            title: foundArticle.title,
            link: foundArticle.link,
            pubDate: new Date(foundArticle.pubDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            description: foundArticle.description.replace(/<[^>]*>/g, "").slice(0, 160),
            content: foundArticle.content || foundArticle.description,
            thumbnail: thumbnail,
            categories: foundArticle.categories || [],
            author: foundArticle.author || "Deepan Kumar",
          });
        } else {
          setError(true);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching article:", error);
      setError(true);
      setLoading(false);
    }
  };

  // Update document title and meta tags
  useEffect(() => {
    if (article) {
      document.title = `${article.title} - Deepan Kumar's Blog`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", article.description);
      }
    }
  }, [article]);

  if (loading) {
    return (
      <div className="blog-post-loading">
        <div className="loading-spinner"></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="blog-post-error">
        <h1>Article Not Found</h1>
        <p>Sorry, we couldn't find the article you're looking for.</p>
        <button onClick={handleBackClick} className="back-link">
          <MdArrowBack /> Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
              "name": "Deepan Kumar"
            },
            "datePublished": article.pubDate,
            "url": `https://www.deepankumar.com/blog/${slug}`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.deepankumar.com/blog/${slug}`
            },
            "keywords": article.categories.join(", ")
          })
        }}
      />

      <div className="blog-post-container">
        <button onClick={handleBackClick} className="back-link">
          <MdArrowBack /> Back to Blog
        </button>

        <article className="blog-post-content">
          {article.thumbnail && (
            <img
              src={article.thumbnail}
              alt={`${article.title} - Article by Deepan Kumar`}
              className="blog-post-hero"
              loading="eager"
            />
          )}

          <div className="blog-post-meta">
            <time dateTime={article.pubDate}>{article.pubDate}</time>
            {article.categories.length > 0 && (
              <div className="blog-post-categories">
                {article.categories.map((cat, idx) => (
                  <span key={idx} className="category-tag">
                    {cat}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1>{article.title}</h1>

          <div className="blog-post-author">
            <p>By {article.author}</p>
          </div>

          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="blog-post-footer">
            <p>
              Read the full article on Medium:{" "}
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="medium-link"
              >
                View on Medium →
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
