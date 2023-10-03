const express = require('express')
const dotenv = require('dotenv')


dotenv.config();

const port = process.env.PORT;
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to blog website!");
})

app.listen(port, () => {
    console.log(`Server is listening at port ${port}`)
})