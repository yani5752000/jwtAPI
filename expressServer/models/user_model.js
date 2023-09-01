const  Pool = require("pg").Pool;
const pool = new Pool({
    host: "localhost",
    database: "jwt_database",
    user: "jwt_user",
    password: "root",
    port: 5432
})

const addUser = ({username, email, password}) => {
    const queryString = "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *";
    return new Promise((resolve, reject) => {
        pool.query(queryString, [username, email, password], (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    })
}

const findUserByEmail = (email) => {
    const queryString = "SELECT * FROM users WHERE email = $1";
    return new Promise((resolve, reject) => {
        pool.query(queryString, [email], (error, result) => {
            if(error) {
                reject(error);
            } else {
                resolve(result.rows);
            }
        })
    });
};


module.exports = { addUser, findUserByEmail };