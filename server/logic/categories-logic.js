const categoriesDal = require('../dal/categories-dal');


async function getAllCategories() {
    let categories = await categoriesDal.getAllCategories();
    return categories;
}

module.exports ={
    getAllCategories,
}