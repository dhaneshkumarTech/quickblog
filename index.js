import express from 'express';
import { config } from 'dotenv';
import { connection as _connect } from './config/databaseConnect.js'
import router  from './router.js';


config();
_connect();

const port = process.env.PORT;
const app = express();
app.use(router);
app.use(express.json());


app.listen(port, async () => {
    console.log(`Server is listening at port ${port}`)
})