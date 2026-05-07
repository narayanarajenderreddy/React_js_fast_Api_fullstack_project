import useProjectStore from "../store/projectStore";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


function ProjectList(){
const navigate = useNavigate();
const {user} = useContext(AuthContext);

const projects=
useProjectStore(
 state=>state.projects
);

const deleteProject=
useProjectStore(
 state=>state.deleteProject
);

const updateProject = useProjectStore(state => state.updateProject);

const [editingid,setEditingId] = useState(null);
const[editname,setEditName] = useState("");
const[editdescription,SetEditDescription] = useState("");

const startEdit = (project) => {

    setEditName(project.name);
    setEditingId(project.id);
    SetEditDescription(project.description);

}

const handleUpdate=async()=>{

await updateProject(
 editingid,
 {
   name:editname,
   description:editdescription
 }
);

setEditingId(null);

};


return(

<div>

{projects.map(project=>(

<div key={project.id}>

{editingid===project.id ? (

<>

<input
value={editname}
onChange={(e)=>
setEditName(e.target.value)
}
/>

<input
value={editdescription}
onChange={(e)=>
SetEditDescription(e.target.value)
}
/>

<button onClick={handleUpdate}>
Save
</button>

</>

):(

<>

<h3>{project.name}</h3>

<p>{project.description}</p>

<button
onClick={()=>startEdit(project)}
>
Edit
</button>

{user?.role === "admin" && (

<button
onClick={()=>
 deleteProject(project.id)
}
>
Delete
</button>

)}

<button
onClick={() =>
 navigate(`/projects/${project.id}/tasks`)
}
>
View Tasks
</button>

</>

)}

</div>

))}

</div>

)

}

export default ProjectList;