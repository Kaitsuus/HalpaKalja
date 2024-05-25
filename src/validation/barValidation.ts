import Joi from 'joi';

const drinksSchema = Joi.object().pattern(Joi.string(), Joi.number());

const adSchema = Joi.object({
  offer: Joi.string().allow(''),
  timeRange: Joi.string().allow('')
});

const dailyDetailsSchema = Joi.object({
  hours: Joi.string().allow(''),
  offer: Joi.string().allow('')
});

const openHoursSchema = Joi.alternatives().try(
  Joi.string(),
  Joi.object({
    Monday: dailyDetailsSchema.optional(),
    Tuesday: dailyDetailsSchema.optional(),
    Wednesday: dailyDetailsSchema.optional(),
    Thursday: dailyDetailsSchema.optional(),
    Friday: dailyDetailsSchema.optional(),
    Saturday: dailyDetailsSchema.optional(),
    Sunday: dailyDetailsSchema.optional()
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

export const bulkBarSchema = Joi.array().items(barSchema);
