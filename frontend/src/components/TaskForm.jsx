import {useState} from "react";
import useTaskStore from "../store/taskStore";

function TaskForm({projectId}){

const [title,setTitle]=useState("");
const [description,setDescription]=useState("");

const addTask = useTaskStore(state=>state.addTask);


const handleSubmit = async (e)=>{
 e.preventDefault();

 await addTask({
   title,
   description,
   project_id: Number(projectId)
 });

 setTitle("");
 setDescription("");
};



return(
<form onSubmit={handleSubmit}>

<input
 value={title}
 onChange={(e)=>setTitle(e.target.value)}
 placeholder="Task title"
/>

<input
 value={description}
 onChange={(e)=>setDescription(e.target.value)}
 placeholder="Task description"
/>

<button>Add Task</button>

</form>
);

}

export default TaskForm;