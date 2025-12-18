import bcrypt from 'bcrypt';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'




export const registerUser = async (req, res) => {
  const { name, email, password, dob, city } = req.body
  const newUser = { name, email, password, dob, city }

  if (!newUser.name || !newUser.email || !newUser.password || !newUser.dob || !newUser.city) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }

  try {
    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ status: 'error', message: 'Email already registered' });
    }
    const encryptedPassword = await bcrypt.hash(password, 10)

    newUser.password = encryptedPassword
    console.log("1");




    const createdUser = await User.create(newUser)

    

    if (!createdUser) {
      return res.status(400).json({
        status: 'error',
        message: "Unable to register user. please try again later.."
      })
    }
    // console.log("2");


    return res.status(201).json({
      status: 'success',
      message: "User registered successfully ",
      data: createdUser
    })
    


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      message: err.message
    })

  }
}



export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(401).json({
        message: "Invalid Email;"
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password)

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid Password!"
      })
    }


    const token = jwt.sign({
      userId: userExist._id,
      email: userExist.email
    },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' })

    return res.status(200).json({
      status: 'success',
      message: 'Logged in Successsfully..',
      token,
      data: userExist
    })

  } catch (error) {
    return res.status(500).json({ error: 'Login Failed...' })
  }

}