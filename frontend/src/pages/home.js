import { useState, useEffect } from "react"
import axios from "axios";

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState("");
     useEffect(() => {
        axios.get("http://localhost:8080/login/getAuth")
        .then(res => {
            if(res.data.Status === "Success") {
                setAuth(true);
                setUsername(res.data.username);
            }
        })
     }, [])
    return (
        <>
        {
            auth ?
            <div>
                <h3>You are authorized {username}</h3>
                <button>Log out</button>
            </div>
            :
            <div>
                <h3>Login now</h3>
                <button>Log in</button>
            </div>
        }
        </>
    )
}

