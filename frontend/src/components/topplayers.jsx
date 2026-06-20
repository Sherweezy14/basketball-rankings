import { Link } from "react-router-dom";

function TopPlayers({ players }) {
  const topFive = players.slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 lg:py-0">
      <div className="flex flex-col items-center mb-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="text-center my-5 mx-2 pt-5 lg:text-left lg:my-0 ">
          <span className="bg-amber-400 text-purple-950 text-3xl font-bold rounded-full px-2 py-5 lg:text-base lg:px-2 lg:py-1 ">
            Featured Prospects
          </span>

          <h2 className="mt-4 text-4xl pt-3 font-black text-slate-900 lg:mt-0 lg:text-2xl">
            Top Players
          </h2>

          <p className="mt-2 text-3xl text-slate-500 lg:text-xl">
            The highest ranked prospects in the database.
          </p>
        </div>

        <Link
          to="/rankings"
          className="hidden md:inline-flex text-purple-700 text-xl font-bold hover:text-purple-900 lg:text-sm"
        >
          View Full Rankings →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        {topFive.map((player,index) => (
          <Link
            key={player._id}
            to={`/player/${player._id}/${player.Slug}`}
            className={`bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all
           ${index > 0  ? "hidden md:block": ""} ${index > 1 ? "md:hidden lg:block":""}`}
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center">
                {player.Image ? (
                  <img
                    src={player.Image}
                    alt={player.Name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl font-black text-purple-700">
                    {player.Name?.charAt(0)}
                  </span>
                )}
              </div>

              <span className="absolute top-3 left-3 bg-amber-400 text-purple-950 font-black px-3 py-1 rounded-full">
                #{player.Rank}
              </span>
            </div>

            <h3 className="mt-4 text-lg font-black text-slate-900">
              {player.Name}
            </h3>

            <p className="text-sm text-slate-500">
              {player.Position || "N/A"} • Class of {player.Class || "N/A"}
            </p>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              {player.HighSchool || "High School N/A"}
            </p>

            <p className="mt-2 inline-flex rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-bold">
              {player.Commitment || "Undecided"}
            </p>
          </Link>
        ))}
      </div>

      <Link
        to="/rankings"
        className="mt-6 md:hidden block text-center bg-purple-700 text-white font-bold px-5 py-3 rounded-xl"
      >
        View Full Rankings
      </Link>
    </section>
  );
}

export default TopPlayers;