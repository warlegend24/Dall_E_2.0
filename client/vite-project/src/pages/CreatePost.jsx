import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField,Loader } from '../components';

const CreatePost = () => {
  //using the useNavigate() react hook to navigate to the home site after the user has created a new post:-
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name:'',
    prompt:'',
    photo:''
  })
  //we use another state variable to keep track of the conncection with the AI image generator API
  // while we are waiting for the image to be generated
  const [generatingImage, setGeneratingImage] = useState(false);
  //another state variable to control the display of  <Loader /> component:-
  const [loading, setLoading] = useState(false);

  async function generateImage(){
    //this function makes the post request to the backend server passing the required data to retrieve an AI generated image from the openAI server thorugh the OpenAIApi 
    if(form.prompt){

      try {
        //if there is a non-empty prompt in the form i.e user has entered some 'searchtext' or clicked on the 'surprise me' button
        //then we set the generating image state variable to true indicating that we are currently fetching the image from openai server through our server using a openAIApi key
        setGeneratingImage(true);
        //we use the fetch hook to make a post request to the server at the url/route specified as a parameter and options{}as second parameter
        const response = await fetch('https://dall-e-2-0-l1dr.onrender.com/api/v1/dalle',{
          method:'POST',
          // the header interface/property helps the server understand which type of request it is dealing with
          headers:{'Content-Type':'application/json'},
          //this body is the data being passed to the server after converting it into string using json.stringify method:-
          body : JSON.stringify({prompt:form.prompt,}),
        })
        //after getting the response from the server after making the post request:-
        const data = await response.json();
        // we have the image data inside this data variable:-
        setForm({...form,photo: `data:image/jpeg;base64,${data.photo}`}); 

        
      } catch (error) {
        console.log(error);
        alert(error);
      }
      finally{
        //irregardless of whether an image was retrieved successfully or note we re-update the setgeneratingimage state variable to 
        // false again indicating either we successfully retrieved an image or an error occured while retrieving
        setGeneratingImage(false);
      }
    } 
    else{
      alert("Please enter a prompt !!");
        
    }

  }

  async function handleSubmit(event){
    
    event.preventDefault();

    if(form.prompt && form.photo){
      setLoading(true);
      try {
        //this function executes when the user clicks on the 'share it with the community' button 
        //then we make a post request with this form data using the fetch API to the "http://localhost:8080/api/v1/post/"
        //route where it gets catched by the router.route("/").post(async(req,res)=>{..}) and it uploads it on the cloudinary cloud db and finally save it on our database by creating and saving a new post corresponding to the form data and image url recieved from the cloudinary
        
        //storing the response in a const:-
        const response = await fetch("https://dall-e-2-0-l1dr.onrender.com/api/v1/post",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body : JSON.stringify({...form}),
        });
    
        await response.json();
        alert("Success!!");
        //if we recieve the response successfully then:-
        //then we navigate to the "/" route where all the posts will be displayed:-
        navigate("/");
        
      }
      catch (error) {
        //CATCH
      alert(error);
      console.log(error); 
        
      }
      finally{
        //FINALLY
      setLoading(false);

      }
    
      }
      else{
        alert("Please enter a valid prompt and generate an image before sharing !!") 
       }
               
    }
    
    
    

  
  function handleChange(event){
    //the 'name' and 'prompt' property of the 'form' state variable will be updated depending upon the (event.target.name) i.e which <FormField /> is being targetted is being updated  
    setForm({...form,[event.target.name]:event.target.value});

  }
  //this function will call/use the utility function used to generate a random prompt everytime user clicks
  // on the 'surprise me' button:-
  function handleSurpriseMe(){
    // we retrieve the random prompt by using the utility function imported from the utility folder
    // and pass the previous prompt as parameter to ensure we dont get the same prompt again and again:-
    const randomPrompt = getRandomPrompt(form.prompt);
    //and we update the "form" state variable by using the spread operator to not hinder with the precious stored proerties and value
    //and updating only the required property by specifying (property name) : new_value 
    setForm({...form,prompt:randomPrompt});

  }
  return (
    <section className='max-w-7xl mx-auto'>

    <div>
    <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
    <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>
    Create imaginative and visually stunning images generated through DALL-E AI
    </p>
    </div>

    <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
    <div className='flex flex-col gap-5'>
    <FormField 
      labelName="Your name"
      type="text"
      name="name"
      placeholder="John Doe"
      value={form.name}
      handleChange={handleChange}

    />
    <FormField 
      labelName="Prompt"
      type="text"
      name="prompt"
      placeholder="A man standing in front of a stargate to another dimension"
      value={form.prompt}
      handleChange={handleChange}
      // isSurpriseMe is a boolean indicating whether we need to display the "surprise me" button or not
      isSurpriseMe
      handleSurpriseMe={handleSurpriseMe}
    />

    {/* after the two form fields we show the result image corresponding to the searchText or otherwise we show a preview image */}
    <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
      
      {form.photo ? <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' /> : <img src={preview} alt="Preview" className='w-9/12 h-9/12 object-contain opacity-40' />}
      
      {/* if the image is being generated/processing is going on until then we show the loading animation */}
      
      {generatingImage && 
      <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
        <Loader />
      </div>
      }
    </div>

    </div>

    {/* creating a generate button to generate the image corresponding to the entered searchText */}

    <div className='mt-5 flex gap-5'>
      <button
      type='button'
      onClick={generateImage}
      className='w-full text-white bg-green-700 font-medium rounded-md text-sm sm:w-auto px-5 py-2.5 text-center'
      >
      {/* if the image is being processed/being generated then we display on the button 'generating' otherwise 'generated' */}
        {generatingImage ? "Generating..." : "Generate"}
      </button>
    </div>

    <div className='mt-10'>
      <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image you wanted, you can also share it with the community.</p>
      <button
      type="submit"
      className='mt-3 text-white rounded-md bg-[#6469ff] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
      >{loading? "Sharing..." : "Share with the community"}</button>
    </div>  


    </form>
    
    </section>
  )
}

export default CreatePost