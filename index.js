import express from 'express';
import 'dotenv/config.js';
import { connection as _connectDB } from './src/config/dbConfig.js'
import userRoutes from './src/routes/userRoutes.js'
import blogRoutes from './src/routes/blogRoutes.js';
import admingRoutes from './src/routes/adminRoutes.js'
import passport from 'passport';

_connectDB();
const port = process.env.PORT;
const app = express();


app.use(express.json())
app.use(userRoutes);
app.use(blogRoutes)
app.use(admingRoutes)
app.use(passport.initialize());
app.use((req, res, next) => {
    res.send({ error: 'Route Not Found' });
});

app.listen(port, async () => {
    console.log(`Server is listening at port ${port}`)
})
