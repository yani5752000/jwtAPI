import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate();

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/register", values)
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(error => console.log(error));
    }

    return (
    <>
        <form onSubmit={handleRegisterSubmit} >
            <label>Username</label>
            <input type="text" onChange={e => setValues({...values, username: e.target.value})}></input>
            <label>Email</label>
            <input type="email" onChange={e => setValues({...values, email: e.target.value})}></input>
            <label>Password</label>
            <input type="password" onChange={e => setValues({...values, password: e.target.value})}></input>
            <button type="submit">Register</button>
        </form>
        Register here
    </>
    )
}