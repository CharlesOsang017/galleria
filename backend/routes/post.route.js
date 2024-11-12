import express from 'express'
import { protectedRoute } from '../middleware/protectRoute.js'
import { createPost, deletePost, updatePost,detailPost ,likeUnlikePost, commentOnPost, gettAllPosts } from '../controllers/post.controller.js'

const router = express.Router()

router.post('/create', protectedRoute, createPost)
router.delete("/delete/:id", protectedRoute, deletePost)
router.put("/update/:id", protectedRoute, updatePost)
router.post('/likes/:id', protectedRoute, likeUnlikePost)
router.post("/comments/:id", protectedRoute, commentOnPost)
router.get("/all", protectedRoute, gettAllPosts )
router.get("/:id", protectedRoute, detailPost )

export default router