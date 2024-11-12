import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProfileUpdate from "../../hooks/useProfileUpdate";

const EditProfile = () => {
	const {data: user} = useQuery({queryKey: ['authUser']})
	const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    location: "",
    skills: "",
    about: "",
  });

  const {updateProfile, isUpdatingProfile} = useProfileUpdate()


  const handleProfileUpdate = (e)=>{
	e.preventDefault()
	updateProfile(formData)
  }

  useEffect(()=>{
	if(user){
		setFormData({
			fullName: user.fullName,
			username: user.username,
			email: user.email,
			about: user.about,
			skills: user.skills,
			location: user.location
		})
	}
  },[user])
  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md relative">
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 outline-none"
            onClick={() =>
              document.getElementById("edit_profile_modal").close()
            }
          >
            <X />
          </button>

          <h3 className="font-bold text-lg my-3 flex justify-center">
            Update Profile
          </h3>
          <form className="flex flex-col gap-4" onSubmit={handleProfileUpdate}>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
				name='fullName'
				value={formData.fullName}
				onChange={(e)=>setFormData({...formData, fullName: e.target.value})}
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                type="text"
				name='username'
				value={formData.username}
				onChange={(e)=>setFormData({...formData, username: e.target.value})}
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
				name='email'
				value={formData.email}
				onChange={(e)=>setFormData({...formData, email: e.target.value})}
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <textarea
                placeholder="Location"
				name='location'
				value={formData.location}
				onChange={(e)=>setFormData({...formData, location: e.target.value})}
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
				name='skills'
				value={formData.skills}
				onChange={(e)=>setFormData({...formData, skills: e.target.value})}
                placeholder="Skill/Profession"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
				name='about'
				value={formData.about}
				onChange={(e)=>setFormData({...formData, about: e.target.value})}
                placeholder="About"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>

            <button
			type="submit"
              className="btn  btn-neutral 
 rounded-md text-white"
            >
              {isUpdatingProfile ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default EditProfile;
