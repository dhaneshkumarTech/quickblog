import User from '../model/user.model.js'
import constant from '../constant/constant.js'
import asyncHandler from '../utility/error/tryCatch.error.js'


const createrRequest = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    const createrStatus = user.createrStatus
    if (createrStatus === constant.createrStatus.rejected) {
        res.send({ error: "Not eligible for creater account" })
    }
    else if (createrStatus === constant.createrStatus.pending) {
        res.send({ message: "Request is under process" })
    }
    else if (createrStatus === constant.createrStatus.accpeted) {
        res.send({ error: "Already Creater" })
    }
    else {
        user.createrStatus = constant.createrStatus.pending
        await user.save()
        res.send({ success: "Your request has been recieved" })
    }
})
const processRequest = asyncHandler(async (req, res) => {

    const requestStatus = req.body.requestStatus;
    let role = constant.role.consumer
    if (requestStatus === constant.requestStatus.accpeted) {
        role = constant.role.creater
    }

    await User.findOneAndUpdate(
        { _id: req.params['userId'] },
        {
            $set: {
                createrStatus: requestStatus,
                role: role
            }
        }
    )
    res.send({ message: "Request is processed," })

})

const processAllRequest = asyncHandler(async (req, res) => {

    const requestStatus = req.body.requestStatus;
    let role = constant.role.consumer
    if (requestStatus === constant.requestStatus.accpeted) {
        role = constant.role.creater
    }

    const user = await User.updateMany({ createrStatus: "Pending" }, { $set: { createrStatus: requestStatus, role: role } })
    if (!user) {
        res.send({ message: "No requests are in pending list" })
    }
    else {
        res.send({ message: "All Requests Processed" })
    }
})




export default { createrRequest, processRequest, processAllRequest }