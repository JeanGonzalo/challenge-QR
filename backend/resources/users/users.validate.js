const Joi = require('@hapi/joi');
const logger = require('../lib/logger');

const UserSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    username: Joi.string().min(2).max(50).required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    cellphone: Joi.string().required(),
});

const validateUser = (req, res, next) => {
    const validation = UserSchema.validate(req.body);

    if (validation.error) {
        logger.error('Error en la validación del usuario:', req.body);
        return res.status(403).json({ msg: 'Error en la validación del usuario' })
    }
    next();
}

module.exports = validateUser;