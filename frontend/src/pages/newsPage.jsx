import { useEffect, useState } from "react";
import { getArticles } from "../util/playerApi";
import { Link } from "react-router-dom";
import { authUser } from "../context/tokencontext";

function NewsPage() {
  const [news, setNews] = useState([]);
  const {token} = authUser()
  useEffect(() => {
    async function getNews() {
      const n = await getArticles();
      setNews(n);
    }

    getNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="bg-amber-400 text-purple-950 text-sm font-bold px-3 py-1 rounded-full">
              Recruiting News
            </span>

            <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
              Latest Articles
            </h1>

            <p className="mt-2 text-slate-500">
              Rankings updates, commitments, recruiting news, and player features.
            </p>
          </div>

          {token && <Link
            to="/article/new"
            className="
              bg-purple-700
              hover:bg-purple-800
              text-white
              font-bold
              px-5
              py-3
              rounded-xl
              shadow-sm
            "
          >
            + New Article
          </Link>}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article) => (
            <article
              key={article._id}
              className="
                bg-white
                border
                border-slate-200
                rounded-3xl
                overflow-hidden
                shadow-sm
                hover:shadow-md
                hover:-translate-y-1
                transition-all
              "
            >
              <div className="h-48 bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center">
                <span className="text-white text-6xl font-black">
                  N
                </span>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-black text-slate-900">
                  {article.title}
                </h2>

                <p className="mt-3 text-slate-600 line-clamp-4">
                  {article.body}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {article.author}
                  </span>

                  <Link
                    to={`/articles/${article._id}`}
                    className="
                      text-purple-700
                      font-bold
                      hover:text-purple-900
                    "
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsPage;