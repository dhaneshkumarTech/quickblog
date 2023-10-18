import express from 'express';
import 'dotenv/config.js';
import { connection as _connectDB } from './src/config/db.config.js'
import userRoutes from './src/routes/user.routes.js'
import blogRoutes from './src/routes/blog.routes.js';
import admingRoutes from './src/routes/admin.routes.js'
import passport from 'passport';

_connectDB();
const port = process.env.PORT;
const app = express();


app.use(express.json())
app.use('/user', userRoutes);
app.use('/blogs', blogRoutes)
app.use('/admin', admingRoutes)
app.use(passport.initialize());
app.use((req, res, next) => {
    res.send({ error: 'Route Not Found' });
});

app.listen(port, async () => {
    console.log(`Server is listening at port ${port}`)
})
