const  Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    database: "jwt_database",
    user: "jwt_user",
    password: "root",
    port: 5432
})

const addPost = ({userId, content}) => {
    console.log("postmodel: " + userId + " " + content);
    const queryString = "INSERT INTO posts(user_id, content) VALUES($1, $2) RETURNING *";
    return new Promise((resolve, reject) => {
        pool.query(queryString, [userId, content], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const getUserPosts = (userId) => {
    const queryString = "SELECT * FROM posts WHERE user_id = $1";
    return new Promise((resolve, reject) => {
        pool.query(queryString, [userId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const getAllPosts = () => {
    const queryString = "SELECT * FROM posts";
    return new Promise((resolve, reject) => {
        pool.query(queryString, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

module.exports = { addPost, getUserPosts, getAllPosts };