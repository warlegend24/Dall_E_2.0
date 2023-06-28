import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";


dotenv.config();


const router = express.Router();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

//GET ALL POSTS

router.route("/").get(async(req,res)=>{
    try {
        //retrieving all the posts from the database:-
        const posts = await Post.find({});

        res.status(200).json({success:true,data:posts});
        
    } catch (error) {
        res.status(500).json({success:false,message:error});
    }
});


//CREATE A POST
//if the user after generating a image clicks on the  'submit it to the community' button
//then first we need to upload that image to the cloudinary cloud image storing api and then
//retrieve the optimised image url from the cloudinary and using that optimised url
//create a new post document and store it in the database:-

router.route("/").post(async (req,res)=>{
    try {
        //we destructure the upcoming data inside the body of the req:-
        const {name,prompt,photo} = req.body ;
        //now we upload the 'photo' retrieved from teh req.body to the cloudinary cloud database:-
        const photoUrl = await cloudinary.uploader.upload(photo);
        //and we recieve the optimised url or the url through which we can retrieve the image from the cloudinary cloud db

        //now creating a new post 
        const newPost = await Post.create({
            name,
            prompt,
            photo:photoUrl.url,
        });

        res.status(201).json({success:true,data:newPost});
        
    } catch (error) {
        res.status(500).json({success:false,message:error});
        
    }
});




export default router;