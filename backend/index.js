const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RecordModel = require('./models/records')
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://narayana:narayana1234@cluster0.hxi1z44.mongodb.net/ToDo?retryWrites=true&w=majority&appName=Cluster0")

app.get("/getRecords",(req,res)=>{ //rendering records which are not completed
    RecordModel.find({isCompleted: 0 }).then(function(records){
        res.json(records)
    }).catch(function(err){
        res.json(err)
    }
    )
})

app.get("/getCompletedRecords", (req, res) => {
    RecordModel.find({ isCompleted: 1 }).then(function(records) {
        res.json(records);
    }).catch(function(err) {
        res.json(err);
    });
});
app.post("/createRecord", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }

        const newRecord = new RecordModel({
            title,
            description,
            isCompleted: 0 // Ensure isCompleted is always set to 0 for new records
        });
        const savedRecord = await newRecord.save();
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the record." });
    }
});


app.delete("/deleteRecord", async (req, res) => {
    try {
        console.log(req);
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required." });
        }

        const deletedRecord = await RecordModel.findOneAndDelete({ title });

        if (!deletedRecord) {
            return res.status(404).json({ error: "Record not found." });
        }

        res.status(200).json({ message: "Record deleted successfully.", deletedRecord });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the record." });
    }
});

app.put("/completeRecord", async (req,res)=>{
    try{
        const {title} = req.body;
        if(!title){
            return res.status(400).json({ error: "Title is required." });
        }
        const updatedRecord = await RecordModel.findOneAndUpdate(
            { title }, // The query to find the document
            { isCompleted: 1 }, // The update to be performed
            { new: true } // Option to return the modified document
        );
        if (!updatedRecord) {
            return res.status(404).json({ error: "Record not found." });
        }
        res.status(200).json({ message: "Record updated successfully.", updatedRecord });
    } catch(error){
        res.status(500).json({ error: "An error occurred while deleting the record." });
    }
});


app.listen(3001,()=>{
    console.log(`server running on port 3001`);
})