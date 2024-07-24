import React from "react";
import "../css/box.css";
import MyForm from "./MyForm";
import Options from "./Options";
import Record from "./Record";
//import records from "../records";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
function Box(){




    // let recordsArray = [
    //     {id: 1,title : "task1",description : "this is task1",isCompleted : 0},
    //     {id: 2,title : "task2",description : "this is task2",isCompleted : 0},
    //     {id: 3,title : "task3",description : "this is task3",isCompleted : 0}
    // ];

    //let recordsArray = [];
    let [records, setRecords] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/getRecords')
        .then((recordsn)=>{
            console.log(recordsn)
            setRecords(recordsn.data)
        }).catch((err)=>{
            console.log(err);
        })
    },[])
    function handleDelete(recordTitle){
        //const updatedRecords = records.filter(record => record.id !== recordId);
        // You might want to set the state here if you're using state to manage records
        //console.log(updatedRecords); // Just to verify the filtering
        axios.delete('http://localhost:3001/deleteRecord', { data: { title: recordTitle } })
        .then(response => {
          console.log(response.data);
          alert("Record deleted successfully");
          // Remove the deleted record from the state
          setRecords(records.filter(record => record.title !== recordTitle));
        })
        .catch(error => {
          console.error('Error deleting record:', error);
          alert("An error occurred while deleting the record");
        });

    }
    function handleAdd(nid,ntitle,ndescription){
        const newRecord = {
            id: nid,
            title: ntitle,
            description: ndescription,
            isCompleted : 0
        };
        alert("ready to set state");
        // Update the records array with the new object
        //console.log("hi");
        //console.log(records);
        
        alert(records);
        // setRecords(prevRecords => {
        //     //console.log('Previous records:', prevRecords);
        //     let newarr = [...prevRecords, newRecord];
        //     console.log('New array:', newarr);
        //     alert(newarr);
        //     return newarr;
        // });
        //setRecords([...records,newRecord]);
        setRecords(prevRecords => [...prevRecords, newRecord]); // Create a new array with spread operator
        // setRecords((prevRecords) => {
        //     const updatedRecords = prevRecords.slice(); // Create a copy
        //     updatedRecords.push(newRecord); // Add the new record
        //     return updatedRecords;
        //   });

    }
    const handleTick = (recordTitle)=>{
        // axios.put('http://localhost:3001/completeRecord',{title : recordTitle})
        // .then((response)=>{
        //     setRecords(records.map((record)=>{
        //         record.title === recordTitle ? {...record,isCompleted:1} : record
        //     }));
        // }).catch(err =>{
        //     alert("error occured in handleTick function of Box.jsx");
        // });
        axios.put('http://localhost:3001/completeRecord', { title: recordTitle })
        .then(response => {
          //console.log(response.data);
          //alert("Record marked as completed");
          // Update the record in the state
          setRecords(records.map(record =>
            record.title === recordTitle ? { ...record, isCompleted: 1 } : record
          ));
        })
        .catch(error => {
          console.error('Error updating record:', error);
          alert("An error occurred while updating the record");
        });

    };


    function displayRecord(record){
        return(<Record
        key = {record.id}
        id = {record.id}
        title = {record.title}
        description = {record.description}
        onDelete = {handleDelete}
        onTick = {handleTick}
        />);
    }
    function renderCompletedRecords(){
        axios.get('http://localhost:3001/getCompletedRecords')
        .then((recordsn)=>{
            console.log(recordsn)
            setRecords(recordsn.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
    function renderNonCompletedRecords(){
        axios.get('http://localhost:3001/getRecords')
        .then((recordsn)=>{
            console.log(recordsn)
            setRecords(recordsn.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div className="bl-box">
            <MyForm onAdd = {handleAdd}/>
            <hr></hr>
            <Options oncompletedclick = {renderCompletedRecords} ontodoclick = {renderNonCompletedRecords} />
            {/* <Record/> */}
            {records.map(displayRecord)}
        </div>
    );
}

export default Box;