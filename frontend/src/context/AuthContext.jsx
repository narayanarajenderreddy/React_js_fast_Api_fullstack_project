import {createContext,useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const[token,setToken] = useState(localStorage.getItem("token"));
    const[user,SetUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    console.log("user details from authcontext:",user);

    const login = (tokenvalue) => {
        console.log("token value:", tokenvalue);
        localStorage.setItem("token",tokenvalue)
        setToken(tokenvalue);
    }

    const afterLogin = (userdata) => {
        console.log("user data from afterlogin function:",userdata);
        localStorage.setItem("user",JSON.stringify(userdata))
        SetUser(userdata);
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null);
        SetUser(null);
    }


    return (
        <AuthContext.Provider value = {{token,login,logout,user,SetUser,afterLogin}}>
            {children}
        </AuthContext.Provider>
    )
}