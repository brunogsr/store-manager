const errors = {
    'number.min': 422,
    'any.required': 400,
};

const errorMap = (errorType) => errors[errorType] || 500;

module.exports = errorMap;