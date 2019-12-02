const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 150,
        required: [true, 'Attendee debe tener un name']
    },
    lastname: {
        type: String,
        minlength: 2,
        maxlength: 150,
        required: [true, 'Attendee debe tener una lastname']
    },
    email: {
        type: String,
        required: [true, 'Attendee debe tener un email']
    },
    cellphone: {
        type: String,
        required: [true, 'Attendee debe tener un cellphone']
    },
    dni: {
        type: String,
        required: [true, 'Attendee debe tener un dni']
    },
    university: {
        type: String,
        required: [true, 'Attendee debe tener un university']
    },
    assistance: {
        type: Boolean,
        required: [false, 'go'],
        default: false
    }

});

module.exports = mongoose.model('attendee', attendeeSchema);