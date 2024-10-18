import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const response = await fetch(
      "https://e-notebook-backend-production.up.railway.app/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = response.json();

    data.then((result) => {
      alert(result);
      if (result === "Login Successfully !!!") {
        navigate("/");
      }
    });
  };

  return (
    <>
      <h3 className="text-center mt-4">Login to access E-NoteBook features</h3>

      <form
        className="container d-flex justify-content-center"
        onSubmit={handleSubmit}
      >
        <fieldset
          className="rounded-5 bg-primary"
          style={{ height: "70vh", width: "50vw" }}
        >
          <div
            className="mt-3 mb-3 d-flex flex-column"
            style={{ alignItems: "center" }}
          >
            <label htmlFor="exampleFormControlInput1" className="form-label ">
              Email address
            </label>
            <input
              type="email"
              className="form-control rounded-3"
              id="exampleFormControlInput1"
              style={{ width: "35vw" }}
              value={email}
              onChange={(evt) => setemail(evt.target.value)}
              placeholder="name@example.com"
            />
          </div>

          <div
            className="mb-3 d-flex flex-column"
            style={{ alignItems: "center" }}
          >
            <label htmlFor="exampleFormControlpassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              id="exampleFormControlpassword"
              style={{ width: "35vw" }}
              value={password}
              onChange={(evt) => setpassword(evt.target.value)}
            />
          </div>

          <div
            className="mb-4 d-flex flex-column"
            style={{ alignItems: "center" }}
          >
            <input
              type="submit"
              className="form-control bg-danger text-white"
              style={{ width: "35vw" }}
            />
          </div>
        </fieldset>
      </form>
    </>
  );
}
