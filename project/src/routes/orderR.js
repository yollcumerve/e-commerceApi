const Router = require('express').Router()
const { verifyTokenAdmin, verifyToken } = require('../modules/verifyToken')
const thisService= require('../service/orderS')

//create order 
Router.post('/order/create', verifyToken, thisService.create)

//update order
Router.put('/order/update/:id', verifyTokenAdmin, thisService.update)

//delete order by id 
Router.delete('/order/delete/:id', verifyTokenAdmin, thisService.delete)

//get user order's one 
Router.get('/order/one/:userId', verifyToken, thisService.one)

//get all order 
Router.get('/order/all', verifyTokenAdmin, thisService.all)

// Get monthly income
Router.get('/income', verifyTokenAdmin, thisService.income)

module.exports = Router