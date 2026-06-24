import PlayerForm from "../components/playerform";
import { createPlayer } from "../util/playerApi";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { hasPermission } from "../util/userpermissions";
import { authUser } from "../context/tokencontext";

function CreatePlayerPage() {
  async function createThenHome(player) {
    await createPlayer(player);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <Link
          to={`/`}
          className="text-purple-700 font-semibold hover:text-purple-900"
        >
          ← Back Home
        </Link>

        <div className="mt-6 mb-6">
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
            Create New Player
          </h1>

          <p className="mt-2 text-slate-500">
            Enter rankings, school info, recruiting status, and player profile
            details.
          </p>
        </div>

        <PlayerForm
          initialValues={null}
          submit={createThenHome}
          buttonText="Save Changes"
        />
      </div>
    </div>
  );
}

export default CreatePlayerPage;
