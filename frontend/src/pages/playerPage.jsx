import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import React from "react";
import { getPlayer, deletePlayer } from "../util/playerApi";
import { authUser } from "../context/tokencontext";
import { hasPermission } from "../util/userpermissions";

function PlayerPage() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();
  const { userLoggedIn } = authUser();

  //Delete Player wrapper function for button
  async function removePlayer() {
    const res = await deletePlayer(id);
    navigate("/");
  }

  useEffect(() => {
    async function loadPlayer() {
      const data = await getPlayer(id);
      setPlayer(data);
    }

    loadPlayer();
  }, [id]);

  if (!player) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading player...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link
          to="/"
          className="text-purple-700 font-semibold hover:text-purple-900"
        >
          ← Back to rankings
        </Link>

        <div className="mt-6 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-700 to-purple-500 px-8 py-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-28 h-28 rounded-2xl bg-white/20 border border-white/30 overflow-hidden flex items-center justify-center">
                {player.Image ? (
                  <img
                    src={player.Image}
                    alt={player.Name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold">
                    {player.Name?.charAt(0)}
                  </span>
                )}
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center bg-amber-400 text-purple-950 text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Rank #{player.Rank}
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                  {player.Name}
                </h1>

                <p className="mt-2 text-purple-100 text-lg">
                  {player.Position} • Class of {player.Class}
                </p>
              </div>

              <div className="flex gap-3">
                {userLoggedIn &&
                  hasPermission(userLoggedIn.role, "update_player") && (
                    <Link
                      to={`/updatePlayer/${player._id}`}
                      className="bg-white text-purple-700 font-bold px-5 py-3 rounded-xl hover:bg-purple-50"
                    >
                      Edit
                    </Link>
                  )}

                {userLoggedIn &&
                  hasPermission(userLoggedIn.role, "delete_player") && (
                    <button
                      onClick={removePlayer}
                      className="bg-red-500 text-white font-bold px-5 py-3 rounded-xl hover:bg-red-600"
                    >
                      Delete
                    </button>
                  )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 p-8">
            <Stat label="Height" value={player.Height} />
            <Stat label="High School" value={player.HighSchool} />
            <Stat label="AAU" value={player.Aau} />
            <Stat label="Commitment" value={player.Commitment || "Undecided"} />
            <Stat label="Position" value={player.Position} />
            <Stat label="Class" value={player.Class} />
          </div>
        </div>
      </div>
    </div>
  );

  // Helper compoenent to show player info
  function Stat({ label, value }) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="mt-2 text-xl font-bold text-slate-900">
          {value || "N/A"}
        </p>
      </div>
    );
  }
}

export default PlayerPage;
