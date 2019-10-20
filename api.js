require('dotenv').config();

const fetch = require('node-fetch');

const getCategories = () => {
    return fetch(`${process.env.API_URL}:${process.env.API_PORT}/api/categories`)
        .then(r => r.json());
}

const getProducts = (categoryId) => {
    return fetch(`${process.env.API_URL}:${process.env.API_PORT}/api/products/${categoryId}`)
        .then(r => r.json());
}

module.exports = {
    getCategories,
    getProducts
};