import mongoose from 'mongoose'
import Contact from '../models/contact.model.js'
import errorHandler from '../helpers/dbErrorHandler.js'

// Only these fields can be set from a request body
const pickFields = (body = {}) => {
    const { firstname, lastname, email } = body
    return { firstname, lastname, email }
}

// Sends 400 for bad input, 500 for real server errors
const sendError = (res, err) => {
    const status = errorHandler.isClientError(err) ? 400 : 500
    return res.status(status).json({ error: errorHandler.getErrorMessage(err) })
}

// GET /api/contacts
const list = async (req, res) => {
    try {
        const contacts = await Contact.find()
        res.json(contacts)
    } catch (err) {
        sendError(res, err)
    }
}

// POST /api/contacts
const create = async (req, res) => {
    try {
        const contact = new Contact(pickFields(req.body))
        await contact.save()
        res.status(201).json({ message: 'Contact created successfully', contact })
    } catch (err) {
        sendError(res, err)
    }
}

// Runs automatically for any route with :contactId.
// Checks the id is valid, loads the contact and stores it in req.contact.
const contactByID = async (req, res, next, id) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid contact id' })
    }
    try {
        const contact = await Contact.findById(id)
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' })
        }
        req.contact = contact
        next()
    } catch (err) {
        sendError(res, err)
    }
}

// GET /api/contacts/:contactId
const read = (req, res) => {
    res.json(req.contact)
}

// PUT /api/contacts/:contactId
const update = async (req, res) => {
    try {
        const contact = req.contact
        const updates = pickFields(req.body)
        // Only change the fields that were actually sent
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) contact[key] = updates[key]
        })
        await contact.save()
        res.json({ message: 'Contact updated successfully', contact })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/contacts/:contactId
const remove = async (req, res) => {
    try {
        await req.contact.deleteOne()
        res.json({ message: 'Contact deleted successfully', contact: req.contact })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/contacts
const removeAll = async (req, res) => {
    try {
        const result = await Contact.deleteMany({})
        res.json({ message: `${result.deletedCount} contact(s) deleted successfully` })
    } catch (err) {
        sendError(res, err)
    }
}

export default { list, create, contactByID, read, update, remove, removeAll }
