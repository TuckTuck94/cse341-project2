// validation.js

const { body, param, validationResult } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createstudents":
      return [
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("studentsId").notEmpty().withMessage("Student ID is required"),
        body("birthday").notEmpty().withMessage("Birthday is required"),
      ];
    case "updatestudents":
      return [
        param("id").notEmpty().withMessage("Student ID is required"),
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("email").isEmail().withMessage("Invalid email address"),
        body("studentsId").notEmpty().withMessage("Student ID is required"),
        body("birthday").notEmpty().withMessage("Birthday is required"),
      ];
  }
};

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validate,
  handleValidationErrors,
};
