import {create} from "zustand";
import api from "../api/api";

const useTaskStore = create((set)=>({

    tasks : [],

    fetchTasks:async() => {
        const res = await api.get("/tasks/all_tasks")
        set({
            tasks:res.data
        });

    },

    addTask:async(data)=> {
        const newdata =  await api.post("/tasks/create_new_task",data);
        console.log("newly entered data",newdata);

         const res = await api.get("/tasks/all_tasks");
         set({
            tasks:res.data
         });
    },

    

    deleteTask:async(id,projectId) => {
        await api.delete(`/tasks/${id}`);
        //const res = await api.get(`/tasks?project_id = ${projectId}`);
         const res = await api.get("/tasks/all_tasks");

        set({
            tasks:res.data
        });

    },

    updateTask:async(id,data,projectid)=>{
        await api.put(`/tasks/${id}`,data);
        //const res = await api.get(`/tasks?project_id = ${projectid}`);
        const res = await api.get("/tasks/all_tasks");

        set({
            tasks:res.data
        });

    }

}));


export default useTaskStore

