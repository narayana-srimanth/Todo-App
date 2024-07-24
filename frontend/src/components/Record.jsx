import React from "react";
import redbin from "../images/redbin.png";
import tick from "../images/tick.jpg";
import "../css/record.css";
//import records from "../records";
function Record(props){
  function deleteRecord(recordtitle){
    props.onDelete(recordtitle);
  }
  function tickRecord(recordtitle){
    props.onTick(recordtitle);
  }
    return(
        <div className="todolist-item">
        <div className="task-details">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
        </div>
        <div className="task-actions">
          <button className="action-btn" onClick={()=>deleteRecord(props.title)}>
            <img className="image" src={redbin} alt="Delete" />
          </button>
          <button className="action-btn" onClick = {()=>{tickRecord(props.title)}}>
            <img className="image" src={tick} alt="Complete" />
          </button>
        </div>
      </div>
    );
}

export default Record;