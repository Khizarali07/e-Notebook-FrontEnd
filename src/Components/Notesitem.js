import defaultImg from './Media/default_img.png'

export default function Notesitem({features,image,title,description,date,style1,style2,style3,style4}) {

  function getFormattedDate(milliseconds) {
    const date = new Date(milliseconds); // Create a Date object from milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Zero-pad month (0-indexed)
    const day = String(date.getDate()).padStart(2, '0'); // Zero-pad day
  
    return `${year}-${month}-${day}`;
  }

  return (
    <>
    
    <div className="card" style={style1}>
    <div className="card-header text-center" style={{height:"5vh",fontSize:"1.3vw"}}>{features}</div>

  <img src={image===null?defaultImg:image} className="card-img-top mx-auto d-block" alt="Note img" style={style2}/>
  <div className="card-body">
    <h5 className="card-title" style={style3} >{title.length>=140?<p>{title} .....</p>:title}</h5>
    <p className="card-text" style={style4}>{description.length>=180?<p>{description} .....</p>:description}</p>
  </div>
  <div className="card-footer text-body-secondary text-center">
    <p className='d-inline lead me-2' style={{height:"5vh",fontSize:"1.3vw"}}>Date :</p>
    {getFormattedDate(date)}
  </div>
</div>

    </>
  )
}
