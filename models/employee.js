const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Address Schema
let AddressScheme = new Schema({
    houseNumber: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pin: {
        type: Number
    }
})

//Dept Schema
let DeptSchema = new Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    region: {
        type: String,
        required: true,
        lowercase: true
    }
})

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
    salary: {
        type: Number
    },
    gender: {
        type: String, 
        required: true
    },
    dept: DeptSchema,
    dob: {
        type: Date
    },
    doj: {
        type: Date
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }
});

module.exports = {
    Employee: mongoose.model('Employee', EmployeeSchema),
    Dept: mongoose.model('Dept', DeptSchema),
    Address: mongoose.model('Address', AddressScheme)
}