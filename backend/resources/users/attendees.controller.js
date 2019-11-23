const Attendee = require('./attendees.models');

function create(attendee) {
    return new Attendee(attendee).save();
}

function getAttendees() {
    return Attendee.find({});
}

function get(id) {
    return Attendee.findById(id);
}

function getUAttendeeByUsername(username) {
    return Attendee.findOne(username)
}

function update(id, user) {
    return Attendee.findOneAndUpdate({ _id: id }, { ...user }, { new: true });
}

function remove(id) {
    return Attendee.findOneAndDelete(id);
}

module.exports = {
    create,
    getAttendees,
    get,
    getUAttendeeByUsername,
    update,
    remove,
}