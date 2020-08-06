const userModel = require('../../models/user');
const { get } = require('lodash');
module.exports = async (req, res, next) => {
    const { userId } = req.params;
    const user = await userModel.findByIdAndUpdate(userId, get(req, 'body.request.user'));
    if (!user) {
        return res.status(404).json({
            status: "failed",
            result: {},
            err: "user not found"
        })
    }
    res.status(200).json({
        status: "success",
        result: {
            user
        }
    })
}