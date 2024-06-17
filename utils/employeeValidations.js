const Joi = require('joi')

function validateEmployee(employee) {
    const employeeSchema = Joi.object({
      firstName: Joi.string().required().min(5).max(50),
      lastName: Joi.string().required().min(5).max(50),
      email: Joi.string().required().email(),
      nationalId: Joi.string(),
      telephone: Joi.string().required().max(50),
      department: Joi.string().required().max(50),
      position: Joi.string().required().max(50),
      laptopManufacturer: Joi.string().required().max(50),
      model: Joi.string().required().max(50),
      serialNumber: Joi.string().required().max(50)
    });
    return employeeSchema.validate(employee)
}

module.exports.validate = validateEmployee