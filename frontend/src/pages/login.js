import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/login", values)
            .then(result => {
                if(result.data.status === "Success") {
                    navigate("/");
                } else {
                    alert(result.data.Message);
                }
            })
            .catch(error => console.log(error));
    }
    return (
        <>
            <form onSubmit={handleRegisterSubmit} >
                <label>Email</label>
                <input type="email" onChange={e => setValues({...values, email: e.target.value})}></input>
                <label>Password</label>
                <input type="password" onChange={e => setValues({...values, password: e.target.value})}></input>
                <button type="submit">Login</button>
            </form>
            Login here
        </>
    )
}