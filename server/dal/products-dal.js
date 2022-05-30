let connection = require("./connection-wrapper");

async function getAllProducts() {
    let sql = `SELECT p.id, p.name, p.category_id as categoryId, p.price, p.img_url as imgUrl, c.name as categoryName 
    FROM products p join categories c
    ON c.id = p.category_id`;

    let products = await connection.execute(sql);

    return products;
}

async function getProductsByCategory(categoryId) {
    let sql = `SELECT p.id, p.name, p.price, p.img_url as imgUrl, p.category_id as categoryId, c.name as categoryName 
    FROM products p join categories c 
    on p.category_id = c.id 
    where c.id = ?`;
    parameters = [categoryId]

    let products = await connection.executeWithParameters(sql, parameters);

    return products;
}

async function addNewProduct(product) {
    validateProduct(product)
    let sql = "INSERT INTO products (name, category_id, price, img_url)  values(?,?, ?, ?)";
    let parameters = [product.name, product.categoryId, product.price, product.imgUrl];

    let productData = await connection.executeWithParameters(sql, parameters);

    return productData.insertId;

}

async function deleteProduct(productId) {
    let sql = 'DELETE FROM products WHERE id = ?;';
    let parameters = [productId];

    await connection.executeWithParameters(sql, parameters);
}

async function searchProduct(searchString) {
    let sql = `SELECT p.id, p.name, p.price, p.img_url as imgUrl, p.category_id as categoryId, c.name as categoryName 
    FROM supermarket.products p join supermarket.categories c 
    on p.category_id = c.id 
    where p.name like "%${searchString}%"`;

    let products = await connection.execute(sql);
    return products;
}

async function editProduct(product) {
    validateProduct(product);
    let sql = `UPDATE products SET name = ?, price = ?, img_url = ?, category_id = ? WHERE id = ?;`;
    let parameters = [product.name, product.price, product.imgUrl, product.categoryId, product.id];

    await connection.executeWithParameters(sql, parameters);
}


function validateProduct(product) {

    if (!product.name) {
      throw new Error("Please enter a name.");
    }
    
    if(product.name.length > 15) {
        throw new Error("Please enter a name shorter than 15 characters")
    }

    if (!product.price) {
      throw new Error("Please enter a price.");
    }
  
    if (product.price < 1 || product.price > 20000) {
      throw new Error("Price must be between 1 and 20,000.");
    }
  
    if (!product.imgUrl) {
      throw new Error("Please Enter a valid image url.");
    }
  
    if (product.imgUrl.length > 3000) {
      throw new Error("Please Enter a image url shorter than 3,000 charterers.");
    }
  
  }

module.exports = {
    getAllProducts,
    addNewProduct,
    deleteProduct,
    getProductsByCategory,
    searchProduct,
    editProduct
}