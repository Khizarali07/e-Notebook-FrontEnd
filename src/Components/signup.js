import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate()
  const [name,setname] = useState("");
  const [username,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");


  const handleSubmit = async (evt) => {
    
    evt.preventDefault();

    const response = await fetch("http://localhost:5000/api/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });

    const data = response.json();

    data.then(result => {
      alert(result);
      if (result==="User registration successed !!!"){
        navigate("/signIn");
      }
    });
 
    
    
  };

  return (
    <>
    <h3 className='text-center mt-4'>Registration for E-NoteBook</h3>

    <form className='container d-flex justify-content-center' style={{fontWeight:"700"}} onSubmit={handleSubmit} autoComplete='off'>
      <fieldset className='rounded-5 bg-primary' style={{height:"70vh", width:"50vw"}}>

      <div class="mt-3 mb-3 d-flex flex-column" style={{alignItems:"center"}}>
  <label for="exampleFormControlInput1" class="form-label ">Full Name</label>
  <input type="text" class="form-control rounded-3" id="exampleFormControlInput1" style={{width:"35vw"}}
  value={name} onChange={(evt)=>setname(evt.target.value)} placeholder="Khizar Ali" required/>
</div>

<div class="mt-3 mb-3 d-flex flex-column" style={{alignItems:"center"}}>
  <label for="exampleFormControlInput1" class="form-label ">Username</label>
  <input type="text" class="form-control rounded-3" id="exampleFormControlInput1" style={{width:"35vw"}}
  value={username} onChange={(evt)=>setusername(evt.target.value)} placeholder="khizar2277" required/>
</div>
      
      <div class="mt-3 mb-3 d-flex flex-column" style={{alignItems:"center"}}>
  <label for="exampleFormControlInput1" class="form-label ">Email address</label>
  <input type="email" class="form-control rounded-3" id="exampleFormControlInput1" style={{width:"35vw"}}
  value={email} onChange={(evt)=>setemail(evt.target.value)} placeholder="name@example.com" required/>
</div>

<div class="mb-3 d-flex flex-column" style={{alignItems:"center"}}>
  <label for="exampleFormControlpassword" class="form-label">Password</label>
  <input type='password' class="form-control rounded-3" id="exampleFormControlpassword" style={{width:"35vw"}}
   value={password} onChange={(evt)=>setpassword(evt.target.value)} required/>
</div>

<div className="mb-4 d-flex flex-column" style={{alignItems:"center"}}>
              <input type="submit" className="form-control bg-danger text-white" style={{width:"35vw"}}/>
            </div>
            </fieldset>
    </form>

    </>
  )
}