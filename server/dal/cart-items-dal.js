let connection = require("./connection-wrapper");

async function getCartItemsByCartId(cartId) {
    let sql = `SELECT id as cartItemId,product_id as productId, quantity from cart_items where cart_id = ?;`;
    let parameters = [cartId]
    let cartItems = await connection.executeWithParameters(sql, parameters);
    return cartItems;
}

async function addToCart(cartItem) {
    let sql = "INSERT INTO cart_items (product_id,quantity,cart_id)  values(?,?, ?)";
    let parameters = [cartItem.productId, cartItem.quantity,cartItem.cartId];

    let cartItemData = await connection.executeWithParameters(sql, parameters);

    return cartItemData.insertId;
}

async function removeFromCart(cartItemId){
    sql = 'DELETE FROM cart_items WHERE id = ?;';
    parameters = [cartItemId];
    await connection.executeWithParameters(sql, parameters);
}

async function updateQuantity(cartItemDetails) {
    let sql = "UPDATE cart_items SET quantity = ? WHERE id = ?;"
    let parameters = [cartItemDetails.quantity, cartItemDetails.id];
    let cartItemData = await connection.executeWithParameters(sql, parameters);
    return cartItemData;
  }

  async function removeAllCartItems(cartId) {
    let sql = "DELETE FROM cart_items WHERE (`cart_id` = ?)";
    let parameters = [cartId];
    await connection.executeWithParameters(sql, parameters);
}


module.exports = {
    addToCart,
    getCartItemsByCartId,
    removeFromCart,
    updateQuantity,
    removeAllCartItems
}