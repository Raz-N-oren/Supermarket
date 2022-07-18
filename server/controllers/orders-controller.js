const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");

const tokenDecoder = require("../utils/token-decoder");
const ordersLogic = require('../logic/orders-logic');

router.post("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let user_id = userInfo.userId;
        let orderDetails = request.body;
        orderDetails.userId = user_id;
        orderDetails.orderDate = new Date();
        orderDetails.shippingDate = new Date(orderDetails.shippingDate);
        let id = await ordersLogic.addNewOrder(orderDetails);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/busy_days", async (request, response) => {
    try {
        let busyDays = await ordersLogic.getBusyDays();
        response.json(busyDays);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/amount_of_orders", async (request, response) => {
    try {
        let amountOfOrders = await ordersLogic.getAmountOfOrders();
        response.json(amountOfOrders);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/last_purchase", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let lastPurchase = await ordersLogic.getLastPurchaseDate(userInfo);

        response.json(lastPurchase);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/:cartId", async (request, response) => {
    try {
        let cartId = request.params.cartId;
        let userId = tokenDecoder.decodeTokenFromRequest(request).userId;
        let receipt = await ordersLogic.getReceipt(cartId, userId);

        response.sendFile(path.resolve(__dirname, '../receipts/', receipt));
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;