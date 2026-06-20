import { loginUser } from "../util/playerApi"
import { useState } from "react"
import {authUser} from "../context/tokencontext"

function UserLogin(){
    const[data,setData] = useState({})
    const{token, userLoggedIn, logIn, logOut}  = authUser()

    function change(event){
        setData({...data,[event.target.name]:event.target.value})
    }

    async function logInUserInput(event){
        event.preventDefault();
        const user = await loginUser(data)
        
        if(user.token){
            logIn(user)
        }    
    }

    function logOutUser(event){
        event.preventDefault()
        logOut()
    }

    return (!token ? ( <>
        <form className="flex items-center gap-2 " action="Submit">
            <input name="email" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2" placeholder="Email" onChange={change} type="text" />
            <input name="password" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2" placeholder="Password" onChange={change} type="password" />
            <button className="bg-purple-700 text-white font-bold px-4 py-2 rounded-xl" onClick={logInUserInput}> Login </button>
        </form>
    </> ): (<div className="flex items-center gap-8">
            <p className="hidden lg:block"> {"Hello " + userLoggedIn.name.split(" ")[0]}</p>
            <p className="text-red-500 mt-5 text-1xl lg:hidden" onClick={logOutUser}> Sign Out</p>
            <button className="hidden lg:block bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl" onClick={logOutUser}> LogOut </button>
           </div>)

    )

}


export default UserLogin