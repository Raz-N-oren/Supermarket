const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const productsLogic = require('../logic/products-logic');

router.get("/", async (request, response) => {
    try {
        let products = await productsLogic.getAllProducts();
        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/:categoryId", async (request, response) => {
    try {
        let products = await productsLogic.getProductsByCategory(request.params.categoryId);

        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.get("/search/:searchString", async (request, response) => {
    try {
        let products = await productsLogic.searchProduct(request.params.searchString);
        response.json(products);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.put("/", async (request, response) => {
    try {
        let product = request.body;
        let id = await productsLogic.editProduct(product);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.post("/", async (request, response) => {
    try {
        let productDetails = request.body;
        let id = await productsLogic.addNewProduct(productDetails);

        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

router.delete("/:id", async (request, response) => {
    try {
        let id = request.params.id;
        await productsLogic.deleteProduct(id)
        response.json(id);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;