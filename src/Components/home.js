import React, { useEffect, useState } from "react";
import Notesitem from "./Notesitem";
import { Link } from "react-router-dom";

function Home( {setProgress, userLogin }) {
  let [data, setdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [_id, set_id] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");

  const [email,setemail] = useState("");


  let sty1 = { width: "22vw", height: "35vh", overflow: "auto" };
  let sty2 = { width: "8vw", height: "12vh" };
  let sty3 = { fontSize: "2.2vw" };
  let sty4 = { fontSize: "1.8vw" };

  const editnotes = (evt) => {
    set_id(evt._id);
    setTitle(evt.title);
    setDesc(evt.desc);
    setDate(evt.date);
  };

  const handleedits = async (evt) => {
    evt.preventDefault();

    await fetch("http://localhost:5000/api/editingnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, title, desc, date }),
    });
  };

  const deletenote = (evt) => {
    set_id(evt._id);
  };

  const handledelete = async (evt) => {
    evt.preventDefault();

    await fetch("http://localhost:5000/api/deletingnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id }),
    });
  };

  const reload = () => {
    window.location.reload();
  };

  const fetchallnotes = async () => {
    setProgress(0);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/fetchnote", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setdata(await response.json());
    
      setProgress(60);
    } catch (error) {
      console.error("Error fetching notes:", error);
      // Handle the error appropriately
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
    setProgress(100);
  };

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

  useEffect(() => {
    fetchallnotes();
    handleauth();
    // eslint-disable-next-line
  }, []);

  return (
    <>
    
      {data.length <= 0 && email===""?
      
      <div className="container-fluid row my-4" style={{ height: "80vh", overflow: "auto" }} id="one" >
      <h3>This is your Digital Notebook Where you can save all your information and notes safely</h3>
      <h5 style={{width:"28vw",position:"absolute",left:"45vw",top:"42vh"}}>Click Here to Sign In</h5> 
      <Link to="/signIn" className="btn btn-danger text-center mt-5" style={{width:"14vw",height:"6vh",position:"absolute",left:"47vw",top:"47vh"}}>Sign In</Link></div>
      
      :
      <div
        className="container-fluid row my-4"
        style={{ height: "80vh", overflow: "auto" }}
        id="one"
      >{data.length<=0? 
        <div>
      <h4 style={{width:"19vw",height:"6vh",position:"absolute",left:"42vw",top:"42vh"}}>No Available Notes</h4>
      <Link to="/addingnotes" className="btn btn-danger text-center" style={{width:"10vw",height:"6vh",position:"absolute",left:"45vw",top:"48vh"}}>Add Notes</Link></div>
      :
      <h2>Your Notes :</h2>}

        {isLoading === true ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-danger"></div>Loading ...
          </div>
        ) : (
          data.map((element) => (
            <div className="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 col-xxl-3 mb-4">
              <Notesitem
                features={
                  <>
                    <i
                      class="fa-solid fa-pen-to-square me-3"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal1"
                      onClick={() => editnotes(element)}
                    ></i>
                    <div class="modal" tabindex="-1" id="exampleModal1">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Updating Notes</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <form className="d-flex flex-column justify-content-center align-item-center">
                              <input
                                type="text"
                                value={title}
                                onChange={(evt) => setTitle(evt.target.value)}
                              />
                              <textarea
                                type="text"
                                value={desc}
                                onChange={(evt) => setDesc(evt.target.value)}
                                style={{ height: "40vh" }}
                              />
                              <input
                                type="date"
                                value={date}
                                onChange={(evt) => setDate(evt.target.value)}
                              />
                            </form>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={reload}
                              onMouseDown={handleedits}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <i
                      class="fa-solid fa-trash me-3"
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                      onClick={() => deletenote(element)}
                    ></i>

                    <div class="modal" tabindex="-1" id="exampleModal2">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Deleting Notes</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <p>Do you really want to delete this notes ?</p>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              onClick={reload}
                              onMouseDown={handledelete}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <i
                      class="fa-solid fa-eye"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal3"
                      onClick={() => editnotes(element)}
                      style={{ cursor: "pointer" }}
                    ></i>

                    <div class="modal" tabindex="-1" id="exampleModal3">
                      <div class="modal-dialog modal-fullscreen">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Reading Notes</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <h2>{title}</h2>
                            <p>{desc}</p>
                            <p>{date}</p>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                }
                image={element.imageUrl}
                key={element._id}
                title={element.title}
                description={element.desc}
                date={element.date}
                style1={sty1}
                style2={sty2}
                style3={sty3}
                style4={sty4}
              />
            </div>
          ))
        )}
      </div>
      }

    </>
  );
}

export default Home;
