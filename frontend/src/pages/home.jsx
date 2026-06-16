import React,{useState,useEffect} from "react";
import BasketballRankings from "../components/basketballrankings.jsx";
import FileUpload from "../components/fileupload.jsx";
import { useNavigate } from "react-router-dom";
import { getPlayers } from "../util/playerApi.jsx";
import TopPlayers from "../components/topplayers.jsx";
import "../app.css";


function Home(){
   const [players,setPlayers] = useState([]);
   const navigate = useNavigate(); 


   async function loadPlayers(){
    const data = await getPlayers();
    setPlayers(data);
   }
   useEffect(()=>{

    
    loadPlayers();
   },[]);

   return( 
    <div className="App min-h-screen bg-slate-50">
        <TopPlayers players={players} />
        <BasketballRankings players={players} />
    </div>
    )

}

export default Home;

