import React, { useEffect, useState } from "react";
import Notesitem from "./Notesitem";

export default function AddingNote({ setProgress }) {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(Date);
  const [imageUrl, setImageUrl] = useState("");

  const [email,setemail] = useState("");


  let sty1 = { width: "40vw", height: "70vh" };
  let sty2 = { width: "16vw", height: "24vh" };
  let sty3 = { fontSize: "1.3vw" };
  let sty4 = { fontSize: "1vw" };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImg(file);
  };

  useEffect(() => {
    if (img) {
      const reader = new FileReader();
      reader.onload = (e) => setImageUrl(e.target.result);
      reader.readAsDataURL(img);
    } else {
      setImageUrl(null);
    }
  }, [img]);

  const handleSubmit = async (evt) => {
    if (email!==""){
    evt.preventDefault();

    alert("Your Notes added Successfully");
    await fetch("http://localhost:5000/api/addingnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imageUrl, title, desc, date }),
    });
  }
  else {
    alert("Please login first to add notes !!!");
  }
  };

  const handleauth = async (evt) => {
    console.log("it is not running")
   
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
  },[])

  return (
    <>
      <div className="d-flex">
        <form
          className="container m-0 mt-3"
          style={{ width: "50%", height: "70vh", fontSize: "1vw" }}
          onSubmit={handleSubmit}
        >
          <legend className="text-center">Add a Note</legend>
          <fieldset>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                Add an image for your notes
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder=""
                value={title}
                onChange={(evt) => {
                  setTitle(evt.target.value);
                }}
                required
              />
              <label htmlFor="floatingInput">Title</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="floatingPassword"
                placeholder=""
                style={{ height: "28vh", resize: "none" }}
                value={desc}
                onChange={(evt) => {
                  setDesc(evt.target.value);
                }}
                required
              />
              <label htmlFor="floatingPassword">Description</label>
            </div>

            <div className="mb-0">
              <input
                type="Date"
                className="form-date ms-2 mb-2"
                value={date}
                onChange={(evt) => {
                  setDate(evt.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <input type="submit" className="form-control" />
            </div>
          </fieldset>
        </form>

        <div
          className="container border-start border-5 m-0 mt-3 d-flex flex-column align-content-center"
          style={{ width: "50%", alignItems: "center" }}
        >
          <h3 className="text-center">Preview</h3>
          <Notesitem
            features="Features"
            image={imageUrl}
            title={title.slice(0, 140)}
            description={desc.slice(0, 180)}
            date={date}
            style1={sty1}
            style2={sty2}
            style3={sty3}
            style4={sty4}
          />
        </div>
      </div>
    </>
  );
}
