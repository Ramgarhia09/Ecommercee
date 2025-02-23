import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.json({ success: false, message: 'Incorrect password' });
        }

        // Create token
        const token = createToken(user._id);

        // Respond with the token
        res.json({ success: true, token });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: 'User already exists' });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Please enter a valid email' });
        }

        // Validate password length
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        // Create token
        const token = createToken(user._id);

        // Respond with the token
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        // if (!validator.isEmail(email)) {
        //     return res.json({ success: false, message: 'Invalid email format' });
        // }

        // Check if credentials match admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export { loginUser, registerUser, adminLogin };
