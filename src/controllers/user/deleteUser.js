const userModel = require('../../models/user');

module.exports = async (req, res, next) => {
    const { userId } = req.params;

    const user = await userModel.findByIdAndDelete(userId);
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
            userId
        }
    })

}