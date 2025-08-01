import React, { useState, useEffect } from 'react';
import Navbar from "./components/navbar/navbar";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from "./page/home/home";
import PostPage from "./page/posts/posts";
import CreatePostPage from "./page/createpost/createposts";
import AdminDashboardPage from "./page/admin/admin-dashboard";
import Login from "./page/forms/login";
import Register from "./page/forms/register";
import Intro from "./components/intro/intro";

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000); 
    const hideTimer = setTimeout(() => setShowIntro(false), 3000); 
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (showIntro) {
    return <Intro fadeOut={fadeOut} />;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<PostPage />} />
          <Route path="/posts/create-post" element={<CreatePostPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
