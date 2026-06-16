import PlayerForm from "../components/playerform";
import { getPlayer, updatePlayer } from "../util/playerApi";
import React,{ useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";


function UpdatePlayerPage(){
    const {id} = useParams();
    const[player,setPlayer] = useState(null);
    const navigate = useNavigate();

    async function loadPlayer(){
       const data = await getPlayer(id);
       setPlayer(data);
    }
    async function handleUpdate(formData){
        const slug = player.Slug;
        await updatePlayer(formData,id);
        navigate(`/player/${id}/${slug}`);
    }
    useEffect(()=>{
        loadPlayer();
    },[id]);

    if (!player) {
        return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <p className="text-slate-500">Loading player...</p>
          </div>
        );
      }
    
      return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <Link
              to={`/player/${id}/${player.Slug}`}
              className="text-purple-700 font-semibold hover:text-purple-900"
            >
              ← Back to player
            </Link>
    
            <div className="mt-6 mb-6">
              <span className="inline-flex bg-amber-400 text-purple-950 text-sm font-bold px-3 py-1 rounded-full">
                Edit Profile
              </span>
    
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight">
                Update {player.Name}
              </h1>
    
              <p className="mt-2 text-slate-500">
                Edit rankings, school info, recruiting status, and player profile details.
              </p>
            </div>
    
            <PlayerForm
              initialValues={player}
              submit={handleUpdate}
              buttonText="Save Changes"
            />
          </div>
        </div>
      );
    }
export default UpdatePlayerPage;