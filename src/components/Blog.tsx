import { useEffect, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import "./styles/Blog.css";

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
  categories: string[];
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

          return {
            title: item.title,
            link: item.link,
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

  return (
    <div className="blog-section section-container" id="blog">
      <div className="blog-container">
        <h2>
          Latest <span>Articles</span>
        </h2>
        <p className="blog-subtitle">
          Thoughts on software engineering, AI, and building scalable systems
        </p>

        {loading ? (
          <div className="blog-loading">Loading articles...</div>
        ) : (
          <div className="blog-grid">
            {articles.map((article, index) => (
              <a
                key={index}
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-card"
                data-cursor="disable"
              >
                <div className={`blog-image ${!article.thumbnail ? 'blog-image-placeholder' : ''}`}>
                  {article.thumbnail ? (
                    <>
                      <img src={article.thumbnail} alt={article.title} />
                      <div className="blog-overlay">
                        <MdArrowOutward />
                      </div>
                    </>
                  ) : (
                    <div className="blog-placeholder-gradient">
                      <div className="blog-placeholder-icon">📝</div>
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
                    Read More <MdArrowOutward />
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
