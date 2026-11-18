// Turns Mongoose/MongoDB errors into short, readable messages for the API response.
const getErrorMessage = (err) => {
    // Duplicate value on a unique field (e.g. email already used)
    if (err.code === 11000 || err.code === 11001) {
        const field = Object.keys(err.keyValue || err.keyPattern || {})[0]
        return field ? `${field} already exists` : 'A record with this value already exists'
    }

    // Schema validation failed (required field missing, bad email, wrong date, etc.)
    if (err.name === 'ValidationError') {
        return Object.values(err.errors)
            .map((e) => (e.name === 'CastError' ? `Invalid value for ${e.path}` : e.message))
            .join(', ')
    }

    // Wrong data type (e.g. "completion": "not-a-date")
    if (err.name === 'CastError') {
        return `Invalid value for ${err.path}`
    }

    return 'Something went wrong'
}

// True for errors caused by bad input (400), false for real server problems (500)
const isClientError = (err) =>
    ['ValidationError', 'CastError'].includes(err.name) || err.code === 11000 || err.code === 11001

export default { getErrorMessage, isClientError }
