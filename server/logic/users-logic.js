let usersDal = require('../dal/users-dal');
const crypto = require("crypto");
const tokenDecoder = require("../utils/token-decoder")


const jwt = require('jsonwebtoken');
const config = require('../config/config.json');

const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

async function addUser(userRegistrationData) {
  validateUserData(userRegistrationData);
  if (await usersDal.isUserNameExist(userRegistrationData.id, userRegistrationData.userName)) {
    throw new Error("User name already exist");
  }

  userRegistrationData.password = hashPassword(userRegistrationData.password);
  userRegistrationData.role = "user";
  await usersDal.addUser(userRegistrationData);

}

async function loginUser(userLoginData) {
  userLoginData.password = hashPassword(userLoginData.password);
  console.log("Hashed password : " + userLoginData.password);

  let userData = await usersDal.loginUser(userLoginData)
  if (!userData) {
    throw new Error("Invalid E-mail or password");
  }
  console.log("userData", userData);
  let tokenInfo = { userId: userData.userId, role: userData.role }
  console.log("tokenInfo",tokenInfo);
  const token = jwt.sign(tokenInfo, config.secret);
  const successfulLogInResponse = { token: token, firstName: userData.firstName, lastName: userData.lastName, city: userData.city, street: userData.street };
  console.log();
  
  return successfulLogInResponse;
}

function hashPassword(password) {
  let hashedPassword = crypto.createHash("md5").update(saltLeft + password + saltRight).digest("hex");
  return hashedPassword
}

function validateUserData(userRegistrationData) {
  console.log("test", userRegistrationData);
  let format = /[^a-zA-Z]/g;
  if (!userRegistrationData.userName) {
    throw new Error("Invalid user name or password");
  }

  if (!userRegistrationData.password) {
    throw new Error("Invalid user name or password");
  }

  if (userRegistrationData.password.length < 6 || userRegistrationData.password.length > 12) {
    throw new Error("Password must contain 6 to 12 characters");
  }

  if (format.test(userRegistrationData.firstName)) {
    throw new Error("First Name must contain only Letters")
  }

  if (!userRegistrationData.firstName || userRegistrationData.firstName.length < 3) {
    throw new Error("Please enter first name . (At least 3 characters)")
  }

  if (format.test(userRegistrationData.lastName)) {
    throw new Error("Last Name must contain only Letters")
  }

  if (!userRegistrationData.lastName || userRegistrationData.lastName.length < 3) {
    throw new Error("Please enter last name . (At least 3 characters)")
  }

  if (!userRegistrationData.shippingCity || userRegistrationData.shippingCity.length < 3) {
    throw new Error("Please enter city . (At least 3 characters)")
  }

  if (!userRegistrationData.shippingStreet || userRegistrationData.shippingStreet.length < 3) {
    throw new Error("Please enter street . (At least 3 characters)")
  }

}

module.exports = {
  addUser,
  loginUser
};