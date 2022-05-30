const productsDal = require('../dal/products-dal');

async function getAllProducts() {
    let products = await productsDal.getAllProducts();
    return products;
}

async function getProductsByCategory(categoryId) {
    let products = await productsDal.getProductsByCategory(categoryId);
    return products;
}

async function addNewProduct(product) {
    validateProduct(product);
    let id = await productsDal.addNewProduct(product);
    product.id = id;
    return id;
};

async function deleteProduct(productId) {
    await productsDal.deleteProduct(productId);
};

async function searchProduct(searchString) {
    let products = await productsDal.searchProduct(searchString);

    return products;
}

async function editProduct(product) {
    validateProduct(product);
    await productsDal.editProduct(product);
}

const validateProduct = (product) => {
    if (product.name == "") {
      throw new Error("Name can not be empty.");
    }

    if (product.categoryId == "") {
      throw new Error("Select a category.");
    }

    if (product.name.length > 15) {
      throw new Error("Name is limited to 15 characters.");
    }
    
    if (product.price <= 0 || product.price > 10,000) {
        throw new Error("Invalid price.");
    }
    
    if (product.imgUrl == "") {
      throw new Error("Please enter image URL.");
    }

    if (product.imgUrl.length > 350) {
      throw new Error("Image URL is limited to 350 characters.");
    }
  }


module.exports = {
    getAllProducts,
    getProductsByCategory,
    addNewProduct,
    deleteProduct,
    searchProduct,
    editProduct
}