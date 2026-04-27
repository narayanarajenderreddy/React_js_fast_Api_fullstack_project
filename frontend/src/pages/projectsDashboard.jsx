import {useEffect} from "react";
import useProjectStore from "../store/projectStore";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";


function ProjectsDashboard(){

const fetchProjects=
useProjectStore(
 state=>state.fetchProjects
);


useEffect(()=>{

fetchProjects();

},[]);


return(
<div>

<h1>Projects Dashboard</h1>

<ProjectForm/>

<ProjectList/>

</div>
)

}

export default ProjectsDashboard;