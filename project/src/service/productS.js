const thisModel = require('../model/productM')

exports.create = async (req,res) => {
    try {
        const product = await thisModel.create(req.body)
        res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.update = async (req,res) => {
    try {
        const updatedProduct = await thisModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedProduct)
    } catch (e) {
        console.log(e)
        res.status(400).json8e
    }
}

exports.delete = async (req,res) => {
    try {
        const deleted = await thisModel.findByIdAndDelete(req.params.id)
        res.status(200).json('Porduct successfully deleted')
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.one = async (req,res) => {
    try {
        const oneP = await thisModel.findById(req.params.id)
        res.status(200).json(oneP)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.all = async (req,res) => { 
    const qNew = req.query.new
    const qcategory = req.query.category
    try {
       let products;
       
       if(qNew){
        products = await thisModel.find().sort({createdat: -1}).limit(5)
       }else if(qcategory){
        products = await thisModel.find({ categories:{ $in: [qcategory]}})
       }else{
        products = await thisModel.find()
       }
       res.status(200).json(products)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}