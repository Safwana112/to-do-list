import './App.css'
import React from 'react'
import Header from './components/Header';
import AddToDo from './components/AddToDo';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, } from 'react-toastify';
import TodoList from './components/ToDoList';


const App = () => {
  return (
    <div>
      <Header/>
      <AddToDo/>
      <TodoList/>
      <ToastContainer/>
      
    </div>
  )
}

export default App
