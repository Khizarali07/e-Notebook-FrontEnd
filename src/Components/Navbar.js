import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

  const [email,setemail] = useState("")

  const handlelogout = async (evt) => {
    setemail("");
  
     await fetch("http://localhost:5000/api/handlelogout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    handleauth();
  }
// eslint-disable-next-line
  const handleauth = async (evt) => {
   
    const response = await fetch("http://localhost:5000/api/handleauth", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const auth = await response.json();
    setemail(auth);
  }

  useEffect(()=>{
    handleauth();
    
  },[handleauth])
// eslint-disable-next-line

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ "backgroundColor": "yellowgreen" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            e-NoteBook
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/addingnotes">
                  Add Notes
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About-us
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact-us
                </Link>
              </li>
            </ul>
            
            
            {email!==""?
              <form className="d-flex" role="search">
        <Link className="btn btn-danger me-3" type="submit" to="/signIn" onClick={handlelogout}>Logout</Link>
      </form>
            :
            <form className="d-flex" role="search">
        <Link className="btn btn-danger me-3" type="submit" to="/signIn" >Sign in</Link>
        <Link className="btn btn-danger" type="submit" to="/signUp">Sign up</Link>
      </form>
}

          </div>
        </div>
      </nav>
    </>
  );
}
