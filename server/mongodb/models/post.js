import mongoose from "mongoose";


//creating a post schema 
const Post = new mongoose.Schema({
    name:{type:String,required:true},
    prompt:{type:String,required:true},
    photo:{type:String,required:true}
});
//creating a postmodel
const PostSchema = mongoose.model("Post",Post);

export default PostSchema;