import Joi from "joi";

export const bookingValidation = Joi.object({
  vendor: Joi.string().required(),
  service: Joi.string().required(),
  bookingDate: Joi.date().greater("now").required(),
  totalAmount: Joi.number().positive().required(),
});
