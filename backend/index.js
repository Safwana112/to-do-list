require('dotenv').config();
const express = require('express') ;
const RunServer = require("./Database/connection");
const cors = require('cors') ;
const ToDoRouter = require('./Routes/todoRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())

RunServer()
app.use('/todolist', ToDoRouter);

app.listen(port, ()=>{
    console.log(`server is running on ${port}port!`)
})