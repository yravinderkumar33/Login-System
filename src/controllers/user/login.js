const userModel = require('../../models/user');
const { get } = require('lodash');
module.exports = async (req, res, next) => {
    const { password, email } = get(req, 'body');
    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).json({
            err: "user doesn't exist",
            status: "failed",
            result: {}
        })
    }
    const isPasswordMatched = await user.matchPassword(password);
    if (!isPasswordMatched) {
        return res.status(404).json({
            err: "incorrect password",
            status: "failed",
            result: {}
        })
    }
    res.status(200).json({
        status: "success",
        result: {
            token: user.getJWTToken()
        }
    });
}