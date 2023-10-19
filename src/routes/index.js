import express from 'express';
const router = express.Router()

import userRoutes from './user.routes.js'
import blogRoutes from './blog.routes.js';
import adminRoutes from './admin.routes.js'

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes)
router.use('/admin', adminRoutes)

router.use((req, res, next) => {
    res.send({ error: 'Route Not Found' });
});


export default router