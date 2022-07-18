let connection = require("./connection-wrapper");

async function getCartItemsByCartId(cartId) {
    let sql = `SELECT ci.id, ci.product_id as productId, ci.quantity,
    p.name as productName, p.price as productPrice, p.img_url as productImage, ci.cart_id as cartId
    FROM supermarket.cart_items ci join products p
    on ci.product_id = p.id 
    where ci.cart_id = ?;`;
    let parameters = [cartId]
    let cartItems = await connection.executeWithParameters(sql, parameters);
    return cartItems;
}

async function addToCart(cartItem) {
    let sql = "INSERT INTO cart_items (product_id,quantity,cart_id)  values(?,?, ?)";
    let parameters = [cartItem.productId, cartItem.quantity, cartItem.cartId];

    let cartItemData = await connection.executeWithParameters(sql, parameters);

    return cartItemData.insertId;
}

async function updateQuantity(cartItemDetails) {
    let sql = "UPDATE cart_items SET quantity = ? WHERE id = ?;"
    let parameters = [cartItemDetails.quantity, cartItemDetails.id];
    let cartItemData = await connection.executeWithParameters(sql, parameters);
    return cartItemData;
}

async function removeFromCart(userId) {
    sql = 'DELETE FROM cart_items WHERE id = ?;';
    parameters = [userId];
    await connection.executeWithParameters(sql, parameters);
}

async function removeAllCartItems(cartId) {
    let sql = "DELETE FROM cart_items WHERE (`cart_id` = ?)";
    let parameters = [cartId];

    await connection.executeWithParameters(sql, parameters);
}

async function validateCartItemForUser(cartItemId, userId) {
    let sql = `select ci.id 
    from carts c join cart_items ci 
    on c.id = ci.cart_id 
    where ci.id = ? and c.user_id = ?;`;
    let parameters = [cartItemId, userId];
    let response = await connection.executeWithParameters(sql, parameters);
    return response.length > 0;
}

module.exports = {
    addToCart,
    getCartItemsByCartId,
    removeFromCart,
    updateQuantity,
    removeAllCartItems,
    validateCartItemForUser
}