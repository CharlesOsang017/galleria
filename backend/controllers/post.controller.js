import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";

export const createPost = async (req, res) => {
  const { title, description, category } = req.body;
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
      category,
      image: imgUrl || null, // Set img to null if no image is provided
    });

    // Save post
    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("error creating a post", error.message);
  }
};

export const gettAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "user", select: "-password" })
      .populate({ path: "comments.user", select: "-password" });
    if (!posts) {
      return res.status(200).json([]);
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log("error in the getallpost controller", error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "post is not found" });
    }
    // check if the owner of the post is the logged in user
    if (!post.user.equals(req.user._id)) {
      return res
        .status(401)
        .json({ message: "you are not authorized to delete this post" });
    }
    // delete image in the cloudinary
    if (post.image) {
      const imgId = post.image.split("/").pop().split(".")[0]; // Extract Cloudinary image ID
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "post deleted successfully!" });
  } catch (error) {
    console.log("error in deletePost controller", error.message);
  }
};

export const updatePost = async (req, res) => {
  const { title, description, category } = req.body;
  let { image } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.user.equals(req.user._id)) {
      return res.status(401).json({ message: "Not authorized to update this post" });
    }

    // Handle image upload
    if (image) {
      if (user.image) {
        const imageId = user.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(imageId);
      }

      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }

    // Update fields
    post.title = title || post.title;
    post.image = image || post.image;
    post.description = description || post.description;
    post.category = category || post.category;

    await post.save();

    // Return updated post
    return res.status(200).json({
      id: post._id,
      title: post.title,
      description: post.description,
      category: post.category,
      image: post.image,
      user: post.user, // You can exclude this if needed
    });
  } catch (error) {
    console.error("Error in updatePost controller:", error.message);
    return res.status(500).json({ message: "An error occurred while updating the post" });
  }
};

export const likeUnlikePost = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // Unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      return res.status(200).json({ message: "post unliked successfully!" });
    } else {
      // Like the post
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
    }

    const updatedPost = await Post.findById(postId); // Refetch for updated likes list
    return res.status(200).json({ message: "post liked successfully!" });
  } catch (error) {
    console.log("Error in likeUnlikePost controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const commentOnPost = async (req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;
  const { text } = req.body;
  try {
    if (!text) {
      return res.status(400).json({ message: "provide a content" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "post is not found" });
    }
    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.log("error in commenonpost controller", error.message);
  }
};

export const detailPost = async(req, res)=>{
  try {
    const post = await Post.findById(req.params.id).populate({ path: "user", select: "-password" })
    .populate({ path: "comments.user", select: "-password" });
    if(!post){
      return res.status(404).json({message: 'post not found'})
    }
    return res.status(200).json(post)
  } catch (error) {
    console.log(error.message)
  }
}