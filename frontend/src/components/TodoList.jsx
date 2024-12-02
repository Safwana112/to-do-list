import { AiOutlineDeleteColumn } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const TodoList = () => {

  const [todo, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ _id: null, message: '' });

  const getAllTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todolist/getall');
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  // the  useEffect hook is an essential part of this react component. it is used to perform side effects in functional components, ssuch as fetching data, subscribing to events, or manually updating the DOM.

  // IN THIS COMPONENT, the useEffect is used to fetch the inital list of to-dos from the backend when the component is first rendered

  // in this case, getAllTodos() is called inside this function to fetch the list of to-dos.

  // the empty array ([]) is the dependancy array.
  // it specifies when the effect should re-run.
  // an empty array means the effect will run only once after the initial render of the components.
  // if dependencies are added (e.g. [todos]), the effect will run every time those dependancies change.

  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:5000/todolist/deleteToDo/${id}`);
      if (result.data.success === 'deleted') {
        toast.success('Todo deleted successfully');
        getAllTodos();
      }
    } catch (error) {
      console.error(error);
      toast.error('failed to delete todo.');
    }
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, message: e.target.value });
  };

  // {...currentTodo} means "create a new object and copy all prpoerties of currentTodo into it"
  // example workflow
  // initial state:

  // isEditing = false
  // currentTodo = {_id: null, message:""}
  // the user is not editing any to-do yet.

  // user clicks the edit button for a ToDo: let's say the user clicks the edit button for the to-do:

  // {_id: '123', message: 'buy groceries'}
  // handleEdit is called:

  // handleEdit({_id: '123', message: 'buy groceries'});
  // setIsEditing(true) changes isEditing to true.
  // setCurrentTodo({_id: '123', message: 'buy groceries'}) updates currentTodo to:

  // {_id: '123', message:'buy groceries'}
  // UI updates:

  // the component detects isEditing = true and switches to the edit view.
  // the input field is pre-filled with the text "buy groceries" from currentTodo.message

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ _id: todo._id, message: todo.message });
  };

  const handleUpdate = async () => {
    // validate the message before updating
    if (currentTodo.message.length < 4 || currentTodo.message.length > 20) {
      toast.error('message must be between 4 tp 2o charachetrs.');
      return;
      // block th eupdate if validation fails
    }
    try {
      const result = await axios.put(`http://localhost:5000/todolist/updateToDo/${currentTodo._id}`, {
        message: currentTodo.message
      });
      if (result.data.success === 'updated') {

        toast.success('Todo updated successfully!');
        getAllTodos();
        setIsEditing(false);
        setCurrentTodo({ _id: null, message: '' });
      }
    } catch (error) {
      console.error(error);
      toast.error('failed to update todo.')
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentTodo({ _id: null, message: '' });
  };

  return (
    <div className="text">
      {isEditing ? (
        <div>
          <input type="text" value={currentTodo.message}
            onChange={handleEditInputChange} />

          <button onClick={handleUpdate}>UPDATE</button>
          <button onClick={handleCancelEdit}>cancel</button>

        </div>
      ) : (
        <ul>
          {todo.map((todo) => (
            <li key={todo._id}>
              {todo.message}
              <AiFillEdit className="icon"
                onClick={() => handleEdit(todo)} />

              <AiOutlineDeleteColumn className="icon" onClick={() =>
                handleDelete(todo._id)
              } />
            </li>
          ))}
        </ul>

      )}
    </div>
  )
};;
export default TodoList
