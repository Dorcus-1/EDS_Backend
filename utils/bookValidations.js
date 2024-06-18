const Joi = require('joi')

function validateBook(book) {
    const bookSchema = Joi.object({
      name: Joi.string().required().min(2).max(50),
      author: Joi.string().required().min(5).max(50),
      publisher: Joi.string().required(),
      publicationYear: Joi.number().required(),
      subject: Joi.string().required().max(50),
     
    });
    return bookSchema.validate(book)
}

module.exports.validate = validateBook