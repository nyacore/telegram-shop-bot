const { getProducts, getCategories } = require('./api');

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
    const categories = (await getCategories()).map((c) => {
        return [{
            text: c.name,
            callback_data: `category_${c._id}`
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
    const products = (await getProducts(categoryId)).map((p) => {
        return [{
            text: p.name,
            callback_data: `product_${p._id}`
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

module.exports = {
    home,
    shop,
    products
}