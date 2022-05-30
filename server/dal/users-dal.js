let connection = require("./connection-wrapper");

async function addUser(userDetails) {
    let sql = "INSERT INTO users (id,user_name,first_name, last_name, password,city, street,role)  values(?,?, ?, ?, ?,?,?,?)";
    let parameters = [userDetails.id, userDetails.userName, userDetails.firstName, userDetails.lastName, userDetails.password, userDetails.city, userDetails.street, userDetails.role]
    console.log(parameters);
    let userData = await connection.executeWithParameters(sql, parameters);
    console.log(userData);
}

async function loginUser(user) {
    let sql = `SELECT id as userId, first_name as firstName, last_name as lastName,
     city, street, role FROM users WHERE user_name = ? AND password = ? ;`;
    let parameters = [user.userName, user.password];
    console.log(parameters);

    let response = await connection.executeWithParameters(sql, parameters);

    if (response == null || response.length == 0) {
        throw new Error("Invalid E-mail or password");
    }
    return response[0];
}

async function isUserNameExist(id, userName) {
    let sql = "SELECT id from users where user_name = ?";
    let parameters = [id, userName];
    let user = await connection.executeWithParameters(sql, parameters);

    if (user && user.length > 0) {
        return true;
    }
    return false;
}

module.exports = {
    addUser,
    loginUser,
    isUserNameExist
};