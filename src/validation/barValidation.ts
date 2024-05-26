import Joi from 'joi';

const drinksSchema = Joi.object().pattern(Joi.string(), Joi.number());

const dailyDetailsSchema = Joi.object({
  hours: Joi.string().allow(''),
  offer: Joi.string().allow('')
});

const openHoursSchema = Joi.object({
  Monday: dailyDetailsSchema.optional(),
  Tuesday: dailyDetailsSchema.optional(),
  Wednesday: dailyDetailsSchema.optional(),
  Thursday: dailyDetailsSchema.optional(),
  Friday: dailyDetailsSchema.optional(),
  Saturday: dailyDetailsSchema.optional(),
  Sunday: dailyDetailsSchema.optional()
});

export const barSchema = Joi.object({
  name: Joi.string().required(),
  lat: Joi.number().required(),
  lng: Joi.number().required(),
  drinks: drinksSchema.required(),
  open_hours: openHoursSchema.required(),
  verified: Joi.boolean().allow(null)
});

export const bulkBarSchema = Joi.array().items(barSchema);
