const User = require('./users.models');

function create(user) {
    return new User(user).save();
}

function getUsers() {
    return User.find({});
}

function get(id) {
    return User.findById(id);
}

function getUserByUsername(username) {
    return User.findOne(username)
}

function update(id, user) {
    return User.findOneAndUpdate({ _id: id }, { ...user }, { new: true });
}

function remove(id) {
    return User.findOneAndDelete(id);
}

module.exports = {
    create,
    getUsers,
    get,
    getUserByUsername,
    update,
    remove,
}