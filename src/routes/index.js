const { login, register, me, deleteUser, updateUser, fetchUserById, getAllUsers } = require('../controllers');
const asyncErrorHandler = require('../helpers/asyncErrorHandler');
const { get } = require('lodash');
const { loginValidator, updateUserValidator } = require('../validators/user');
const path = require('path');
module.exports = app => {

    //fetches the list of users in the system
    app.get('/users', asyncErrorHandler(getAllUsers))

    app.post('/register', asyncErrorHandler(register));

    app.post('/login', loginValidator(), asyncErrorHandler(login));

    // this is a protected route and you've to pass Authorization header to fetch the loggedIn user information
    app.get('/me', asyncErrorHandler(me));

    app.route('/user/:userId')
        .delete(asyncErrorHandler(deleteUser))
        .patch(updateUserValidator(), asyncErrorHandler(updateUser))
        .get(asyncErrorHandler(fetchUserById))

    // this route renders the API documentation
    app.get('/', (req, res) => {
        res.render('index');
    })

    // common error handler
    app.use((err, req, res, next) => {
        res.status(500).json({
            status: "failed",
            err: get(err, 'message'),
            result: {}
        })
    })

    //handles non configured routes
    app.all("*", (req, res) => {
        res.json({
            status: "failed",
            result: {},
            err: "route not found"
        })
    })
}