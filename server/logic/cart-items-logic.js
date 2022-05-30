const cartItemsDal = require('../dal/cart-items-dal');

async function addToCart(cartItem) {
    let id = await cartItemsDal.addToCart(cartItem);
    cartItem.id = id;
    return id;
};

async function getCartItemsByCartId(cartId) {
    let cartItems = await cartItemsDal.getCartItemsByCartId(cartId);
    return cartItems;
}

async function removeFromCart(cartItemId) {
    await cartItemsDal.removeFromCart(cartItemId);
}

async function updateQuantity(cartItemDetails) {
    await cartItemsDal.updateQuantity(cartItemDetails);
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