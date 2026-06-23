import UserLogin from "../components/userlogin"
import { Link } from "react-router-dom"
export default function LogInPage(){
    




    return(
        <div className="min-h-screen bg-slate-100 flex items-center justify-center py-10 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200 shadow-xl p-8">

                <div className="text-center my-8">
                <span className="inline-block bg-amber-400 text-purple-950 font-bold px-4 py-1 rounded-full text-sm">
                    Hoop Recruit
                </span>

                <h1 className="mt-4 text-4xl font-black text-slate-900">
                    Welcome Back
                </h1>

                <p className="mt-2 text-slate-500">
                    Login to manage players, rankings, and articles.
                </p>
                </div>

                <UserLogin />

                <div className="mt-6 text-center">
                <p className="text-slate-500">
                    Don't have an account?
                </p>

                <Link
                    to="/createUser"
                    className="font-bold text-purple-700 hover:text-purple-800"
                >
                    Create Account
                </Link>
                </div>

            </div>
        </div>
    )
}