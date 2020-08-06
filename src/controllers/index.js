
module.exports = {
    login: require('./user/login'),
    register: require('./user/signup'),
    me: require('./user/me'),
    deleteUser: require('./user/deleteUser'),
    updateUser: require('./user/updateUser'),
    fetchUserById: require('./user/fetchUserById')
}