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
  console.log("Add test", product);
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

    if (product.name.trim() == "") {
      throw new Error("Name can not be empty.");
    }

    if (!product.name) {
      throw new Error("Please enter a product's name.");
    }

    if (product.name.length > 15) {
      throw new Error("Name is limited to 15 characters.");
    }

    if (!product.categoryId) {
      throw new Error("Select a category.");
    }

    if (product.categoryId == "") {
      throw new Error("Please enter a category.");
    }
    
    if(!product.price){
      throw new Error("Please enter price.");
    }

    if(product.price == ""){
      throw new Error("Please enter price.");
    }

    if (product.price <= 0 || product.price > 10000) {
      throw new Error("Price must be between 0 and 10,000.");
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