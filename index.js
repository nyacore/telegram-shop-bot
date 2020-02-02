require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent')

const { home, shop, products, product } = require('./actions');


// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
    polling: true,
    request: {
        agentClass: Agent,
        agentOptions: {
            socksHost: process.env.PROXY_SOCKS5_HOST,
            socksPort: parseInt(process.env.PROXY_SOCKS5_PORT),
        }
    }
});

const helpString = `Бот, который пока что непонятно, что делает.
/help - помощь,
/start - начать с начала,
/payments - последние 10 платежей,
/shop - каталог`;

bot.onText(/\/start/, (message, match) => {
    home(bot, { message });
});

bot.onText(/\/help/, (msg, match) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, helpString);
})

bot.on('callback_query', (msg) => {
    console.log(msg.data);
    if (msg.data == 'home') {
        home(bot, msg);
    } else if (msg.data == 'shop') {
        shop(bot, msg);
    } else if (msg.data.match(/category_.+/)) {
        products(bot, msg);
    } else if (msg.data.match(/product_.+/)) {
        product(bot, msg);
    }


    // switch (msg.data) {
    //     case /home/.test(msg.data):
    //         home(bot, msg);
    //         break;
    //     case /shop/.test(msg.data):
    //         shop(bot, msg);
    //         break;
    //     case /category-[1-9]+/.test(msg.data):
    //         products(bot, msg);
    //         break;
    // }
});