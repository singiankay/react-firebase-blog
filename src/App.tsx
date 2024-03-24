import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login";
import { Main } from "./pages/main/main";
import { Navbar } from "./components/navbar";
import { CreatePost } from "./pages/create-post/create-post";

function App() {
  return (
    <div className="app bg-gray-200">
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
