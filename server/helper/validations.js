import Joi from "joi";

/**
 * Validate on user input for
 *
 * @param {*} data
 * @returns {*}
 */

export const validateAuthInput = (data) => {
  const schema = Joi.object({
    accountId: Joi.string().required().label("Student ID"),
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
