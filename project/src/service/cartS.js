const cartModel = require('../model/cartM')

exports.create = async (req,res) => {
    try {
        const cart = await cartModel.create(req.body)
        res.status(200).json(cart)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}


exports.update = async (req,res) => {
    try {
        const update = await cartModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
        res.status(200).json(update)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.delete = async (req,res) => {
    try {
        await cartModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart successfully deleted')
    } catch (e) {
        console.log(e)
        req.status(400).json(e)
    }
}

exports.one = async (req,res) => {
    try {
        const cartOne = await cartModel.findOne({userId: req.params.userId})
        res.status(200).json(cartOne)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.all = async (req,res) => {
    try {
        const cartAll = await cartModel.find()
        res.status(200).json(cartAll)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}