import Joi from "joi";

export const addCategoryValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const { details } = error;
    res.status(422);
    throw new Error(details[0].message);
  }

  return next();
};
