const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.payment = async (req,res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    }, (stripeErr, stripeRes) =>{
        if(stripeErr){
            res.status(400).json(e)
        }else{
            res.status(200).json(stripeRes)
        }
    })
}