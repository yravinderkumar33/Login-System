const userModel = require('../../models/user');
const jwt = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).json({
            status: "unauthorized"
        })
    }
    const [bearer, jwtToken] = authorization.split(" ");

    // if (typeof bearer !== 'string' && bearer.toLowerCase() !== 'bearer') {
    //     return res.status(400).json({
    //         status: "unauthorized"
    //     })
    // }

    const { exp, data, iat } = jwt.verify(jwtToken, process.env.JWT_SECRET);

    const user = await userModel.findById(data);

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