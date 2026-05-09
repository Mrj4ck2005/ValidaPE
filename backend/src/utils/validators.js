import Joi from 'joi';

// Validar DNI peruano (8 dígitos)
export const validateDNI = (dni) => {
  const schema = Joi.string()
    .required()
    .length(8)
    .pattern(/^\d+$/)
    .messages({
      'string.length': 'El DNI debe tener exactamente 8 dígitos',
      'string.pattern.base': 'El DNI solo debe contener números',
      'any.required': 'El DNI es requerido',
    });

  return schema.validate(dni);
};

// Validar RUC peruano (11 dígitos)
export const validateRUC = (ruc) => {
  const schema = Joi.string()
    .required()
    .length(11)
    .pattern(/^\d+$/)
    .messages({
      'string.length': 'El RUC debe tener exactamente 11 dígitos',
      'string.pattern.base': 'El RUC solo debe contener números',
      'any.required': 'El RUC es requerido',
    });

  return schema.validate(ruc);
};