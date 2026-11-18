import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Anyone can sign up (POST).
// Listing all users and deleting all users is admin-only.
router
    .route('/api/users')
    .get(authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.list)
    .post(userCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, userCtrl.removeAll)

// A signed-in user can view/edit/delete their OWN account (the admin can manage any account)
router
    .route('/api/users/:userId')
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

// Load the user whenever :userId is in the URL
router.param('userId', userCtrl.userByID)

export default router
