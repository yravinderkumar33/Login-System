const Joi = require('joi');

module.exports = {
    loginValidator: () => (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { value, error } = schema.validate(req.body);
        if (error) {
            return next(error);
        }
        next();
    },
    updateUserValidator: () => (req, res, next) => {
        const schema = Joi.object({
            request: Joi.object({
                user: Joi.object({
                    email: Joi.string().email().optional(),
                    password: Joi.string().optional(),
                    gender: Joi.string().optional()
                }).required()
            }).required()
        });
        const { value, error } = schema.validate(req.body);
        if (error) {
            return next(error);
        }
        next();
    }
}