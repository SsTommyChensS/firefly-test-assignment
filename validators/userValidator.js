const { check, validationResult } = require('express-validator');

//1. User add validator
const validateAddUser = [
    check('firstname')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Firstname is required!')
        .isString()
        .withMessage('Firstname must be a string value!')
        .isLength({ min: 2})
        .withMessage('Firstname must be from 2 charaters!'),
    check('lastname')
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Lastname is required!')
        .isString()
        .withMessage('Lastname must be a string value!')
        .isLength({ min: 2})
        .withMessage('Lastname must be from 2 charaters!'),
    check('age')
        .notEmpty()
        .withMessage('Age is required!')
        .isInt()
        .withMessage('Age must be a number value!')
        .isFloat({ min: 1, max: 100 })
        .withMessage('Age must be from 1 to 100!'),
    check('coordinate')
        .notEmpty()
        .withMessage('Coordinate is required!')
        .isLength({ min: 7, max: 7})
        .withMessage('Coordinate must be 7 charaters and value like: xxx:yyy with x and y from 0-9')
        .matches(/[0-9]{3}:[0-9]{3}/)
        .withMessage('Coordianate value is not valid!'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];
//2. Edit user validator
const validateEditUser = [
    check('firstname')
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Firstname is required!')
        .isString()
        .withMessage('Firstname must be a string value!')
        .isLength({ min: 2})
        .withMessage('Firstname must be from 2 charaters!'),
    check('lastname')
        .optional()
        .trim()
        .escape()
        .notEmpty()
        .withMessage('Lastname is required!')
        .isString()
        .withMessage('Lastname must be a string value!')
        .isLength({ min: 2})
        .withMessage('Lastname must be from 2 charaters!'),
    check('age')
        .optional()
        .notEmpty()
        .withMessage('Age is required!')
        .isNumeric()
        .withMessage('Age must be a number value!')
        .isFloat({ min: 1, max: 100 })
        .withMessage('Age must be from 1 to 100!'),
    check('coordinate')
        .optional()
        .notEmpty()
        .withMessage('Coordinate is required!')
        .isLength({ min: 7, max: 7})
        .withMessage('Coordinate must be 7 charaters and value like: xxx:yyy with x and y from 0-9')
        .matches(/[0-9]{3}:[0-9]{3}/)
        .withMessage('Coordianate value is not valid!'),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(422).send({
                success: false,
                errors: errors.array()
            });
        }

        next();
    }
];

const userValidator = {
    validateAddUser,
    validateEditUser
}

module.exports = userValidator;