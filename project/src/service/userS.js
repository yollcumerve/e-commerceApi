const thisModel = require("../model/userM");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userRegister = await thisModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).json(userRegister);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.login = async (req, res) => {
  try {
    const rb = req.body;
    const user = await thisModel.findOne({ username: rb.username });
    !user && res.status(400).json("User not found");

    const validate = await bcrypt.compare(rb.password, user.password);
    !validate && res.status(400).json("Password or email is wrong");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ others, accessToken });
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.update = async (req, res) => {
    if(req.body.password){
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    try {
        const updated = await thisModel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updated)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}
  
exports.delete = async (req,res) => {
    try {
        await thisModel.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted")
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.getUser = async (req,res) => {
    try {
        const user = await thisModel.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.all = async (req,res) => {
    const query = req.query.new
    try {
        const users =  query ? await thisModel.find().sort({_id:-1}).limit(5) : await thisModel.find()
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}

exports.stats = async (req,res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
    try {
       //I run a user statistics per month to do that i should group my items and for this we can use mongodb aggregate
       const data = await thisModel.aggregate([
        {$match:{ createdAt: { $gte: lastYear}}},
        {$project: {month: { $month: "$createdAt"}}},
        {$group:{_id:"$month", total: {$sum:1}} }
       ])
       res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}