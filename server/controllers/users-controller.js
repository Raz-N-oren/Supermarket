const { request, response } = require("express");
const express = require("express");
const router = express.Router();

const usersLogic = require('../logic/users-logic');

router.post("/", async (request, response) => {
        let userRegistrationData = request.body;
        try {
            await usersLogic.addUser(userRegistrationData);
            response.json({err: false, msg: "user was added successfully!"});
        }
        catch (e) {
            console.error(e);
            response.status(600).send(e.message);        
        }
});

router.post("/login", async (request, response) => {
    try {
        let userDetails = request.body;
        let successfulLogInResponse = await usersLogic.loginUser(userDetails);

        response.json(successfulLogInResponse);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
});

module.exports = router;

