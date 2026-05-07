import {useDraggable} from "@dnd-kit/core";


function TaskCard({task}){

const {
 attributes,
 listeners,
 setNodeRef,
 transform
} = useDraggable({
 id: task.id
});


const style = {
 transform: transform
   ? `translate(${transform.x}px, ${transform.y}px)`
   : undefined
};


return(

<div
ref={setNodeRef}
{...listeners}
{...attributes}
style={{
 border:"1px solid black",
 padding:"10px",
 marginBottom:"10px",
 background:"#f5f5f5",
 cursor:"grab",
 ...style
}}
>

<h4>{task.title}</h4>

<p>{task.description}</p>

<p>Status: {task.status}</p>

</div>

)

}

export default TaskCard;