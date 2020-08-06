const userModel = require('../../models/user');
const { get } = require('lodash');

module.exports = async (req, res, next) => {
    const user = new userModel(get(req, 'body.request.user'));
    await user.save();
    res.status(200).json({
        status: "success",
        result: {
            user,
            token: user.getJWTToken()
        }
    })
}