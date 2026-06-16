import { Link } from "react-router-dom";

function PlayersInArticle({ players = [] }) {
  if (players.length === 0) return null;

  return (
    <aside className="bg-white align-center border border-slate-200 rounded-3xl shadow-sm p-5 h-fit lg:sticky lg:top-24">
      <h2 className="text-sm text-center font-black uppercase tracking-wide text-slate-500">
        Players In Article
      </h2>

      <div className="mt-4 space-y-3">
        {players.map((player) => (
          <Link
            key={player._id}
            to={`/player/${player._id}/${player.Slug}`}
            className="flex justify-center items-center gap-3 rounded-2xl p-3 hover:bg-purple-50 transition-colors"
          >
            <div className="h-7 w-11 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-black">
              {player.Name?.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-black text-slate-900 leading-tight">
                {player.Name}
              </p>

              <p className="text-sm text-slate-500">
                Rank #{player.Rank || "N/A"} • {player.Position || "N/A"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default PlayersInArticle;