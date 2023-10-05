import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Posts from "../components/posts";

export default function Home() {
    const [auth, setAuth] = useState(false);
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState("");
    const [message, setMessage] = useState("");
    const [posts, setPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
    const [content, setContent] = useState("");

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8080/login/getAuth")
            .then(res => {
                if(res.data.Status === "Success") {
                    setAuth(true);
                    setUsername(res.data.username);
                    setUserId(res.data.userId);
                } else {
                    setAuth(false);
                    setMessage(res.data.Message);
                }
            })
    }, [])

    useEffect(() => {
        getUserPosts();
    }, [userId])

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
    };

    const getUserPosts = () => {
        axios.get(`http://localhost:8080/posts/${userId}`)
            .then(res => {
                console.log("home.js res.data: ", res.data);
                setPosts(res.data);
            })
            .catch(error => console.log(error));
        
    };

    const getAllPosts = () => {
        axios.get("http://localhost:8080/posts/")
            .then(res => {
                console.log("home.js res.data all posts: ", res.data);
                setAllPosts(res.data);
            })
            .catch(error => console.log(error));
        
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/posts/", {userId, content})
            .then(res => {
                getUserPosts();
            })
            .catch(error => console.log(error))
    }

    return (
        <>
            {/* <h3>All Posts</h3>
            <Posts posts={allPosts} /> */}
        {
            auth ?
            <div>
                <h3>You are authorized {username}</h3>
                <h3>Your user ID is {userId}</h3>

                <h3>Add a post</h3>
                <form>
                    <label>Post content</label>
                    <input type="text" name="content" onChange={e => setContent(e.target.value)} />
                    <button type="submit" onClick={handlePostSubmit}>Post</button>
                </form>
                <Posts posts={posts} />
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

