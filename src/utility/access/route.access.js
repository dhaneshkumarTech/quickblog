import constant from '../../constant/constant.js'

const routeAccess = (role) => (req, res, next) => {
    try {
        if (role === req.user.role) {
            next()
        }
        else {
            res.status(400).send({ error: "Cannot access the route." })
        }
    }
    catch (err) {
        res.send(err)
    }
}

const isAdmin = routeAccess(constant.role.admin)
const isCreater = routeAccess(constant.role.creater)
const isConsumer = routeAccess(constant.role.consumer)

export default { isAdmin, isCreater, isConsumer }