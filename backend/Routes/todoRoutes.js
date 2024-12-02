const express = require('express')
const { getAllToDo, createToDo, updateToDo,  deletToDO } = require('../Controllers/todoCtrl')


const ToDoRouter = express.Router()
//get->read
//post->send/create
//put->update
//delete->delete
//http://localhost:5000/getall'
ToDoRouter.get('/getall',getAllToDo)
ToDoRouter.post('/',createToDo)
ToDoRouter.put('/updateToDo/:id',updateToDo)
ToDoRouter.delete('/deleteToDo/:id',deletToDO)

module.exports=ToDoRouter;