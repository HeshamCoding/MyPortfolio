import mongoose from 'mongoose'
import User from '../models/user.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Only these fields can be set from a request body (created/updated are handled by the server)
const pickFields = (body = {}) => {
    const { name, email, password } = body
    return { name, email, password }
}

// Sends 400 for bad input, 500 for real server errors
const sendError = (res, err) => {
    const status = errorHandler.isClientError(err) ? 400 : 500
    return res.status(status).json({ error: errorHandler.getErrorMessage(err) })
}

// GET /api/users
const list = async (req, res) => {
    try {
        const users = await User.find().select('name email created updated')
        res.json(users)
    } catch (err) {
        sendError(res, err)
    }
}

// POST /api/users  (sign up)
const create = async (req, res) => {
    try {
        const user = new User(pickFields(req.body))
        await user.save() // password is hashed in the model before saving
        res.status(201).json({ message: 'Successfully signed up!', user })
    } catch (err) {
        sendError(res, err)
    }
}

// Runs automatically for any route with :userId.
// Checks the id is valid, loads the user and stores it in req.profile.
const userByID = async (req, res, next, id) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid user id' })
    }
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        req.profile = user
        next()
    } catch (err) {
        sendError(res, err)
    }
}

// GET /api/users/:userId
const read = (req, res) => {
    res.json(req.profile)
}

// PUT /api/users/:userId
const update = async (req, res) => {
    try {
        const user = req.profile
        const updates = pickFields(req.body)
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) user[key] = updates[key]
        })
        user.updated = Date.now()
        await user.save() // re-hashes the password only if it was changed
        res.json({ message: 'User updated successfully', user })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/users/:userId
const remove = async (req, res) => {
    try {
        await req.profile.deleteOne()
        res.json({ message: 'User deleted successfully', user: req.profile })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/users
const removeAll = async (req, res) => {
    try {
        const result = await User.deleteMany({})
        res.json({ message: `${result.deletedCount} user(s) deleted successfully` })
    } catch (err) {
        sendError(res, err)
    }
}

export default { list, create, userByID, read, update, remove, removeAll }
