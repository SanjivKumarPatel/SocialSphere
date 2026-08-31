import bcrypt from 'bcryptjs'

import User from '../models/User.js'
import generateToken from '../utils/generateToken.js'

/**
 * @desc Registers a new user
 * @route POST /api/auth/register
 * @access Public
 */

export const registerUser = async (req, res) => {
  try {
    const {username, email, password} = req.body

    if(!username || !email || !password){
      return res.status(400).json({
        success : false,
        message : 'All fields are required'
      })
    }

    const existingUser = await User.findOne({email})

    if(existingUser){
      return res.status(400).json({
        success : false,
        message : 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email,
      password : hashedPassword
    })

    const token = generateToken(user._id)

    res.status(201).json({
      success : true,
      message : 'User registered successfully',
      token,
      user : {
        id : user._id,
        username : user.username,
        email : user.email
      }
    })
  } catch (error) {
    console.error('Registration error:', error.message)

    res.status(500).json({
      success : false,
      message : 'Internal server error'
    })
  }
}

/**
 * @desc Logs in an existing user
 * @route POST /api/auth/login
 * @access Public
 */

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body

    if(!email || !password){
      return res.status(400).json({
        success : false,
        message : 'Email and password are required'
      })
    }

    const user = await User.findOne({email})

    if(!user){
      return res.status(401).json({
        success : false,
        message : 'Invalid email or password'
      })
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
      return res.status(401).json({
        success : false,
        message : 'Invalid email or password'
      })
    }

    const token = generateToken(user._id)

    res.status(200).json({
      success : true,
      message : 'Login successful',
      token,
      user : {
        id : user._id,
        username : user.username,
        email : user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error.message)

    res.status(500).json({
      success : false,
      message : 'Internal server error'
    })
  }
}