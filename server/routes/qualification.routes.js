import express from 'express'
import qualificationCtrl from '../controllers/qualification.controller.js'
import authCtrl from '../controllers/auth.controller.js'

const router = express.Router()

// Anyone can view qualifications (education).
// Only the signed-in admin can add, edit or delete them.
router
    .route('/api/qualifications')
    .get(qualificationCtrl.list)
    .post(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.create)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.removeAll)

router
    .route('/api/qualifications/:qualificationId')
    .get(qualificationCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.requireAdmin, qualificationCtrl.remove)

// Load the qualification whenever :qualificationId is in the URL
router.param('qualificationId', qualificationCtrl.qualificationByID)

export default router
