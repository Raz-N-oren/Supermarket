const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('./carts-logic');

async function addNewOrder(order) {
    await validateOrder(order);
    let id = await ordersDal.addNewOrder(order);
    order.id = id;
    return id;
};

async function getReceipt(cartId, userId) {
    let isCartBelongToUser = await cartsLogic.validateCartForUser(cartId, userId);
    if (isCartBelongToUser) {
        let receipt = await ordersDal.getReceipt(cartId);
        return receipt;
    }
    else {
        throw new Error("Invalid receipt request.");
    }
}

async function getBusyDays() {
    let busyDays = await ordersDal.getBusyDays();
    let busyDaysArray = [];
    for (let day of busyDays) {
        busyDaysArray.push(day.busyDay)
    }
    return busyDaysArray;
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

async function validateOrder(order) {
    let isCartBelongToUser = await cartsLogic.validateCartForUser(order.cartId, order.userId);
    if (!isCartBelongToUser) {
        "Illegal request."
    }

    if (order.finalPrice <= 0) {
        throw new Error("Invalid final price.");
    }

    if (order.city.length > 100) {
        throw new Error("Shipping city is limited to 100 characters.");
    }

    if (order.street.length > 100) {
        throw new Error("Shipping street is limited to 100 characters.");
    }

    if (order.shippingDate < order.orderDate) {
        throw new Error("Invalid shipping date.");
    }

    if (order.finalPrice <= 0) {
        throw new Error("Invalid final price.");
    }

    if (order.paymentLastDigits.length != 4) {
        throw new Error("Invalid last payment digits.");
    }
}

module.exports = {
    addNewOrder,
    getBusyDays,
    getAmountOfOrders,
    getLastPurchaseDate,
    getReceipt
}