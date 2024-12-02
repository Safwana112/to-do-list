// 3eT6xALKGST95gD8

const mongoose = require("mongoose")

// mongodb+srv:safwanak708:<db_password>@clusterconst express = require('express') ;
// const { default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        minLength: 4,
        maxLength:20,
    }
})
const Todo = mongoose.model('todo', todoSchema)
module.exports=Todo