import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const {data: authUser} = useQuery({queryKey: ['authUser']})

  const userFound = false;
  return (
    <header className="flex justify-between shadow-md px-6 py-2 items-center sticky top-0 bg-white">
      <Link to={"/items"} className="logo">
        <img
          src="/svg_lg.png"
          alt="gallery_logo"
          className="md:h-20 md:w-20 h-10 w-10"
        />
      </Link>

      <div className="side-bar flex items-center ml-auto gap-4">
        {authUser ? (
          <>
            {" "}
            <Link to={"/create"}>
              <button className="btn btn-ghost border border-gray-400   rounded-full">
                <Plus />
              </button>
            </Link>
            <Link to={`profile/${authUser?.username}`} className="flex items-center gap-2">
              <img
                src={authUser.profileImg}
                alt={authUser.username}
                className="h-10 w-10 rounded-full"
              />
              <h4>@{authUser.username}</h4>
            </Link>
          </>
        ) : (
          <Link to={"/register"}>
            <button className="btn btn-accent btn-sm md:btn-md">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
