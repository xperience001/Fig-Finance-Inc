import Joi from "joi";

export const addEventValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    description: Joi.string().required(),
    address: Joi.string().required(),
    isVirtual: Joi.boolean(),
    date: Joi.date().required(),
    category: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const { details } = error;
    res.status(422);
    throw new Error(details[0].message);
  }

  return next();
};
