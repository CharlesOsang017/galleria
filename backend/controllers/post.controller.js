import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";

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

export const updatePost = async(req, res)=>{
  const {title, description}= req.body;
  let {image} = req.body
  try {
    const user = await User.findById(req.user._id)
    const post = await Post.findById(req.params.id)
    if(!post) {
      return res.status(404).json({message: "post is not found"})
    }
    // check if the owner of the post is the logged in user
    if(!post.user.equals(req.user._id)){
      return res.status(401).json({message: 'you are not authorized to update this post'})
    }
    if (image) {
      if (user.image) {
        await cloudinary.uploader.destroy(
          user.image.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url;
    }
    // update the fields
    post.title = title || post.title;
    post.image = image || post.image;
    post.description = description || post.description; 

    await post.save()
    return res.status(200).json(post)
    
  } catch (error) {
    console.log('error in udatePost controller', error.message)
  }
}
export const likeUnlikePost = async(req, res) => {
  const userId = req.user._id;
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userLikedPost = post.likes.includes(userId);
    if (userLikedPost) {
      // Unlike the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
      return res.status(200).json({message: 'post unliked successfully!'})
    } else {
      // Like the post
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
    }

    const updatedPost = await Post.findById(postId); // Refetch for updated likes list
    return res.status(200).json({message: 'post liked successfully!'});

  } catch (error) {
    console.log('Error in likeUnlikePost controller', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const commentOnPost = async(req, res)=>{
  const userId = req.user._id;
  const postId = req.params.id
  const {text} = req.body;
  try {
    if(!text){
      return res.status(400).json({message: 'provide a content'})
    }
    const post = await Post.findById(postId)
    if(!post){
      return res.status(404).json({message: 'post is not found'})
    }    
    const comment = {user: userId, text}
    post.comments.push(comment)
    await post.save()
    return res.status(200).json(post)
  } catch (error) {
    console.log('error in commenonpost controller', error.message)
  }
}