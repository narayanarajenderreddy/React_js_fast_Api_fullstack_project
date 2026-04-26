import {useState,useContext} from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login(){
    const[email,SetEmail] = useState("");
    const[password,setPassword] = useState("");
    const{login} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const res = await api.post("auth/login",{
            email:email,
            password:password
        })
        console.log("response data:",res.data);
        login(res.data.access_token);
        navigate("/dashboard");
    };

    return (
        <form onSubmit = {handleSubmit}>
            <input type = "email"
            placeholder = "enter an email address"
            value = {email}
            onChange = {(e)=>SetEmail(e.target.value)}/>
            <input type = "password"
            placeholder = "enter a password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}/>
            <button>Login</button>
        </form>
    )
}

export default Login;