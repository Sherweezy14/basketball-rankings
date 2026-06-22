import React from "react";
import "./app.css";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home";
import PlayerPage from "./pages/playerPage";
import CreatePlayerPage from "./pages/createPlayerPage"
import UpdatePlayerPage from "./pages/updatePlayerPage";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Sidebar from "./components/sidebar";
import PageNotFound from "./pages/404";
import CreateNewsPage from "./pages/createNews";
import NewsPage from "./pages/newsPage";
import ReadNewsPage from "./pages/readnewspage";
import UpdateArticlePage from "./pages/updatearticle";
import CreateUserPage from "./pages/createUserPage";
import { TokenAuth } from "./context/tokencontext";
import LogInPage from "./pages/LogInPage";
function App(){
  
    return(
      <TokenAuth>
        <Sidebar />

        <main className="lg:ml-64">
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>  
            <Route path="/player/:id/:slug" element={<PlayerPage/>}/>
            <Route path="/createPlayer" element={<CreatePlayerPage/>} />
            <Route path="/updatePlayer/:id" element={<UpdatePlayerPage/>}/>
            <Route path="/article/new" element={<CreateNewsPage/>}/>
            <Route path="/articles/:id" element={<ReadNewsPage/>}/>
            <Route path="/articles/update/:id" element={<UpdateArticlePage/>}/>
            <Route path="/articles" element={<NewsPage/>}/>
            <Route path="createUser" element={<CreateUserPage />}/>
            <Route path="/login" element={<LogInPage />}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
        </main>  
      </TokenAuth>  
    ); 

}

export default App;