require('dotenv').config();

const axios = require('axios').default;


async function getPaymentHistory() {
    try {
        const response = await axios.get('https://edge.qiwi.com/payment-history/v2/persons/79276271075/payments?rows=10', {
            headers: {
                'Authorization': `Bearer ${process.env.QIWI_TOKEN}`,
                'Accept': 'application/json'
            }
        });

        return response.data;
    } catch (e) {
        console.log(e.toJSON());
        return { error: 'Something went wrong...' };
    }
}

module.exports = {
    getPaymentHistory
};