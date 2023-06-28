//SETTING UP THE SERVER 
import express from "express";
import * as dotenv from "dotenv";
// dotenv used for securing sensitive data
import cors from "cors";
// cors- cross origin requests use for the connection between the client(React) and the backend(node js server)
//importing other module containing routes:
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";


//importing the connecting function used to connect with the mongodb database:-
import connectDB from "./mongodb/connect.js";

//configuring our dotenv file
dotenv.config();
//initiating the express 'app' instance
const app = express();

//using certain middleware to utilize the cors module and parse json data:-
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use("/api/v1/post",postRoutes);
app.use("/api/v1/dalle",dalleRoutes);



const startServer = ()=>{
    try {
        connectDB(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
    }
    app.listen(8080,()=>{
        console.log("Server started on port 8080 !!")
    })
}



startServer();