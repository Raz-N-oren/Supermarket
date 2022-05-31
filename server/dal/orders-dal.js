let connection = require("./connection-wrapper");

async function addNewOrder(order) {
    let sql = `INSERT INTO orders 
    (user_id, cart_id, final_price, city, street, shipping_date,order_date,payment_last_digits)
     values(?,?, ?, ?,?,?,?,?);`;
    let parameters = [order.userId, order.cartId, order.finalPrice, order.city, order.street, order.shippingDate, order.orderDate, order.paymentLastDigits];

    let orderData = await connection.executeWithParameters(sql, parameters);

    return orderData.insertId;

}

async function getBusyDays() {
    let sql = `SELECT shipping_date as shippingDate 
    FROM supermarket.orders 
    GROUP BY shipping_date HAVING count(*) >= 3;`;

    let busyDays = await connection.execute(sql);
    return busyDays;

}

async function getAmountOfOrders() {
    let sql = `SELECT count(id) as amountOfOrders FROM supermarket.orders;`;
    let [serverResponse] = await connection.execute(sql);
    return serverResponse.amountOfOrders;
}

async function getLastPurchaseDate(userId) {
    let sql = `SELECT max(order_date) as orderDate
    FROM orders
    where user_id = ?;`;
    let parameters = [userId];
    let lastPurchase = await connection.executeWithParameters(sql, parameters);
    return lastPurchase;
}

module.exports = {
    addNewOrder,
    getBusyDays,
    getAmountOfOrders,
    getLastPurchaseDate
}