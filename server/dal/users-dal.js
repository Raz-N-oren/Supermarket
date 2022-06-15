let connection = require("./connection-wrapper");

async function addUser(userDetails) {
    let sql = "INSERT INTO users (id,email,first_name, last_name, password,city, street,role)  values(?,?, ?, ?, ?,?,?,?)";
    let parameters = [userDetails.userId, userDetails.userEmail, userDetails.firstName, userDetails.lastName, userDetails.password, userDetails.city, userDetails.street, userDetails.role]
    console.log(parameters);
    let userData = await connection.executeWithParameters(sql, parameters);
    console.log(userData);
}

async function loginUser(user) {
    let sql = `SELECT id as userId, first_name as firstName, last_name as lastName,
     city as shippingCity, street as shippingStreet, role FROM users WHERE email = ? AND password = ? ;`;
    let parameters = [user.userEmail, user.password];
    console.log(parameters);

    let response = await connection.executeWithParameters(sql, parameters);

    if (response == null || response.length == 0) {
        throw new Error("Invalid E-mail or password");
    }
    return response[0];
}

async function isUserExist(userId, userEmail) {
    let sql = "SELECT id from users where (id = ? or email = ?)";
    let parameters = [userId, userEmail];
    let user = await connection.executeWithParameters(sql, parameters);

    if (user && user.length > 0) {
        return true;
    }
    return false;
}

module.exports = {
    addUser,
    loginUser,
    isUserExist
};