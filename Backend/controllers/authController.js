const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Registration (Signup)
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(400).json({
                error: "A user with this email address already exists. Please use a different email.",
            });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        return res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        // Handle server-side errors
        console.error("Error during user registration:", error);
        return res.status(500).json({
            error: "An unexpected error occurred during the signup process. Please try again later.",
        });
    }
};

// User Authentication (Signin)
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({
                error: "No account found with the provided email address.",
            });
        }

        // Verify the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                error: "Invalid email or password. Please check your credentials.",
            });
        }

        // Generate a JSON Web Token (JWT) for the user
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        // Send a success response
        return res.status(200).json({
            message: "Login successful.",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        // Handle server-side errors
        console.error("Error during user authentication:", error);
        return res.status(500).json({
            error: "An unexpected error occurred during the signin process. Please try again later.",
        });
    }
};