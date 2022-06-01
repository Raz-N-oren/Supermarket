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

async function removeFromCart(cartItemId) {
    await cartItemsDal.removeFromCart(cartItemId);
}

async function updateQuantity(cartItemDetails, userInfo) {
    let userId = userInfo.userId;
    let isCartVerified = await cartLogic.validateCartForUser(cartItem.cartId, userId);
    if (isCartVerified) {
        await cartItemsDal.updateQuantity(cartItemDetails);    }
    else {
        throw new Error("Illegal request.")
    }

};

async function removeAllCartItems(cartId) {
    await cartItemsDal.removeAllCartItems(cartId);
}

module.exports = {
    addToCart,
    getCartItemsByCartId,
    removeFromCart,
    updateQuantity,
    removeAllCartItems
}