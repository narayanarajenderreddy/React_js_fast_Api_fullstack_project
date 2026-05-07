import {useEffect} from "react";
import {useParams} from "react-router-dom";

import {DndContext} from "@dnd-kit/core";

import useTaskStore from "../store/taskStore";

import TaskForm from "../components/TaskForm";
import KanbanColumn from "../components/KanbanColumn";


function TasksPage(){

const {projectId} = useParams();

const fetchTasks = useTaskStore(
 state => state.fetchTasks
);

const tasks = useTaskStore(
 state => state.tasks
);

const updateTask = useTaskStore(
 state => state.updateTask
);


useEffect(()=>{
 fetchTasks(projectId);
},[projectId]);


const todoTasks = tasks.filter(
 task => task.status === "todo"
);

const inProgressTasks = tasks.filter(
 task => task.status === "in_progress"
);

const doneTasks = tasks.filter(
 task => task.status === "done"
);


const handleDragEnd = async(event)=>{

 const {active,over} = event;

 if(!over) return;

 const taskId = active.id;

 const newStatus = over.id;

 const task = tasks.find(
   task => task.id === taskId
 );

 if(!task) return;


 await updateTask(
   taskId,
   {
     title: task.title,
     description: task.description,
     status: newStatus
   },
   Number(projectId)
 );

};


return(

<DndContext onDragEnd={handleDragEnd}>

<div>

<h2>Kanban Board</h2>

<TaskForm projectId={projectId}/>

<div
style={{
 display:"flex",
 gap:"20px",
 marginTop:"20px"
}}
>

<KanbanColumn
 title="Todo"
 tasks={todoTasks}
/>

<KanbanColumn
 title="In Progress"
 tasks={inProgressTasks}
/>

<KanbanColumn
 title="Done"
 tasks={doneTasks}
/>

</div>

</div>

</DndContext>

)

}

export default TasksPage;