require('dotenv').config()
const axios = require('axios');
const qs = require('querystring');

class midtransController {
    static async getToken (req,res, next) {
        try {
            const { card_number,card_exp_month,card_exp_year,card_cvv, amount } = req.body;
            const token_cli = process.env.CLIENT
            
            //get token to proceed payment
            const headers = { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': 'Basic U0ItTWlkLXNlcnZlci01NVR2MnBoUDVUWDVWeXFTUEpKbHBXS0Y6'
              }
            const url_token = `${process.env.BASE_MID}/v2/token?client_key=${token_cli}&card_number=${card_number}&card_exp_month=${card_exp_month}&card_exp_year=${card_exp_year}24&card_cvv=${card_cvv}`;
            const token = await axios.get(`${url_token}`,{headers:headers})
            //charge the card
            let orderId = token.data.token_id.slice(4,10)
            const body = {
                "payment_type": "credit_card",
                "transaction_details": {
                  "order_id": `${orderId}`,
                  "gross_amount": amount
                },
                "credit_card": {
                  "token_id": `${token.data.token_id}`,
                  "authentication": true,
                }
            } 
            const charge = await axios.post(`${process.env.BASE_MID}/v2/charge`,body,{headers:headers})
            console.log(charge);
            res.status(200).json(charge.data)
        } catch (e) {
            next(e)
        }
    }
    // static async notification(req, res){}
    
}

module.exports = midtransController;
