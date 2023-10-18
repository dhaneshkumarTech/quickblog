import User from '../model/user.model.js'
import constant from '../constant/constant.js'

const createrRequest = async (req, res) => {
    try {
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
            res.send({ success: "Received update role request" })
        }
    }
    catch (err) {
        res.send(err)
    }
}

const processRequest = async (req, res) => {
    try {
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

    }
    catch (err) {
        res.send(err)
    }
}

const processAllRequest = async (req, res) => {
    try {
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
    }
    catch (err) {
        res.send(err)
    }
}




export default { createrRequest, processRequest, processAllRequest }