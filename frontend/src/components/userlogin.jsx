import { loginUser } from "../util/playerApi"
import { useState } from "react"
import {authUser} from "../context/tokencontext"
import { useNavigate } from "react-router-dom"

function UserLogin(){
    const nav = useNavigate()
    const[data,setData] = useState({})
    const[errors,setErrors] = useState({})
    const{token, userLoggedIn, logIn, logOut}  = authUser()
    const regexTest = {email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                   password:/^(?=.*[A-Za-z])(?=.*\d).{8,}$/}

    function change(event){
        // Check each field input against regex 
        // if it matches remove error if it fails add err
        if(regexTest[event.target.name].test(event.target.value) || event.target.value === ""){
            const {[event.target.name]:value,...left} = errors
            setErrors(left)
        }else{
            setErrors({...errors,[event.target.name]:true}) 
        }


        setData({...data,[event.target.name]:event.target.value})
   

    }

    async function logInUserInput(event){
        event.preventDefault();
        const user = await loginUser(data)
        if(user.token){
            logIn(user)
            nav("/")
        }else{
            alert("User Name or Password Incorrect")
        } 

    }

    function logOutUser(event){
        event.preventDefault()
        logOut()
    }

    return (!token ? ( <>
        <form className="flex flex-col items-center gap-2 " action="Submit" onSubmit={logInUserInput}>
            <input required name="email" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2" placeholder="Email" onChange={change} type="text" />
            {errors?.email && <p className="text-red-600"> Must be an email.</p>}
            <input required name="password" className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-2" placeholder="Password" onChange={change} type="password" />
            {errors?.password && <p className="text-red-600"> Password must be at least 8 characters and include a letter and a number.</p>}
            <button disabled={Object.keys(errors).length !== 0} className="bg-purple-700 text-white font-bold px-4 py-2 rounded-xl disabled:bg-slate-300 disabled:text-slate-500 disabled:hover:bg-slate-300 disabled:cursor-not-allowed" type="Submit" > Login </button>
        </form>
    </> ): (<div className="flex flex-col items-center gap-2">
            <p className="hidden text-2xl lg:block"> {"Hello " + userLoggedIn.name.split(" ")[0]}</p>
            <p className="text-red-500 mt-5 text-1xl lg:hidden" onClick={logOutUser}> Sign Out</p>
            <button className="hidden lg:block bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl" onClick={logOutUser}> LogOut </button>
           </div>)

    )

}


export default UserLogin