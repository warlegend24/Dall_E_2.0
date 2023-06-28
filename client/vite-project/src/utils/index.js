// we declare utility function in the utils folder which are essentially reusable functions acrros the react-app

//creating a utility function to produce and export a random prompt using the randomPrompts array from the "constants" file:
import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";


export function getRandomPrompt(previousPrompt){
    //we generate a randomIndex from 1 to 49 :-
    var randomIndex = Math.floor(Math.random()*surpriseMePrompts.length);
    //we retriev and store the random prompt
    var randomPrompt = surpriseMePrompts[randomIndex];

    if(previousPrompt===randomPrompt){
        return getRandomPrompt(randomPrompt);
    }

    return randomPrompt;
}

export async function downloadImage(_id,photo){
    FileSaver.saveAs(photo,`download-${_id}.jpg`);
}