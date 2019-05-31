const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Employee Schema
let EmployeeSchema = new Schema({
    name: {
        type: String,
        required: true, 
        max: 100
    },
    age: {
        type: Number, 
        required: true
    },
    gender: {
        type: String, 
        required: true
    },
});


module.exports = mongoose.model('Employee', EmployeeSchema);