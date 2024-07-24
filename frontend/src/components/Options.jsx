import React from "react";
import "../css/options.css"
function Options(props){
    const Todoclick = () => {
        // Implement the functionality for the To-Do button click here
        let x = document.getElementsByClassName("button1");
        let y = document.getElementsByClassName("button2");
      
        // console.log("To-Do clicked");
        // console.log("Button1 elements:", x);
        // console.log("Button2 elements:", y);
      
        if (x.length > 0) {
            for (let i = 0; i < x.length; i++) {
                x[i].style.backgroundColor = "#04AA6D"; // green
                props.ontodoclick();
            }
        } else {
            console.warn("No elements found with class 'button1'");
        }
      
        if (y.length > 0) {
            for (let i = 0; i < y.length; i++) {
                y[i].style.backgroundColor = "#353434"; // black
            }
        } else {
            console.warn("No elements found with class 'button2'");
        }
      };
    
      const Completedclick = () => {
        let x = document.getElementsByClassName("button1");
        let y = document.getElementsByClassName("button2");
      
        console.log("Completed clicked");
        console.log("Button1 elements:", x);
        console.log("Button2 elements:", y);
      
        if (x.length > 0) {
            for (let i = 0; i < x.length; i++) {
                x[i].style.backgroundColor = "#353434"; // black
            }
        } else {
            console.warn("No elements found with class 'button1'");
        }
      
        if (y.length > 0) {
            for (let i = 0; i < y.length; i++) {
                y[i].style.backgroundColor = "#04AA6D"; // green
                props.oncompletedclick();
            }
        } else {
            console.warn("No elements found with class 'button2'");
        }
      };
    
      return (
        <div>
          <button className="button button1" onClick={Todoclick}>To-Do</button>
          <button className="button button2" onClick={Completedclick}>Completed</button>
        </div>
      );
    
}


export default Options;