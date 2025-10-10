// src/middleware/validate.js
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false }); // validate all errors
  if (error) {
    const message = error.details.map(d => d.message).join(', ');
    return res.status(400).json({ status: 'fail', message });
  }
  req.body = value; // assign validated values
  next();
};

module.exports = validate;
