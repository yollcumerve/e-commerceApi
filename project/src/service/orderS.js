const orderM = require("../model/orderM");

exports.create = async (req, res) => {
  try {
    const newOrder = await orderM.create(req.body);
    res.status(200).json(newOrder);
  } catch (e) {
    console.log(e);
    res.sttaus(400).json(e);
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await orderM.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.delete = async (req, res) => {
  try {
    await orderM.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.one = async (req, res) => {
  try {
    const orderOne = await orderM.findOne({ userId: res.params.userId });
    res.status(200).json(orderOne);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.all = async (req, res) => {
  try {
    const orderAll = await orderM.find();
    res.status(200).json(orderAll);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

exports.income = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await orderM.aggregate([
      { $match: { $createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount", //lets open up our order we have userıd product
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.send(200).json(income);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};
