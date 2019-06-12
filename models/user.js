const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    superadmin: {
        type: Boolean,
        default: false
    }
})

const User = module.exports = mongoose.model('User', UserSchema);