import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
    axios.get("http://localhost:8080/login/getAuth")
    .then(res => {
        if(res.data.Status === "Success") {
            setAuth(true);
            setUsername(res.data.username);
        } else {
            setAuth(false);
            setMessage(res.data.Message);
        }
    })
    }, [])

    const handleLogout = () => {
        axios.get("http://localhost:8080/login/logout")
            .then(res => {
                if(res.data.Status === "Success") {
                    window.location.reload(true);
                } else {
                    alert("error")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <>
        {
            auth ?
            <div>
                <h3>You are authorized {username}</h3>
                <button onClick={handleLogout}>Log out</button>
            </div>  
            :
            <div>
                <h3>{message}</h3>
                <h3>Login now</h3>
                <button onClick={() => navigate("/login")}>Log in</button>
            </div>
        }
        </>
    )
}

