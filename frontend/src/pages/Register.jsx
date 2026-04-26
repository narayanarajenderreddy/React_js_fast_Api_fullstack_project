import {useState} from "react";
import api from "../api/api";

function Register () {
    const[email,setEmail]  = useState("");
    const[password,setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await api.post("auth/register",{
            email:email,
            password:password
        })
        .then((response)=>{
            console.log(response.data);
        })
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type = "email"
            placeholder="enter an email address"
            value = {email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input type = "password"
            placeholder="enter a password"
            value = {password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button type = "submit">Register</button>
        </form>
    )
}

export default Register;