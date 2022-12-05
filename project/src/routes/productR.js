const Router = require('express').Router()
const { verifyTokenAdmin } = require('../modules/verifyToken')
const thisService= require('../service/productS')

//create product
Router.post('/product/create' ,verifyTokenAdmin, thisService.create)

//Update product 
Router.put('/product/update/:id', verifyTokenAdmin, thisService.update)

//Delete product
Router.put('/product/delete/:id', verifyTokenAdmin, thisService.delete)

//Get product by id 
Router.get('/product/get/:id', thisService.one)

// Get all products
Router.get('/product/all', thisService.all)

module.exports =  Router