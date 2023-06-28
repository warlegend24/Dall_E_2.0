import mongoose from "mongoose";

const connectDB = (url)=>{
    //this setting up of 'strictQuery' to true will help in the search operations through the database:- 
    mongoose.set("strictQuery",true);

    //now making connection to the database at the passed 'url' as a parameter:-
    mongoose.connect(url)
    .then(()=>{
        console.log("Database connected Successfully");
    })
    .catch((err)=>{
        console.log(err);
    });
}


export default connectDB;