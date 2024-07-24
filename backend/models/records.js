const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Number,
        required : true,
        default: 0
    }
})

const RecordModel = mongoose.model("records",recordSchema);
module.exports = RecordModel;