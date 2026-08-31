import express from 'express'

import { registerUser, loginUser } from '../controllers/authController.js'

const authRouter = express.Router()

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */

authRouter.post('/register', registerUser)

/**
 * @desc Login an existing user
 * @route POST /api/auth/login
 * @access Public
 */

authRouter.post('/login', loginUser)

export default authRouter