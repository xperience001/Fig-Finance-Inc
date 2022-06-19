import Joi from "joi";

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    role: Joi.forbidden(),
    password: Joi.string()
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .min(8),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    let message;
    const { details } = error;
    message = details[0].message;
    if (details[0].type === "string.pattern.base") {
      message =
        "Password must contain a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
    }

    res.status(422);
    throw new Error(message);
  }

  return next();
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    const { details } = error;
    res.status(422);
    throw new Error(details[0].message);
  }

  return next();
};
