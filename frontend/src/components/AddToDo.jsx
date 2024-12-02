
import { useState } from "react";
import axios from "axios"
import { toast } from "react-toastify";

const AddToDo = () => {
const [message, setMessage] = useState("");

const createToDo = async()=>{
    // validate message
    if(message===''){
        toast.error('cannot add an empty message');
        return;
    }
    if(message.length <4 || message.length >20){
toast.error('message must be between 4 to 2o characters');
return;
    }
    try {
        const response= await axios.post('http://localhost:5000/todolist/', {
            message: message,
        });
        if(response.data.success=== 'created'){
            window.location.reload();
        }
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className="container">
      {/* input for message */}
      <input type="text" placeholder="add task here" onChange={(e)  => setMessage(e.target.value)} />

      {/* addd button */}
      <button onClick={createToDo} className="btn">ADD</button>
      
    </div>
  );
}

export default AddToDo
