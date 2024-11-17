import { PencilIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import EditProfile from "./EditProfile";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useProfileUpdate from "../../hooks/useProfileUpdate";
import { formatMemberSinceDate } from "../../utils/date";

const ProfilePage = () => {
  const { data: logedinUser } = useQuery({ queryKey: ["authUser"] });
  const profileImgRef = useRef(null);
  const [profileImg, setProfileImg] = useState(null);

  const { username } = useParams();
  const { data: user } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/user/profile/${username}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error("error getting profile");
        }
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  });

  const isMyProfile = logedinUser?._id === user?._id;

  // const handleImgChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setProfileImg(URL.createObjectURL(file)); // For preview
  //     setSelectedFile(file); // Save file to state for upload
  //     // Add any image validation (e.g., size, format) here if needed
  //   }
  // };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleProfileImg = (profileImg) => {
  //   mutate(profileImg);
  // };
  const { updateProfile, isUpdatingProfile } = useProfileUpdate();

  const queryClient = useQueryClient();
  const {
    mutate: exit,
    isError,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });
        if (!res.ok) throw new Error("something went wrong");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
  });

  const datejoined = formatMemberSinceDate(user?.createdAt);

  return (
    <div className="container mx-auto max-w-lg p-6 shadow-lg  rounded-lg mt-8">
      <div className="relative flex flex-col items-center group">
        {/* Pencil Icon to Change Profile Image */}
        <div className="absolute top-2 right-4  rounded-full p-1  ">
          {isMyProfile &&
            (profileImg ? (
              <button
                onClick={() => updateProfile({ profileImg })}
                className={`btn btn-outline rounded-full btn-sm ${
                  isUpdatingProfile ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isUpdatingProfile}
              >
                {isUpdatingProfile ? (
                  <div className="loader w-4 h-4 border-t-2 border-gray-600 rounded-full animate-spin"></div>
                ) : (
                  "Save"
                )}
              </button>
            ) : (
              <PencilIcon
                className="text-gray-600 h-5 w-5 cursor-pointer"
                onClick={() => profileImgRef.current.click()}
              />
            ))}

          <input
            type="file"
            hidden
            ref={profileImgRef}
            onChange={handleImgChange}
          />
        </div>

        {/* Profile Image */}
        <img
          src={profileImg || user?.profileImg}
          alt={`${user?.username || "user"}'s profile`}
          className="rounded-full w-40 h-40 object-cover"
        />

        {/* User Information */}
        <h1 className="text-2xl font-bold">{user?.fullName}</h1>
        <p className="text-gray-500">@{user?.username}</p>
        <p className="text-sm text-gray-700 text-center mt-2">{user?.skills}</p>
        <p className="text-xs text-gray-500 mt-1">{user?.location}</p>
        <p className="text-xs text-gray-600 mt-1">{datejoined}</p>
      </div>

      {/* Edit Profile Component */}
      <div className="flex justify-between">
        {isMyProfile && (
          <button onClick={() => exit()} className="btn btn-ghost">
            logout
          </button>
        )}
        <div className="flex justify-end items-center mt-4">
          <EditProfile isMyProfile={isMyProfile}/>
        </div>
      </div>

      {/* About Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="text-gray-700 mt-2">{user?.about}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
