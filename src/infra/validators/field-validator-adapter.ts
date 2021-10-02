import { Validation } from '@data/contracts/validation'
import Joi from 'joi'

export class FieldValidatorAdapter implements Validation {
  validate(input: object): Error {
    const schema = Joi.object({
      name: Joi.string()
        .required()
        .messages({ 'any.required': 'name is a required' }),
      email: Joi.string().email().required().messages({
        'any.required': 'email is a required',
        'string.email': 'must be a valid email',
      }),
      password: Joi.string()
        .required()
        .messages({ 'any.required': 'password is a required' }),
    })
    const { error } = schema.validate(input, { abortEarly: false })
    if (!error) return null
    const message = error.details.map((i) => i.message).join(', ')
    return new Error(message)
  }
}
