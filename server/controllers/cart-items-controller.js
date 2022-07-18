const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const tokenDecoder = require("../utils/token-decoder");

const cartItemsLogic = require('../logic/cart-items-logic');

router.post("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartItemsDetails = request.body;
        let id = await cartItemsLogic.addToCart(cartItemsDetails, userInfo);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/:id", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartId = request.params.id;
        let cartItems = await cartItemsLogic.getCartItemsByCartId(cartId, userInfo)

        response.json(cartItems);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.put("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartItem = request.body;
        let id = await cartItemsLogic.updateQuantity(cartItem, userInfo);
        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/:id", async (request, response) => {
    try {
        let cartItemId = request.params.id;
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        await cartItemsLogic.removeFromCart(cartItemId, userInfo);

        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/remove_all/:id", async (request, response) => {
    try {
        let cartId = request.params.id;
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        await cartItemsLogic.removeAllCartItems(cartId, userInfo);

        response.json();
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;