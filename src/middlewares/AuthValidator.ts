import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator'

const validate = [
  check('username', 'Username is required').isString(),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  }
];


export default validate