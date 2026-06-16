import NewsForm from "../components/newsform";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, updateArticle } from "../util/playerApi";
function UpdateArticlePage (){
    const [article,setArticle] = useState(null);
    const {id} = useParams();
    const update = async (formData)=>{ await updateArticle(id,formData)};
   

    useEffect(()=>{
        async function load(){
         const res =  await getArticle(id);
         setArticle(res);
        }
        load()
    },[id]);

if(!article){
        return "Loading"
    }

return(
    <NewsForm initialValues={article} action={update} buttonName="Update"/>
)    
}


export default UpdateArticlePage;