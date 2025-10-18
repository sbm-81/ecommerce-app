//Route for user login
import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';


//generate JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

export const loginUser = async (req, res) => {
    // res.json({msg: "login api working..."})
    try {
        const { email, password } = req.body;
        //check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }
        //compare hashed password with entered password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid password" });
        }
        //generate JWT token
        const token = createToken(user._id);
        res.json({ success: true, token });
    }
    catch (err) {
        console.error(err.message);
        res.json({ success: false, msg: err.message });

    }


}

//Route for user registration
export const registerUser = async (req, res) => {
    // res.json({msg: "register api working..."})
    try {
        const { name, email, password } = req.body;
        //check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, msg: "User already exists" });
        }
        //validating email format and password 
        if (!validator.isEmail(email)) {

            return res.json({ success: false, msg: "Please enter a valid email address" });

        }
        if (password.length < 8) {

            return res.json({ success: false, msg: "Please enter a strong password with at least 8 characters" });

        }
        //encrypting password or hashing it
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({ name, email, password: hashedPassword });

        //Save user to database
        const user = await newUser.save();
        // res.json({msg: "User registered successfully"});

        const token = createToken(user._id);
        res.json({ success: true, token });
    }

    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

//Route for admin login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if admin exists
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });

        } else {
            res.json({ success: false, msg: "Invalid admin credentials" });
        }

    } catch (error) {
        console.error(error.message);
        res.json({ success: false, msg: error.message });
    }


}
// export default {loginUser, registerUser, loginAdmin};