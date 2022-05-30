const ordersDal = require('../dal/orders-dal');

async function addNewOrder(order) {
    let id = await ordersDal.addNewOrder(order);
    order.id = id;
    return id;
};

async function getBusyDays(){
    let busyDays = await ordersDal.getBusyDays();
    return busyDays;
}

async function getAmountOfOrders() {
    let amountOfOrders = await ordersDal.getAmountOfOrders();
    return amountOfOrders;
}

async function getLastPurchaseDate(userInfo) {
    let userId = userInfo.userId;
    let lastPurchase = await ordersDal.getLastPurchaseDate(userId);
    return lastPurchase;
}

module.exports = {
    addNewOrder,
    getBusyDays,
    getAmountOfOrders,
    getLastPurchaseDate
}