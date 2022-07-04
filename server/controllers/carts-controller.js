const express = require("express");
const router = express.Router();

const cartLogic = require("../logic/carts-logic");
const tokenDecoder = require("../utils/token-decoder");

router.get("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let userId = userInfo.userId;
        let cart = await cartLogic.getLastCart(userId);

        response.json(cart);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.post("/", async (request, response) => {
    try {
        let userInfo = tokenDecoder.decodeTokenFromRequest(request);
        let cartId = await cartLogic.openCart(userInfo);

        response.json(cartId);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;