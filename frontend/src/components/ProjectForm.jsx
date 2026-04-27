import {useState} from "react";
import useProjectStore from "../store/projectStore";


function ProjectForm(){

const [name,setName]=useState("");
const [description,setDescription]=useState("");

const addProject=
useProjectStore(
 state=>state.addProject
);


const handleSubmit=async(e)=>{
e.preventDefault();

await addProject({
 name,
 description
});

setName("");
setDescription("");

};


return(
<form onSubmit={handleSubmit}>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Project name"
/>


<input
value={description}
onChange={(e)=>setDescription(e.target.value)}
placeholder="Description"
/>

<button>Create Project</button>

</form>
)

}

export default ProjectForm;