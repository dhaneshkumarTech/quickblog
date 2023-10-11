import express from 'express';
import 'dotenv/config.js';
import { connection as _connectDB } from './config/dbConfig.js'
import userRoutes from './routes/userRoutes.js'
import blogRoutes from './routes/blogRoutes.js';
import passport from 'passport';

_connectDB();
const port = process.env.PORT;
const app = express();


app.use(express.json())

app.use(userRoutes);
app.use(blogRoutes)
app.use(passport.initialize());
app.use((req, res, next) => {
    res.send({ error: 'Route Not Found' });
});

app.listen(port, async () => {
    console.log(`Server is listening at port ${port}`)
})
