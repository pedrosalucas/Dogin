import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { autoLogin } from "./providers/user";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import User from "./pages/User";
import UserProfile from "./components/User/UserProfile";
import Photo from "./pages/Photo";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/Helper/ProtectedRoute";

import "./styles/App.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <ProtectedRoute path="conta/*" element={<User />} />
            <Route path="foto/:id" element={<Photo />} />
            <Route path="perfil/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
