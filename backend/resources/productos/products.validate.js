const Joi = require('@hapi/joi')

const productSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  price: Joi.number().min(0).required(),
  currency: Joi.string().min(3).max(3).required(),
  owner: Joi.required(),
});


const validateProduct = (req, res, next) => {
  const validation = productSchema.validate(req.body);

  if (validation.error) {
    logger.error('Error en la validación del producto:', req.body);
    return res.status(403).send('Error en la validación del producto');
  }
  next()
}


module.exports = validateProduct;
