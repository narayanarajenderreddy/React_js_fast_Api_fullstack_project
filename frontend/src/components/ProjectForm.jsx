import {useState,useContext} from "react";

import useProjectStore from "../store/projectStore";

import {AuthContext} from "../context/AuthContext";


function ProjectForm(){

const [name,setName] = useState("");
const [description,setDescription] = useState("");

const addProject = useProjectStore(
 state => state.addProject
);

const {user} = useContext(AuthContext);
console.log("user details",user);


const handleSubmit = async(e)=>{
 e.preventDefault();

 await addProject({
   name,
   description
 });

 setName("");
 setDescription("");
};


if(user?.role !== "admin"){
 return null;
}


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
 placeholder="Project description"
/>

<button type="submit">
 Create Project
</button>

</form>

)

}

export default ProjectForm;