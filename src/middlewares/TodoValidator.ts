import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator'

const validateTodo = [
  check('description')
    .notEmpty()
    .withMessage('description is required')
    .isLength({ min: 6 })
    .withMessage('description must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    next();
  }
];


export default validateTodo