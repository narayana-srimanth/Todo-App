import React, { useState } from 'react';
import "../css/MyForm.css";
import axios from 'axios';

function MyForm(props) {
  const [count, setCount] = useState(3);

  const validateForm = (e) => {
    e.preventDefault();
    const title = document.forms["myForm"]["title"].value;
    const description = document.forms["myForm"]["description"].value;

    if (title === "" || description === "") {
      alert("Title and description must be filled out");
      return false;
    } else {
      setCount(prevCount => {
        const newCount = prevCount + 1;
        alert(newCount); // Alert the updated count
        props.onAdd(newCount, title, description); // Pass the updated count to the onAdd function

        axios.post('http://localhost:3001/createRecord', {
          title: title, // Use the title value from the form
          description: description, // Use the description value from the form
          isCompleted: 0 // Always set isCompleted to 0
        })
        .then(response => {
          console.log(response.data);
          // Optionally handle the response data, e.g., updating the records state in the parent component
        })
        .catch(error => {
          console.log(error);
        });

        return newCount; // Return the updated count
      });
    }
  };

  return (
    <form className="flex" id="myForm" action="/" onSubmit={validateForm}>
      <div className="inputitem">
        <label htmlFor="title"><b>Title:</b></label><br/>
        <input 
          type="text" 
          id="title" 
          className="inp" 
          placeholder="What's the title of your to-do?" 
          name="title"
        /><br/>
      </div>
      <div className="inputitem">
        <label htmlFor="description"><b>Description:</b></label><br/>
        <input 
          type="text" 
          id="description" 
          className="inp" 
          placeholder="What's the description of your to-do?" 
          name="description"
        />
      </div>
      <input type="submit" value="add" className="btn"/>
    </form>
  );
}

export default MyForm;
