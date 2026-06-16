import { useState, useEffect } from "react";
import { getPlayers } from "../util/playerApi";
import { Link } from "react-router-dom";

function SearchPlayers(){
    
    
    const [search, setSearch] = useState(""); 
    const [players,setPlayers]= useState([]);  
    const [results,setResults] = useState([]);
    const [isFocused,setFocus]= useState(false);
   
    useEffect(()=>{

        async function loadPlayers (){
            const p =  await getPlayers();
            setPlayers(p)
        } 
        loadPlayers();
        
    },[])
  
  
    

    function updateSearch(event){
        const value = event.target.value;
        setSearch(value);
        if(value.trim()===""){
            setResults([]);
            return
        }
        const filteredPlayers = players.filter((player)=>{
            return player.Name.toLowerCase().includes(value.toLowerCase());
        })
        setResults(filteredPlayers);     
    }


    return (
        <div className="relative">
          <input
            type="text"
            value={search}
            name="search"
            onChange={updateSearch}
            onFocus={()=>setFocus(true)}
            onBlur={()=>{ setTimeout(()=> setFocus(false),200)}}
            placeholder="Search players..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2"
          />
    
          {isFocused && results.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border border-slate-200 rounded-2xl shadow-lg p-2">
            {results.map((player) => (
              <Link
                key={player._id}
                to={`/player/${player._id}/${player.Slug}`}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-1
                  py-1
                  hover:bg-purple-50
                  transition-all
                "
              >
                <div className="h-5 w-5 rounded-xl bg-slate-100" />
          
                <div>
                  <p className="font-bold">{player.Name}</p>
                  <p className="text-sm text-slate-500">
                    Rank #{player.Rank}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          )}
        </div>
    );
}
    


export default SearchPlayers;