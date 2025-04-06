import { body } from 'express-validator'

const userRegisterValidator = () => {
  return [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at least 3 characters long')
      .isLength({ max: 20 })
      .withMessage('Username must be at most 20 characters long'),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('fullName')
      .trim()
      .notEmpty()
      .withMessage('Full name is required')
      .isLength({ min: 3 })
      .withMessage('Full name must be at least 3 characters long')
      .isLength({ max: 50 })
      .withMessage('Full name must be at most 50 characters long')
  ]
}


const userLoginValidator = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
  ]
}

export { userRegisterValidator, userLoginValidator }