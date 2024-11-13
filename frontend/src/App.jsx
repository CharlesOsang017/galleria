import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Items from "./pages/Items";
import Detail from "./pages/Detail";

import CreateGalleryPage from "./pages/CreateGallery/CreateGalleryPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import ProfilePage from "./pages/profile/ProfilePage";
import Update from "./pages/Update";

const App = () => {
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Something went wrong");
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  console.log("me", user);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/items" />}
        />
        <Route
          path="/items"
          element={user ? <Items /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/items" />}
        />
        <Route
          path="/profile/:username"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/detail/:id"
          element={user ? <Detail /> : <Navigate to="/login" />}
        />
        <Route
          path="/update/:id"
          element={user ? <Update /> : <Navigate to="/login" />}
        />
        <Route
          path="/create"
          element={user ? <CreateGalleryPage /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Hero />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
