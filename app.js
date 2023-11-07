import express from 'express';
import passport from 'passport';
import cors from 'cors'

import { connection as _connectDB } from './src/config/db.config.js'
import 'dotenv/config.js';
import router from './src/routes/index.js';

_connectDB();
const port = process.env.PORT || 4000;
const app = express();


app.use(express.urlencoded({ extended: true }));    
app.use(cors())
app.use(express.json())
app.use(router)
app.use(passport.initialize());

app.listen(port, async () => {
    console.log(`Server is listening at port ${port}`)
})
