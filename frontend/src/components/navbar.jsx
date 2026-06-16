import { useState } from "react";
import { Link } from "react-router-dom";
import SearchPlayers from "./searchplayers";
import UserLogin from "./userlogin";
import { authUser } from "../context/tokencontext";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {token} = authUser()

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="lg:hidden flex items-center gap-3">
          <img src="/img/logo1.png" alt="HoopScout" className="h-18 w-auto" />
          <div>
            <h1 className="font-black text-xl text-slate-900">
              HoopScout
            </h1>

            <p className="text-xs text-slate-500">
              Recruiting Platform
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="font-semibold text-slate-700 hover:text-purple-700">Rankings</Link>
          <Link to="/articles" className="font-semibold text-slate-700 hover:text-purple-700">Articles</Link>
          <Link to="/" className="font-semibold text-slate-700 hover:text-purple-700">Events</Link>
          <SearchPlayers className="border-1"/>
          <UserLogin className=""/>
          {token && (<Link to="/createplayer" className="bg-purple-700 text-white font-bold px-5 py-2.5 rounded-xl">+ Add Player</Link>)}
          
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl font-bold text-slate-900"
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-4">
          <Link onClick={() => setMenuOpen(false)} to="/" className="block font-semibold text-slate-700">
            Rankings
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/articles" className="block font-semibold text-slate-700">
            Articles
          </Link>

          <Link onClick={() => setMenuOpen(false)} to="/" className="block font-semibold text-slate-700">
            Events
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;