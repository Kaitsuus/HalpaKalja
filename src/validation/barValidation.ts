// src/validation/barValidation.ts
import Joi from 'joi';

const drinksSchema = Joi.object().pattern(Joi.string(), Joi.number());

const adSchema = Joi.object({
  offer: Joi.string().allow(''),
  timeRange: Joi.string().allow('')
});

const openHoursSchema = Joi.alternatives().try(
  Joi.string(),
  Joi.object({
    Monday: Joi.string().allow(''),
    Tuesday: Joi.string().allow(''),
    Wednesday: Joi.string().allow(''),
    Thursday: Joi.string().allow(''),
    Friday: Joi.string().allow(''),
    Saturday: Joi.string().allow(''),
    Sunday: Joi.string().allow('')
  })
);

export const barSchema = Joi.object({
  name: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  drinks: drinksSchema,
  open_hours: openHoursSchema.required(),
  ad: adSchema.optional()
});
