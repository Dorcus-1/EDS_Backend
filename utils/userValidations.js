const password_complexity = require('joi-password-complexity')
const Joi = require('joi')

function validateUser(user) {
    const userSchema =Joi.object({
        email:Joi.string().required().email(),
        password:password_complexity(),
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
 
    })

    return userSchema.validate(user)
}
module.exports.validate = validateUser