const User = require('../models/userModel');

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found!' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { username, email } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, { username, email }, { new: true });
        res.status(200).send({ message: 'Profile updated successfully!', user: updatedUser });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile
};