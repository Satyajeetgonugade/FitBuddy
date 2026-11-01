const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).send({ message: 'User created successfully!', userId: user._id });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Invalid Password!' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({ 
            id: user._id,
            username: user.username,
            email: user.email,
            accessToken: token 
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    signup,
    login
};