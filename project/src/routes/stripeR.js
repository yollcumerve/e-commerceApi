const Router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_KEY)
const thisService = require('../service/stripe')

Router.post('/payment', thisService.payment )

module.exports = Router
