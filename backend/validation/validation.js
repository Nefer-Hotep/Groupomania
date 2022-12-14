const Joi = require("joi");

const userValidation = (body) => {
    const UserSchema = Joi.object({
        pseudo: Joi.string().min(3).max(40).trim().required(),
        email: Joi.string().min(3).max(40).trim().required(),
        password: Joi.string().min(3).max(40).trim().required(),
    });
    return UserSchema.validate(body);
};

module.exports = userValidation;
