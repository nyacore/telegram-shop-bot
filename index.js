require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent')
const { getPaymentHistory } = require('./qiwi');

const { home } = require('./actions');


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

bot.onText(/\/shop/, (msg, match) => {
    const chatId = msg.chat.id;

});

bot.onText(/\/payments/, async (msg, match) => {
    try {
        const payments = await getPaymentHistory();
        let resultString = '';
        payments.data.forEach(p => {
            resultString += `Номер: ${p.personId}, Пополнение или перевод: ${p.type}, Статус: ${p.statusText}, Сумма: ${p.sum.amount} ${p.sum.currency}`;
            resultString += '\n';
        })

        const chatId = msg.chat.id;

        bot.sendMessage(chatId, resultString);
    } catch (e) {
        console.error(e);
        // I am not gonna handle it L.O.L.
    }


});

bot.on('callback_query', (msg) => {
    console.log(msg);
    switch (msg.data) {
        case 'home':
            home(bot, msg);
    }
})