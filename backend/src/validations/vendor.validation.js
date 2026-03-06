import Joi from "joi";

export const vendorProfileValidation = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().required(),
  description: Joi.string().min(10).required(),
  priceRange: Joi.string().required(),
});

export const serviceValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  duration: Joi.string().required(),
});
