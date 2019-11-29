const Joi = require('@hapi/joi');
const logger = require('../lib/logger');

const AttendeeSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    lastname: Joi.string().min(2).max(150).required(),
    email: Joi.string().required(),
    cellphone: Joi.string().required(),
    dni: Joi.string().required(),
    university: Joi.string().required(),
    assistance: Joi.boolean()
});

const validateAttendee = (req, res, next) => {
    const validation = AttendeeSchema.validate(req.body);

    if (validation.error) {
        logger.error('Error en la validación del usuario:', req.body);
        return res.status(403).json({ msg: 'Error en la validación del usuario' })
    }
    next();
}

module.exports = validateAttendee;