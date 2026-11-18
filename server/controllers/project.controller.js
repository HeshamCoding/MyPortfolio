import mongoose from 'mongoose'
import Project from '../models/project.model.js'
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

// GET /api/projects
const list = async (req, res) => {
    try {
        const projects = await Project.find()
        res.json(projects)
    } catch (err) {
        sendError(res, err)
    }
}

// POST /api/projects
const create = async (req, res) => {
    try {
        const project = new Project(pickFields(req.body))
        await project.save()
        res.status(201).json({ message: 'Project created successfully', project })
    } catch (err) {
        sendError(res, err)
    }
}

// Runs automatically for any route with :projectId.
// Checks the id is valid, loads the project and stores it in req.project.
const projectByID = async (req, res, next, id) => {
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid project id' })
    }
    try {
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ error: 'Project not found' })
        }
        req.project = project
        next()
    } catch (err) {
        sendError(res, err)
    }
}

// GET /api/projects/:projectId
const read = (req, res) => {
    res.json(req.project)
}

// PUT /api/projects/:projectId
const update = async (req, res) => {
    try {
        const project = req.project
        const updates = pickFields(req.body)
        // Only change the fields that were actually sent
        Object.keys(updates).forEach((key) => {
            if (updates[key] !== undefined) project[key] = updates[key]
        })
        await project.save()
        res.json({ message: 'Project updated successfully', project })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/projects/:projectId
const remove = async (req, res) => {
    try {
        await req.project.deleteOne()
        res.json({ message: 'Project deleted successfully', project: req.project })
    } catch (err) {
        sendError(res, err)
    }
}

// DELETE /api/projects
const removeAll = async (req, res) => {
    try {
        const result = await Project.deleteMany({})
        res.json({ message: `${result.deletedCount} project(s) deleted successfully` })
    } catch (err) {
        sendError(res, err)
    }
}

export default { list, create, projectByID, read, update, remove, removeAll }
