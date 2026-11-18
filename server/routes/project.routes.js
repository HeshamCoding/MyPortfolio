import express from 'express'
import projectCtrl from '../controllers/project.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Anyone can view projects.
// Only the signed-in admin can add, edit or delete them.
router
    .route('/api/projects')
    .get(projectCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.removeAll)

router
    .route('/api/projects/:projectId')
    .get(projectCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, projectCtrl.remove)

// Load the project whenever :projectId is in the URL
router.param('projectId', projectCtrl.projectByID)

export default router
