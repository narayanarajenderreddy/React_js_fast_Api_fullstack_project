import {useDroppable} from "@dnd-kit/core";

import TaskCard from "./TaskCard";


function KanbanColumn({title,tasks}){

const statusMap = {
 "Todo":"todo",
 "In Progress":"in_progress",
 "Done":"done"
};


const {setNodeRef} = useDroppable({
 id: statusMap[title]
});


return(

<div
ref={setNodeRef}
style={{
 border:"1px solid #ccc",
 width:"300px",
 minHeight:"400px",
 padding:"10px"
}}
>

<h3>{title}</h3>

{tasks.map(task => (

<TaskCard
 key={task.id}
 task={task}
/>

))}

</div>

)

}

export default KanbanColumn;