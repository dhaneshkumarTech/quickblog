import constant from '../constant/constant.js'
import asyncHandler from '../error/try-catch.js'
import adminService from '../service/admin.service.js'


const getConsumers = asyncHandler(async (req, res) => {
    const Consumers = await adminService.getUsers({ role: "consumer" })
    if (!Consumers) {
        res.send({ error: "No consumer" })
    }
    res.send(Consumers)
})

const getCreaters = asyncHandler(async (req, res) => {
    const users = await adminService.getUsers({ role: "creater" })
    if (!users) {
        res.send({ error: "No creater" })
    }
    res.send(users)
})

const getCreaterRequests = asyncHandler(async (req, res) => {
    const createrRequestedUsers = await adminService.getUsers({ createrStatus: "Pending" })
    if (!createrRequestedUsers) {
        res.send({ error: "No user's request is pending" })
    }
    res.send(createrRequestedUsers)
})

const processRequest = asyncHandler(async (req, res) => {

    const { userId, requestStatus } = req.body
    let role = constant.role.consumer
    if (requestStatus === constant.requestStatus.accpeted) {
        role = constant.role.creater
    }

    await adminService.updateRequest(userId, requestStatus, role)
    const users = await adminService.getUsers({ createrStatus: "Pending" })
    res.send({ users: users })

})

const processAllRequests = asyncHandler(async (req, res) => {

    const requestStatus = req.body.requestStatus;
    let role = constant.role.consumer
    if (requestStatus === constant.requestStatus.accpeted) {
        role = constant.role.creater
    }

    await adminService.updateAllRequests(constant.createrStatus.pending, requestStatus, role)
    const users = await adminService.getUsers({ createrStatus: "Pending" })
    res.send({ users: users })
})


export default { getConsumers, getCreaters, getCreaterRequests, processRequest, processAllRequests }