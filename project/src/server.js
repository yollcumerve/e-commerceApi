const app = require('express')();
const port = 8080 
const { json, urlencoded } = require("body-parser");
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()



app.use(json({ limit: "100kb" }));
app.use(urlencoded({ limit: "100kb", extended: true }));
app.use(cors())


app.use(require("./routes/_main"));

app.listen(port, () => {
    console.log('----------')
    console.log(`E-Commerce Backend listen port: ${port} `)
    console.log('----------')
})