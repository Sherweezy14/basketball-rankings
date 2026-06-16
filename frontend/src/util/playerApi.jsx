const API_URL = import.meta.env.VITE_API_URL;


function getAuthHeaders(){
    const token = localStorage.getItem("token")

    return  {"Content-Type": "application/json",
    Authorization: `Bearer ${token}`}
    
}

// Get all Players info from the Database
export async function getPlayers(){
    
    try {
        const res = await fetch(`${API_URL}/players`);
        return await res.json();    
    } catch (error) {
        console.log(error)+ "players not found";
    }    
}

//get one player
export async function getPlayer(id){
    try{
      const res =  await fetch(`${API_URL}/player/${id}`);
      const data = await res.json() ;
      return data;
    }catch{
        console.log("can not find player");
    }  
}

//Create a new player
export async function createPlayer(player){
    try {
        const res = await fetch(`${API_URL}/createPlayer`,{
                                method: "POST",
                                headers: getAuthHeaders(),
                                body: JSON.stringify(player)
                     });

        return res;             
    } catch (error) {
            console.log(error);
     }
    
     return res;
}

//update player by id
export async function updatePlayer(player,id){

    try{
        const res = await fetch(`${API_URL}/updatePlayer/${id}`,{
        headers: getAuthHeaders(),
        method: "PUT",
        body: JSON.stringify(player)
        });
    }catch(error){
        console.log("Can not update player" + error);
    }    

}

//delete one singlePlayer
export async function deletePlayer(id){

    const player = await getPlayer(id);
    const confirmDelete = window.confirm(
        `Are you sure you want to delete ${player.Name}?`
      );
    
      if (!confirmDelete) {
        return;
      }

    try{
        const res = fetch(`${API_URL}/delete/${id}`,{
                    headers: getAuthHeaders(),
                    method: "DELETE"
     });
     return JSON.stringify(res);
    }catch(err){
        console.log("could not delete player")
    } 
}

//Create a new Article

export async function createArticle(article){
   
    try {
        const res = await fetch(`${API_URL}/createarticle`,{
            method: "POST",
            body: JSON.stringify(article),
            headers: getAuthHeaders(),
        }) 
    } catch (error) {
      console.log(error);  
    }
    
    return "article created"

}

//get all articles by date

export async function getArticles(){
    
    try {
        const res = await fetch(`${API_URL}/news`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

//delete an article
export async function deleteArticle(id){
    const confirmDelete = window.confirm(
        `Are you sure you want to delete article?`
      );
    
      if (!confirmDelete) {
        return;
      }
    try {
        const res = await fetch(`${API_URL}/articles/delete/${id}`,{
            method:"DELETE",
            headers: getAuthHeaders()
        }) 

        const deleteArticle = res.json();
        return deleteArticle;

    } catch (error) {
        console.log(error);  
    }

}

export async function getArticle(id){
    try {
        const res = await fetch(`${API_URL}/articles/${id}`);
        const article =  await res.json();
        if(!article){
            console.log("can not find article")
        }
        
        return article
    } catch (error) {
        console.log(error);
    }
}

export async function updateArticle(id,article){

    try {
        const res = await fetch(`${API_URL}/articles/update/${id}`,{
            method:"PUT",
            body: JSON.stringify(article),
            headers: getAuthHeaders()
        })
        console.log(res)
        return res.json();
    } catch (error) {
        console.log(error)
    }
}

//Create a user
export async function createUser(user){
    try {
        const res = await fetch(`${API_URL}/createuser`,{
            headers: getAuthHeaders(),
            method:"POST",
            body: JSON.stringify(user),
        })
    return await res.json()

    } catch (error) {
        console.log(error);
    }
}

//Login a user and get token
export async function loginUser(login){
    try {
        const res = await fetch(`${API_URL}/login`,{
            headers: getAuthHeaders(),
            body: JSON.stringify(login),
            method: "POST"
        })
        return  await res.json()
    } catch (error) {
        console.log(error)
    }

}