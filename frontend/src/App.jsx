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
  const { data: user, isLoading } = useQuery({
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



  

  return (
    <>
      <Header />
      {isLoading && (
          <div className="flex justify-center items-center min-h-screen">
          <div className="loader-h w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
         
      )}
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
        <Route path="/" element={!user ? <Hero /> : <Navigate to='/items' />}  />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
