import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  const { title, description } = req.body;
  let { image } = req.body;
  const userId = req.user._id;
  try {
    const user = await Post.findById(userId);
    if (!title && !description) {
      return res.status(400).json({ message: "provide title and description" });
    }
    let imgUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imgUrl = uploadResponse.secure_url; // Use the uploaded image URL
    }
    // Create new post
    const newPost = new Post({
      user: userId,
      title,
      description,
      image: imgUrl || null, // Set img to null if no image is provided
    });

    // Save post
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("error creating a post", error.message);
  }
};

export const deletePost = async(req, res)=>{
  
  try {
    const post = await Post.findById(req.params.id)
    if(!post) {
      return res.status(404).json({message: "post is not found"})
    }
    // check if the owner of the post is the logged in user
    if(!post.user.equals(req.user._id)){
      return res.status(401).json({message: 'you are not authorized to delete this post'})
    }
    // delete image in the cloudinary
    if (post.image) {
      const imgId = post.image.split("/").pop().split(".")[0]; // Extract Cloudinary image ID
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.id)
    return res.status(200).json({message: 'post deleted successfully!'})

  } catch (error) {
    console.log('error in deletePost controller', error.message)
  }
}