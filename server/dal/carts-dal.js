let connection = require("./connection-wrapper");

async function getLastCart(userId) {
    let sql = `SELECT id,user_id as userId, creation_date as creationDate, is_open as isOpen
    FROM supermarket.carts
    where user_id = ? and creation_date in (select max(creation_date) from carts)`;
    let parameters = [userId]
    let cart = await connection.executeWithParameters(sql, parameters);
    return cart;
}

async function openCart(newCart) {
    let sql = "insert into carts (user_id, is_open, creation_date) value(?, ?, ?)";
    let parameters = [newCart.userId, newCart.isOpen, newCart.creationDate];
    console.log(newCart);
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function validateCartForUser(cartId, userId) {
    let sql = "select id from carts where id = ? and user_id = ?";
    let parameters = [cartId, userId];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.length > 0;
}

module.exports = {
    getLastCart,
    openCart,
    validateCartForUser
}