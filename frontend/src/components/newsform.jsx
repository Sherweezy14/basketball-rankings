import { useState,useEffect, useRef } from "react";
import { useNavigate,Link } from "react-router-dom";
import { getPlayers } from "../util/playerApi";
import getCaretCoordinates from "textarea-caret"

function NewsForm({initialValues,action,buttonName}){
  const [players,setPlayers] = useState(null);
  const [filteredPlayers,setFilteredPlayers]= useState([]);
  const [cursorPos,setCursorPos] = useState({})
  const bodyRef = useRef(null);  
  const navigate = useNavigate();
  
    const [value,setValues] = useState({
        title: initialValues?.title || "",
        body: initialValues?.body || "",
        author: initialValues?.author || "Sherwyn",
        Players: initialValues?.Players || []

    });

    function searchPlayers(players,search){
      const res = players.filter((player)=> player.Name.toLowerCase().includes(search.toLowerCase()))
      setFilteredPlayers(res);
    }
   
    function change(e){
        if(e.target.name === "body"){
          const lastMention = e.target.value.lastIndexOf("@");
          if(lastMention !== -1  ){ 
            const lastPos = e.target.selectionStart;
            const coords = getCaretCoordinates(e.target,lastPos);
            setCursorPos(coords);
            const search = e.target.value.slice(lastMention+1,e.target.value.length)
            !search.includes(" ") && search !=='' ? searchPlayers(players,search): setFilteredPlayers([]);
          }  
        }
        
        
        setValues({...value,
            [e.target.name]: e.target.value})
        
    }

    async function save(event){
        event.preventDefault();
        const res =await action(value);
        navigate("/articles");
        
    }
    //On mention link click find the text at the mention put it into variable
    // then add the slug after @ and a space
    // set filtered players to empty array to remove pop up menu
    function mentionToSlug(player){
      const lastMentionIndex = value.body.lastIndexOf("@");
      const textBeforeMention = value.body.slice(0,lastMentionIndex+1);
   
      setValues({...value,
        [bodyRef.current.name]: textBeforeMention + player.Slug +" ",
        ['Players']: [...value.Players,
                     player._id]})
       
        setFilteredPlayers([]);
        
    }
    useEffect(()=>{
      async function loadPlayers (){
        const res = await getPlayers();
        setPlayers(res);
      }
      loadPlayers();
    },[]);


     return (
        <div className="min-h-screen bg-slate-50 py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-flex bg-amber-400 text-purple-950 text-sm font-bold px-3 py-1 rounded-full">
                News Article
              </span>
    
              <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
                {buttonName} Article
              </h1>
    
              <p className="mt-2 text-slate-500">
                Publish recruiting news, player updates, and rankings stories.
              </p>
            </div>
    
            <form
              onSubmit={save}
              className="bg-white border border-slate-200 rounded-3xl shadow-sm p-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Article Title
                  </label>
    
                  <input
                    onChange={change}
                    type="text"
                    value={value.title}
                    name="title"
                    placeholder="Enter article title"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      px-4
                      py-3
                      outline-none
                      focus:border-purple-600
                      focus:ring-4
                      focus:ring-purple-100
                    "
                  />
                </div>
    
                <div className="relative">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Article Body
                  </label>
    
                  <textarea
                    onChange={change}
                    ref={bodyRef}
                    name="body"
                    value={value.body}
                    rows="15"
                    placeholder="Write your story..."
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-slate-50
                      px-4
                      py-3
                      outline-none
                      resize-none
                      focus:border-purple-600
                      focus:ring-4
                      focus:ring-purple-100
                      
                    "
                  />
                    {filteredPlayers.length > 0 && (
                    <div className="
                            absolute 
                            w-50 
                            bg-white 
                            border 
                            border-slate-200 
                            rounded-2xl 
                            shadow-lg 
                            p-2"
                      style={ {left:cursorPos.left+10 , top:cursorPos.top+20} }>
                      {filteredPlayers.map((player)=>(
                        <Link className="flex" key={player._id} onClick={()=>mentionToSlug(player)}> {player.Name}</Link>
                      ))}
                    </div>)}
                 
                </div>
    
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="
                      bg-purple-700
                      hover:bg-purple-800
                      text-white
                      font-bold
                      px-6
                      py-3
                      rounded-xl
                      shadow-sm
                      transition-colors
                    "
                  >
                    {buttonName}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    }
    
    export default NewsForm;