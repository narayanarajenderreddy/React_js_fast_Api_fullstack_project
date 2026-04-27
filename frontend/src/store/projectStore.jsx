import {create} from  "zustand";
import api from "../api/api";

const useProjectStore = create((set)=> ({
    projects:[],
    fetchProjects:async() => {
        const res = await api.get("/Projects/all_projects");
        set({
            projects:res.data
        });
    },

    addProject:async(projectData) => {
        const newdata =  await api.post("/Projects/create_new_project", projectData);
        console.log("newly entered data",newdata);
        // set((state) => ({
        //     projects: [...state.projects, res.data]
        // }));

        const res = await api.get("/Projects/all_projects");
        set({
            projects:res.data
        });
    },

    deleteProject:async(projectId) => {
        await api.delete(`/Projects/${projectId}`);
        const res = await api.get("/Projects/all_projects");
        set((state)=>({
            projects:state.projects.filter(
            project=>project.id!==projectId
            )
        }));
        
    },

    updateProject:async(projectId,data) => {
        await api.put(`/Projects/${projectId}`,data);
        const res = await api.get("/Projects/all_projects");
        set({
            projects:res.data
        })

    }

}));

export default useProjectStore