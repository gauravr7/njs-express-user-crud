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
    dob: {
        type: Date,
        required: true
    },
    doj: {
        type: Date,
        required: true
    },
    address: {
        houseNumber: {
            type: Number, 
            required: true
        },
        city: {
            type: String, 
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pin: {
            type: Number, 
            required: true
        }
    }
});


module.exports = mongoose.model('Employee', EmployeeSchema);