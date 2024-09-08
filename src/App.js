import Navbar from "./Components/Navbar";
import Home from "./Components/home";
import About from "./Components/About";
import Contact from "./Components/contact";
import Footer from "./Components/footer";
import AddingNote from "./Components/Addingnote";
import Signin from "./Components/signin";
import Signup from "./Components/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useState } from "react";

function App(user) {
  const [loadingbar,setloadingbar] = useState(0)
  

  const setProgress=(prog)=>{
    setloadingbar(prog);
  }

  return (
   <>
<BrowserRouter>

<Navbar />
<LoadingBar
        height={5}
        color='#ffffff'
        progress={loadingbar}
      />

    <Routes>
        <Route path="/" element={<Home setProgress={setProgress} userLogin="null" />} />
        <Route path="/addingnotes" element={<AddingNote/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signIn" element={<Signin />} />
        <Route path="/signUp" element={<Signup />} />
    </Routes>
  <Footer />
    </BrowserRouter>

    
   </>

  );
}

export default App;

