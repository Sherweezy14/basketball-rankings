import { useState,useContext,createContext } from "react";

const userContext = createContext(null)

export function TokenAuth({ children }){
    const [token,setToken]= useState(localStorage.getItem("token"))
    const [userLoggedIn,setUserLoggedIn]= useState(JSON.parse(localStorage.getItem("user")))

    function logIn(user){
        localStorage.setItem("token",user.token)
        localStorage.setItem("user",JSON.stringify(user.user))
        setToken(user.token)
        setUserLoggedIn(user.user)
    }

    function logOut(){
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUserLoggedIn(null)
    }

    return(
        <userContext.Provider value ={{token, userLoggedIn, logIn, logOut}}>
            {children}
        </ userContext.Provider>
    )

}

export function authUser(){
    return useContext(userContext)
}