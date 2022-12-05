require('dotenv').config()
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/ecommerceApi" ,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Connected Successfully')
})

module.exports = {
    mongoose,
    db
}