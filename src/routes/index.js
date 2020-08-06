const { login, register, me, deleteUser, updateUser, fetchUserById, getAllUsers } = require('../controllers');
const asyncErrorHandler = require('../helpers/asyncErrorHandler');
const { get } = require('lodash');
const { loginValidator, updateUserValidator } = require('../validators/user');
module.exports = app => {

    app.get('/users', asyncErrorHandler(getAllUsers))

    app.post('/register', asyncErrorHandler(register));

    app.post('/login', loginValidator(), asyncErrorHandler(login));

    app.get('/me', asyncErrorHandler(me));

    app.route('/user/:userId')
        .delete(asyncErrorHandler(deleteUser))
        .patch(updateUserValidator(), asyncErrorHandler(updateUser))
        .get(asyncErrorHandler(fetchUserById))

    app.use((err, req, res, next) => {
        res.status(500).json({
            status: "failed",
            err: get(err, 'message'),
            result: {}
        })
    })
}