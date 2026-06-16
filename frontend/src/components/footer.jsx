import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <FooterStat number="10K+" label="Players Profiled" />
            <FooterStat number="800+" label="College Programs" />
            <FooterStat number="50K+" label="Coach Connections" />
            <FooterStat number="Daily" label="Profile Views" />
          </div>
  
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-slate-200 pt-8">
            <div className="text-center lg:text-left">
              <h2 className=" text-2xl font-black text-slate-900">
                Hoop<span className="text-purple-700">Scout</span>
              </h2>
  
              <p className="mt-2 text-slate-500">
                Connecting high school basketball players with college coaches.
              </p>
            </div>
  
            <div className="flex justify-center flex-wrap gap-5 md:mt-10 text-sm font-semibold text-slate-600">
              <Link to="/"className="hover:text-purple-700">Rankings</Link>
              <Link to="/"className="hover:text-purple-700">Players</Link>
              <Link to="/articles"className="hover:text-purple-700">Articles</Link>
              <Link to="/"className="hover:text-purple-700">Coaches</Link>
              <Link to="/"className="hover:text-purple-700">Ontact</Link>
          
            </div>
          </div>
  
          <p className="text-center lg:text-left mt-8 text-sm text-slate-400">
            © {new Date().getFullYear()} HoopScout. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }
  
  function FooterStat({ number, label }) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center">
          <span className="text-purple-700 font-black">★</span>
        </div>
  
        <p className="text-3xl font-black text-slate-900">{number}</p>
        <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
      </div>
    );
  }
  
  export default Footer;