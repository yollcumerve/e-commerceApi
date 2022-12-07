const Router = require('express').Router()
const { verifyToken, verifyTokenAdmin } = require('../modules/verifyToken')
const thisService = require('../service/cartS')


//Anybody can create cart
Router.post('/cart/create', verifyToken, thisService.create )

//update cart but only verifyAdmin 
Router.put('/cart/update/:id', verifyToken, thisService.update)


//delete cart
Router.delete('/cart/delete/:id', verifyToken, thisService.delete )

//get one cart by id 
Router.get('/cart/get/:userId', verifyToken, thisService.one)

//get all cart 
Router.get('/cart/all', verifyTokenAdmin, thisService.all)

module.exports = Router