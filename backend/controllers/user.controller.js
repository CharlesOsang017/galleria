import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/token.js";

export const createUser = async (req, res) => {
  const { username, fullName, email, password } = req.body;
  try {
    if (!username || !fullName || !email || !password) {
      return res.status(403).json({ message: "All fields are required" });
    }
    // checking for existing username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "username is already taken" });
    }

    //checking for an existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    generateTokenAndSetCookie(newUser?._id, res);
    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log("Error creating a user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res
        .status(404)
        .json({ message: "email or password is not correct" });
    }
    generateTokenAndSetCookie(user?._id, res);
    return res.status(200).json({
      _id: user?._id,
      fullName: user?.fullName,
      username: user?.username,
      email: user?.email,
      skills: user?.skills,
      about: user?.about,
      profileImg: user?.profileImg,
    });
  } catch (error) {
    console.log("error loging in user", error.message);
  }
};

export const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "logged out successfully!" });
  } catch (error) {
    console.log("error logging out ", error.message);
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
