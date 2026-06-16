import { NavLink, Link } from "react-router-dom";

function Sidebar() {
  const links = [
    { label: "Dashboard", path: "/dashboard", icon: "⌂" },
    { label: "Rankings", path: "/rankings", icon: "▥" },
    { label: "Players", path: "/players", icon: "♙" },
    { label: "Colleges", path: "/colleges", icon: "⌘" },
    { label: "News", path: "/articles", icon: "▤" },
    { label: "Events", path: "/events", icon: "□" },
    { label: "Offers", path: "/offers", icon: "◴" },
    { label: "Recruiting Board", path: "/recruitingboard", icon: "▯" },
    { label: "Bookmarks", path: "/booksmarks", icon: "▱" },
    { label: "Messages", path: "/messages", icon: "✉", badge: 0 },
    { label: "Settings", path: "/settings", icon: "⚙" },
    { label: "Create User", path: "/createUser", icon: "!" },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 px-6 py-6 flex-col">
      <Link to="/" className="mb-8 flex items-center">
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

      <nav className="flex-1 space-y-1.5">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
              flex items-center gap-4 rounded-xl px-4 py-.5 text-sm font-bold transition
              ${
                isActive
                  ? "bg-purple-700 text-white shadow-sm"
                  : "text-slate-700 hover:bg-purple-50 hover:text-purple-700"
              }
              `
            }
          >
            <span className="w-5 text-lg">{link.icon}</span>
            <span className="flex-1">{link.label}</span>

            {link.badge !== undefined && (
              <span className="h-5 min-w-5 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center px-1">
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 bg-white border border-slate-200 rounded-3xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-slate-100 overflow-hidden">
            <img
              src="/coach-avatar.png"
              alt="Coach"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="font-black text-slate-900">Coach Mike</p>
            <p className="text-sm text-slate-500">College Coach</p>
          </div>
        </div>

        <Link
          to="/coach-profile"
          className="mt-4 block rounded-xl bg-slate-100 py-3 text-center text-sm font-black text-purple-700 hover:bg-purple-100"
        >
          View Profile
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;