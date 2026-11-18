import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        required: 'Email is required',
    },
    // Stores the HASHED password, never the plain text.
    // select: false = not returned by queries unless we ask for it.
    password: {
        type: String,
        required: 'Password is required',
        minlength: [6, 'Password must be at least 6 characters'],
        select: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
})

// Before saving: if the password was set or changed, replace it with a bcrypt hash
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)
})

// Check a plain-text password against the stored hash (used at sign-in)
UserSchema.methods.authenticate = function (plainText) {
    return bcrypt.compare(plainText, this.password)
}

// Never include the password when a user is sent back as JSON
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password
        delete ret.__v
        return ret
    },
})

export default mongoose.model('User', UserSchema, 'users')
