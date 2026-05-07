import {useState} from "react";
import useTaskStore from "../store/taskStore";

function TaskList({projectId}){

const tasks = useTaskStore(state=>state.tasks);
const deleteTask = useTaskStore(state=>state.deleteTask);
const updateTask = useTaskStore(state=>state.updateTask);

const [editingId,setEditingId]=useState(null);
const [editTitle,setEditTitle]=useState("");
const [editDescription,setEditDescription]=useState("");
const [editStatus,setEditStatus]=useState("todo");


const startEdit = (task)=>{
 setEditingId(task.id);
 setEditTitle(task.title);
 setEditDescription(task.description);
 setEditStatus(task.status);
};

const handleUpdate = async ()=>{
 await updateTask(
   editingId,
   {
     title: editTitle,
     description: editDescription,
     status: editStatus
   },
   Number(projectId)
 );

 setEditingId(null);
};


return(
<div>

{tasks.map(task=>(

<div key={task.id} style={{border:"1px solid #ccc",margin:"10px",padding:"10px"}}>

{editingId === task.id ? (

<>

<input
 value={editTitle}
 onChange={(e)=>setEditTitle(e.target.value)}
/>

<input
 value={editDescription}
 onChange={(e)=>setEditDescription(e.target.value)}
/>

<select
 value={editStatus}
 onChange={(e)=>setEditStatus(e.target.value)}
>
<option value="todo">Todo</option>
<option value="in_progress">In Progress</option>
<option value="done">Done</option>
</select>

<button onClick={handleUpdate}>Save</button>

</>

) : (

<>

<h4>{task.title}</h4>
<p>{task.description}</p>
<p>Status: {task.status}</p>

<button onClick={()=>startEdit(task)}>Edit</button>

<button
 onClick={()=>
   deleteTask(task.id, Number(projectId))
 }
>
Delete
</button>

</>

)}

</div>

))}

</div>
);

}

export default TaskList;