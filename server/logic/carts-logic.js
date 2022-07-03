 const cartsDal = require('../dal/carts-dal');

async function getLastCart(userId) {
    let lastCart = await cartsDal.getLastCart(userId);
    if(lastCart){
        lastCart.isOpen = !!lastCart.isOpen;
    }
    return lastCart;
}

async function openCart(userInfo) {
    let role = userInfo.role;
    if (role != "user") {
        throw new Error("Invalid open cart request.");
    }
    let newCart = {
        userId: userInfo.userId,
        isOpen: true,
        creationDate: new Date()
    }
    let cartId = await cartsDal.openCart(newCart);
    let openedCart = {
        id: cartId,
        isOpen: true,
        creationDate: newCart.creationDate
    }
    return openedCart;
}

async function validateCartForUser(cartId, userId) {
    let isCartBelongToUser = await cartsDal.validateCartForUser(cartId, userId);
    return isCartBelongToUser;
}

async function closeCart(cartId){
    await cartsDal.closeCart(cartId)
}

module.exports = {
    getLastCart,
    openCart,
    validateCartForUser,
    closeCart
}