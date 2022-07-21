const cartItemsDal = require('../dal/cart-items-dal');
const cartLogic = require('../logic/carts-logic');

async function addToCart(cartItem, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartLogic.validateCartForUser(cartItem.cartId, userId);
    if (isCartVerified) {
        let cartItemId = await cartItemsDal.addToCart(cartItem);
        return cartItemId;
    }
    else {
        throw new Error("Illegal request.")
    }
}

async function getCartItemsByCartId(cartId) {
    let cartItems = await cartItemsDal.getCartItemsByCartId(cartId);
    return cartItems;
}

async function updateQuantity(cartItemDetails, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartLogic.validateCartForUser(cartItemDetails.cartId, userId);
    if (isCartVerified) {
        await cartItemsDal.updateQuantity(cartItemDetails);
    }
    else {
        throw new Error("Illegal request.")
    }
};

async function removeFromCart(cartItemId, userInfo) {
    let userId = userInfo.userId;
    let isCartItemVerified = await validateCartItemForUser(cartItemId, userId);
    if (isCartItemVerified) {
        await cartItemsDal.removeFromCart(cartItemId, userId);
    }
    else {
        throw new Error("Invalid delete request.")
    }
}

async function removeAllCartItems(cartId, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartLogic.validateCartForUser(cartId, userId);
    if (isCartVerified) {
        await cartItemsDal.removeAllCartItems(cartId);
    }
    else {
        throw new Error("Invalid delete request.")
    }
}

async function validateCartItemForUser(cartItemId, userId) {
    let isCartItemVerified = await cartItemsDal.validateCartItemForUser(cartItemId, userId);
    return isCartItemVerified;
}

module.exports = {
    addToCart,
    getCartItemsByCartId,
    removeFromCart,
    updateQuantity,
    removeAllCartItems
}