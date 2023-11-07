import asyncHandler from '../error/try-catch.js'
import constant from '../constant/constant.js'


const routeAccess = (role) => asyncHandler((req, res, next) => {
    if (role === req.user.role) {
        next()
    }
    else {
        res.status(400).send({ error: "Cannot access the route." })
    }

})

const isAdmin = routeAccess(constant.role.admin)
const isCreater = routeAccess(constant.role.creater)
const isConsumer = routeAccess(constant.role.consumer)

export default { isAdmin, isCreater, isConsumer }