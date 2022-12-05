const Router = require('express').Router()
const { verifyToken, verifyTokenAuth, verifyTokenAdmin} = require('../modules/verifyToken')
const thisService = require('../service/userS')
//register
Router.post('/shop/register', thisService.register)

//Login 
Router.post('/shop/login', thisService.login)

//Update user's info
Router.put('/shop/update/:id',verifyTokenAuth, thisService.update)

//Delete
Router.delete('/shop/delete/:id', verifyTokenAuth, thisService.delete)

//Get User 
Router.get('/shop/get/:id', verifyTokenAdmin, thisService.getUser )

//get all users 
Router.get('/shop/all', verifyTokenAdmin, thisService.all)

//get user's stats
Router.get('/shop/user/stats', verifyTokenAdmin, thisService.stats)

module.exports = Router