import express from 'express';
import dotenv from 'dotenv';
import connectToDb from './db/connectToDb.js';
import auhRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js'
import { v2 as cloudinary } from "cloudinary";
import postRoute from './routes/post.route.js'
// import cors from 'cors'

dotenv.config();
const app = express();
app.use(cookieParser());
const port = process.env.PORT;

//cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
    api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
    api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
  });

// Apply middleware before routes
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", auhRoutes);
app.use("/api/user", userRoute)
app.use("/api/post", postRoute)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDb();
});
