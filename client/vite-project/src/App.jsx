import React from 'react';

// EXPLANATION OF { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
// BrowserRouter component from "react-router-dom" helps in connecting any path specified inside its
// opening and closing brackets to the browser url
// for e.g for the code :  <BrowserRouter><Link to"/"><img src=..></Link></BrowserRouter> 
// whenever the user clicks on the img specified in between the <Link></Link> the 'to' attribute is triggered
// which takes the user to the path https://browser_url + "/" -> ("path specified in the 'to' property of <Link>") 
// all the <Route /> with their 'path' and 'element' properties/attributes are listed in between the 
// <Routes></Routes> element from the react-router-dom

import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';
import { logo } from "./assets";
import { Home,CreatePost } from './pages/index';

const App = () => {
  return (
    <BrowserRouter>
    
    {/* creating the navbar */}
    
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      
      <Link to='/'>
      {/* if user clicks on this image then user gets redirected to the =>( browserurl + "/" ) route */}
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      
      <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
      {/* if user clicks on this Create 'button' then user gets redirected to the =>( browserurl + "/create-post" ) route */}
      Create
      </Link>

    </header>

    <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
    
    <Routes>
    {/* whenever the user is on the home route "/" the <Home /> component will get rendered */}
      <Route path="/" element={<Home />} />
    {/* whenever the user is on the "/create-post" route the <CreatePost /> component will get rendered */}
      <Route path="/create-post" element={<CreatePost />} />
    </Routes>
    
    </main>
    
    </BrowserRouter>
  )
}

export default App