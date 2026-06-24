import { useEffect, useState } from "react";
import { getArticle, deleteArticle } from "../util/playerApi";
import { useParams, Link, useNavigate } from "react-router-dom";
import ArticleBody from "../components/articleBody";
import PlayersInArticle from "../components/playersinarticle";
import { authUser } from "../context/tokencontext";
import { hasPermission } from "../util/userpermissions";

function ReadNewsPage() {
  const { id } = useParams();
  const [article, setArticle] = useState("");
  const navigate = useNavigate();
  const { userLoggedIn } = authUser();
  async function remove() {
    await deleteArticle(id);
    navigate("/articles");
  }

  useEffect(() => {
    async function loadArticle() {
      const res = await getArticle(id);
      setArticle(res);
    }
    loadArticle();
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading article...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link
          to="/articles"
          className="text-purple-700 font-bold hover:text-purple-900"
        >
          ← Back to News
        </Link>
        <div className="grid lg:grid-cols-[1fr_200px] gap-8">
          <article className="mt-6 bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
            <div className="h-72 md:h-96 bg-gradient-to-br from-purple-700 to-purple-500 flex items-center justify-center">
              {article.image ? (
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-white text-7xl font-black">HS</span>
              )}
            </div>

            <div className="p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="bg-amber-400 text-purple-950 text-sm font-black px-3 py-1 rounded-full">
                    Recruiting News
                  </span>

                  <span className="text-sm font-semibold text-slate-500">
                    By {article.author || "HoopScout Staff"}
                  </span>
                </div>

                <div className="flex gap-3">
                  {userLoggedIn &&
                    hasPermission(userLoggedIn.role, "update_article") && (
                      <Link
                        to={`/articles/update/${article._id}`}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm"
                      >
                        Update
                      </Link>
                    )}

                  {userLoggedIn &&
                    hasPermission(userLoggedIn.role, "delete_article") && (
                      <button
                        onClick={remove}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm"
                      >
                        Delete
                      </button>
                    )}
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                {article.title}
              </h1>

              <div className="mt-10">
                <ArticleBody article={article} />
              </div>
            </div>
          </article>
          <PlayersInArticle players={article.Players} />
        </div>
      </div>
    </main>
  );
}

export default ReadNewsPage;
