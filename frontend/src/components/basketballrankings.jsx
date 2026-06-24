import React, { useEffect, useState } from "react";
import "../app.css";
import { Link } from "react-router-dom";
import { authUser } from "../context/tokencontext";
import { hasPermission } from "../util/userpermissions";

function BasketballRankings(playersLoad) {
  const { token, userLoggedIn } = authUser();

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="inline-flex bg-amber-400 text-purple-950 text-sm font-bold px-3 py-1 rounded-full">
            Player Rankings
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">
            High School Basketball Rankings
          </h1>

          <p className="mt-2 text-slate-500">
            Discover top prospects, commitments, school info, and player
            profiles.
          </p>
        </div>

        {userLoggedIn && hasPermission(userLoggedIn.role, "create_player") && (
          <Link
            to="/createplayer"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-3 rounded-xl shadow-sm text-center"
          >
            + Add Player
          </Link>
        )}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Player
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Position
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Class
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  High School
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Commitment
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  AAU
                </th>
                <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Height
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {playersLoad.players.map((player) => (
                <tr
                  key={player._id}
                  className="hover:bg-purple-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400 text-purple-950 font-extrabold">
                      {player.Rank}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                        {player.Image ? (
                          <img
                            src={player.Image}
                            alt={player.Name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="font-bold text-purple-700">
                            {player.Name?.charAt(0)}
                          </span>
                        )}
                      </div>

                      <div>
                        <Link
                          to={`/player/${player._id}/${player.Slug}`}
                          className="font-bold text-slate-900 hover:text-purple-700"
                        >
                          {player.Name}
                        </Link>

                        <p className="text-sm text-slate-500">
                          {player.HighSchool || "School N/A"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-700 font-medium">
                    {player.Position || "N/A"}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {player.Class || "N/A"}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {player.highSchool || "N/A"}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-sm font-bold">
                      {player.Commitment || "Undecided"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {player.Aau || "N/A"}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {player.Height || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
export default BasketballRankings;
