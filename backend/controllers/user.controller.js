import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("error in getUserProfile", error.message);
  }
};

export const updateProfile = async (req, res) => {
  const { username, fullName, about, skills, email } = req.body;
  let { profileImg } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "user not found" });
    // Handle profile image update
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    // update user fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.about = about || user.about;
    user.skills = skills || user.skills;
    user.profileImg = profileImg || user.profileImg;

    // Save the updated user details
    user = await user.save();

    // Exclude password from response
    user.password = undefined;

    return res.status(200).json(user);
  } catch (error) {
    console.log("error update userProfile", error.message);
  }
};
