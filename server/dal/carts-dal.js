let connection = require("./connection-wrapper");

async function getLastCart(userId) {
    let sql = `SELECT id, creation_date as creationDate, is_open as isOpen
    FROM carts
    where creation_date in (select max(creation_date) from carts where user_id = ?)`;
    let parameters = [userId]
    let [cart] = await connection.executeWithParameters(sql, parameters);
    return cart;
}

async function openCart(newCart) {
    let sql = "insert into carts (user_id, is_open, creation_date) value(?, ?, ?)";
    let parameters = [newCart.userId, newCart.isOpen, newCart.creationDate];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.insertId;
}

async function validateCartForUser(cartId, userId) {
    let sql = "select id from carts where id = ? and user_id = ?";
    let parameters = [cartId, userId];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.length > 0;
}

async function closeCart(cartId) {
    let sql = "UPDATE carts SET is_open = '0' WHERE (id=?);";
    let parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getLastCart,
    openCart,
    validateCartForUser,
    closeCart
}