const userModel = require('../../models/user');

module.exports = async (req, res) => {
    const users = await userModel.find();
    res.json({
        status: "success",
        result: {
            users
        }
    })
}