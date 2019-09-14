require('dotenv').config();

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

function shop(bot, { message }) {
    bot.sendMessage(message.chat.id, 'Каталог:', {
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

module.exports = {
    home
}