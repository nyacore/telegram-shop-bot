const { getProducts, getCategories, getProduct } = require('./api');

function home(bot, { message }) {
    bot.sendMessage(message.chat.id, 'Выберите действие', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Магазин',
                    callback_data: 'shop'
                }]
            ]
        }
    });
}

async function shop(bot, { message }) {
    const categories = (await getCategories()).data.categories.map((c) => {
        return [{
            text: c.name,
            callback_data: `category_${c.id}`
        }];
    });

    bot.sendMessage(message.chat.id, 'Каталог:', {
        reply_markup: {
            inline_keyboard: [
                ...categories,
                [{
                    text: 'Назад',
                    callback_data: 'home'
                }]
            ]
        }
    });
}

async function products(bot, { message, data }) {
    const categoryId = data.split('_')[1];
    const products = (await getProducts(categoryId)).data.products.map((p) => {
        return [{
            text: p.name,
            callback_data: `product_${p.id}`
        }];
    });

    bot.sendMessage(message.chat.id, 'Товары:', {
        reply_markup: {
            inline_keyboard: [
                ...products,
                [{
                    text: 'Назад',
                    callback_data: 'shop'
                }]
            ]
        }
    });
}

async function product(bot, { message, data }) {
    const productId = data.split('_')[1];
    const product = (await getProduct(productId)).data.product;

    bot.sendMessage(message.chat.id, `${product.name}
    Цена: ${product.price}Р,
    Описание: ${product.description}`, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Назад',
                    callback_data: `category_${product.category.id}`
                }]
            ]
        }
    });
}

module.exports = {
    home,
    shop,
    products,
    product
}