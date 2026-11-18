import mongoose from 'mongoose'
import Qualification from '../models/qualification.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Only these fields can be set from a request body
const pickFields = (body = {}) => {
    const { title, firstname, lastname, email, completion, description } = body
    return { title, firstname, lastname, email, completion, description }
}

// Sends 400 for bad input, 500 for real server errors
const sendError = (res, err) => {
    const status = errorHandler.isClientError(err) ? 400 : 500
    return res.status(status).json({ error: errorHandler.getErrorMessage(err) })
}

// GET /api/qualifications
const list = async (req, res) => {
    try {
        const qualifications = await Qualification.find()
        res.json(qualifications)
    } catch (err) {
        sendError(res, err)
    }
}

// POST /api/qualifications
const create = async (req, res) => {
    try {
        const qualification = new Qualification(pickFields(req.body))
        await qualification.save()
        res.status(201).json({ message: 'Qualification created successfully', qualification })
    } catch (err) {
        sendError(res, err)
    }
}

// Runs automatically for any route with :qualificationId.
// Checks the id is valid, loads the qualification and stores it in req.qualification.
const qualificationByID = async (req, res, next, id) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid qualification id' })
    }
    try {
        const qualification = await Qualification.findById(id)
        if (!qualification) {
            return res.status(404).json({ error: 'Qualification not found' })
        }
        req.qualification = qualification
        next()
    } catch (err) {
        sendError(res, err)
    }
}

// GET /api/qualifications/:qualificationId
const read = (req, res) => {
    res.json(req.qualification)
}

// PUT /api/qualifications/:qualificationId
const update = async (req, res) => {
    try {
        const qualification = req.qualification
        const updates = pickFields(req.body)
        // Only change the fields that were actually sent
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) qualification[key] = updates[key]
        })
        await qualification.save()
        res.json({ message: 'Qualification updated successfully', qualification })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/qualifications/:qualificationId
const remove = async (req, res) => {
    try {
        await req.qualification.deleteOne()
        res.json({ message: 'Qualification deleted successfully', qualification: req.qualification })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/qualifications
const removeAll = async (req, res) => {
    try {
        const result = await Qualification.deleteMany({})
        res.json({ message: `${result.deletedCount} qualification(s) deleted successfully` })
    } catch (err) {
        sendError(res, err)
    }
}

export default { list, create, qualificationByID, read, update, remove, removeAll }
