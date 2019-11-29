const Attendee = require('./attendees.models');

function create(attendee) {
    return new Attendee(attendee).save();
}

function getAttendees() {
    return Attendee.find({});
}

function getByDni(id) {
    return Attendee.findById(id);
}

function getUAttendeeByUsername(username) {
    return Attendee.findOne(username)
}

function update(dni, user) {
    return Attendee.findOneAndUpdate({ dni: dni }, { ...user }, { new: true });
}


function remove(id) {
    return Attendee.findOneAndDelete(id);
}

module.exports = {
    create,
    getAttendees,
    getByDni,
    getUAttendeeByUsername,
    update,
    remove,
}