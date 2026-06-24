import React from "react";
import "./app.css";
import { Outlet, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import PlayerPage from "./pages/playerPage";
import CreatePlayerPage from "./pages/createPlayerPage";
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
import ProtectedRoute from "./components/protectedRoutes";
function App() {
  function Layout() {
    return (
      <>
        <main className="lg:ml-64">
          <NavBar />

          <div>
            <Sidebar />

            <main className="flex-1">
              <Outlet />
            </main>
          </div>
          <Footer></Footer>
        </main>
      </>
    );
  }
  return (
    <TokenAuth>
      <Routes>
        //Roots with lauout
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/player/:id/:slug" element={<PlayerPage />} />

          <Route
            path="/createPlayer"
            element={
              <ProtectedRoute permission="create_player">
                <CreatePlayerPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/updatePlayer/:id"
            element={
              <ProtectedRoute permission="update_player">
                <UpdatePlayerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/article/new"
            element={
              <ProtectedRoute permission="create_article">
                <CreateNewsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/articles/:id" element={<ReadNewsPage />} />
          <Route
            path="/articles/update/:id"
            element={
              <ProtectedRoute permission="update_article">
                <UpdateArticlePage />
              </ProtectedRoute>
            }
          />
          <Route path="/articles" element={<NewsPage />} />
          <Route path="createUser" element={<CreateUserPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </TokenAuth>
  );
}

export default App;
