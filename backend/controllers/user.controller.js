import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const createUser = async (req, res) => {
  const { username, fullName, email, password } = req.body;
  try {
    if (!username || !fullName || !email || !password) {
      return res.status(403).json({ message: 'All fields are required' });
    }
    // checking for existing username
    const existingUser = await User.findOne({username})
    if(existingUser){
      return res.status(400).json({message: 'username is already taken'})
    }
    
    //checking for an existing email
    const existingEmail = await User.findOne({email})
    if(existingEmail){
      return res.status(400).json({message: "Email already exists"})
    }

    // hasing the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({ username, fullName, email, password:hashedPassword });
    await user.save();
    return res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    console.log('Error creating a user:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
