import { Edit, FileEdit, PenBox, PencilIcon } from "lucide-react";
import React from "react";

const ProfilePage = () => {
  const user = {
    name: "Charles Osango",
    username: "@Charles_17",
    bio: "Nutritionist, Developer, and Community Volunteer",
    profileImg:
      "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    location: "Nairobi, Kenya",
  };

  return (
    <div className="container mx-auto max-w-lg p-6 shadow-lg bg-white rounded-lg mt-8">
      <div className="relative flex flex-col items-center group">
        <div className="absolute top-2 right-13 bg-white  rounded-full p-1 shadow-md  opacity-0 group-hover:opacity-100 transition-opacity">
          <PencilIcon className="text-gray-600 h-5 w-5 cursor-pointer" />
        </div>
        <img
          src={user.profileImg}
          alt={`${user.name}'s profile`}
          className="rounded-full w-40 h-40 object-cover"
        />
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-500">{user.username}</p>
        <p className="text-sm text-gray-700 text-center mt-2">{user.bio}</p>
        <p className="text-xs text-gray-500 mt-1">{user.location}</p>
      </div>

      <div className="flex justify-end items-center">
        <button className="btn btn-ghost">Edit Profile</button>
      </div>
      {/* 
      <div className="mt-6 flex justify-around w-full">
        <button className="btn btn-primary">Follow</button>
        <button className="btn btn-secondary">Message</button>
      </div> */}

      <div className="mt-8">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="text-gray-700 mt-2">
          Experienced in community service, nutrition, and software development.
          Passionate about public health and technology integration.
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
