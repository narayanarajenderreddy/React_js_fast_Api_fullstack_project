import { useEffect,useState } from "react";
import api from "../api/api";

function Dashboard () {
    const[user,setUser]  = useState([]);
    useEffect(()=> {
         fecthData();
    },[]);

    const fecthData = async() => {
        const res = await api.get("/auth/me");
        setUser(res.data);
    };

    return (
        <div>

            <h1>Dashboard</h1>

            {user && (
            <>
            <p>{user.email}</p>
            <p>{user.id}</p>
            </>
            )}

        </div>

    )


}

export default Dashboard;