import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.model.js'
import config from '../config/config.js'

// POST /auth/signin  { "email": "...", "password": "..." }
const signin = async (req, res) => {
    try {
        const { email, password } = req.body || {}
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        // Password is hidden by default, so ask for it explicitly here
        const user = await User.findOne({ email: String(email).toLowerCase() }).select('+password')

        // Same message for "no user" and "wrong password" so attackers can't tell which
        if (!user || !(await user.authenticate(password))) {
            return res.status(401).json({ error: "Email and password don't match" })
        }

        // Create the JWT (valid for 1 day)
        const token = jwt.sign({ _id: user._id }, config.jwtSecret, { expiresIn: '1d' })

        // Also store it in a cookie named "t" (httpOnly = JavaScript in the browser can't read it)
        res.cookie('t', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: config.env === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email },
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Could not sign in' })
    }
}

// GET /auth/signout
// Clears the cookie. (A JWT can't be "cancelled"; the client should also delete its stored token.)
const signout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: 'Signed out' })
}

// Middleware: request must have a valid JWT.
// Reads "Authorization: Bearer <token>" first, then the "t" cookie.
// On success the token data is available as req.auth (e.g. req.auth._id).
const requireSignin = expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    getToken: (req) => {
        const header = req.headers.authorization
        if (header && header.startsWith('Bearer ')) return header.split(' ')[1]
        if (req.cookies && req.cookies.t) return req.cookies.t
        return null
    },
})

// Helper: is the signed-in user the admin (email matches ADMIN_EMAIL in .env)?
const isAdminUser = async (req) => {
    if (!config.adminEmail || !req.auth) return false
    const user = await User.findById(req.auth._id)
    return Boolean(user && user.email === config.adminEmail)
}

// Middleware: only the admin can continue
const requireAdmin = async (req, res, next) => {
    if (await isAdminUser(req)) return next()
    return res.status(403).json({ error: 'Admin access required' })
}

// Middleware: only the owner of this account (req.profile) or the admin can continue
const hasAuthorization = async (req, res, next) => {
    const isOwner = req.profile && req.auth && String(req.profile._id) === String(req.auth._id)
    if (isOwner || (await isAdminUser(req))) return next()
    return res.status(403).json({ error: 'User is not authorized' })
}

export default { signin, signout, requireSignin, requireAdmin, hasAuthorization }
