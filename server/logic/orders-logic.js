const ordersDal = require('../dal/orders-dal');
const cartsLogic = require('./carts-logic');
const cartItemsLogic = require('./cart-items-logic');
const fs = require('fs/promises');

async function addNewOrder(order) {
    await validateOrder(order);
    let id = await ordersDal.addNewOrder(order);
    await cartsLogic.closeCart(order.cartId);
    await createReceipt(order);
    order.id = id;
    return id;
};

async function getReceipt(cartId, userId) {
    let isCartBelongToUser = await cartsLogic.validateCartForUser(cartId, userId);
    if (isCartBelongToUser) {
        let receiptName = cartId + '.txt';
        return receiptName;
    }
    else {
        throw new Error("Cannot get receipt.");
    }
}

async function getBusyDays() {
    let busyDays = await ordersDal.getBusyDays();
    let busyDaysArray = [];
    for (let day of busyDays) {
        busyDaysArray.push(day.busyDays)
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
    let currentDay = new Date().toISOString().slice(0, 10);
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

    if (order.shippingDate < currentDay) {
        throw new Error("Invalid shipping date.");
    }

    if (order.finalPrice <= 0) {
        throw new Error("Invalid final price.");
    }

    if (order.paymentLastDigits.length != 4) {
        throw new Error("Invalid last payment digits.");
    }
}

async function createReceipt(orderRequest) {
    cartId = orderRequest.cartId;
    let finalPrice = (Math.round(orderRequest.finalPrice * 100) / 100).toFixed(2);
    let receipt = 'Receipt No. ' + cartId;
    receipt += '\n'
    let cartItemsArray = await cartItemsLogic.getCartItemsByCartId(orderRequest.cartId);
    for (let cartItem of cartItemsArray) {
        let calculatedProductPriceDualQuantity =(Math.round(cartItem.productPrice * cartItem.quantity * 100) / 100).toFixed(2);
        receipt += `
    ${cartItem.productName} X ${cartItem.quantity}  ${calculatedProductPriceDualQuantity} 
_______________________________________________`
    }
    receipt += `
Total: ${finalPrice}
Payment: ${orderRequest.paymentLastDigits}`

    await fs.writeFile('./receipts/' + cartId + '.txt', receipt);

}

module.exports = {
    addNewOrder,
    getBusyDays,
    getAmountOfOrders,
    getLastPurchaseDate,
    getReceipt
}