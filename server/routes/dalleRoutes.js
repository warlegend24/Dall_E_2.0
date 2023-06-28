import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import Post from "../mongodb/models/post.js";


dotenv.config();


const router = express.Router();


const configuration = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req,res)=>{
    res.send("Hello from Dall-E !!");
})

router.route("/").post(async (req,res)=>{
    try {
        //doing js object destructuring to retrieve the prompt entered by the user:-
        const { prompt } = req.body;
        //we pass this prompt in the openai.createImage function as one of the properties and define other properties according to which we need the image:-
        //we store the response we get from the openai.createImage() function acc to our requirements in 'airesponse' variable
        const airesponse = await openai.createImage({
            prompt,
            n:1,
            size:"1024x1024",
            response_format:"b64_json"
        });
        //now after recieving the response we retrieve the image out of the airesponse:-
        const image = airesponse.data.data[0].b64_json;

        res.status(200).json({ photo : image });

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
})


export default router;
