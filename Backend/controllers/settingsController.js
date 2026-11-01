const Settings = require('../models/settingsModel');

const updateSettings = async (req, res) => {
    const { theme, notifications } = req.body;
    try {
        await Settings.findOneAndUpdate({ user: req.userId }, { theme, notifications }, { new: true, upsert: true });
        res.status(200).send({ message: 'Settings updated successfully!' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({ user: req.userId });
        res.status(200).send(settings);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    updateSettings,
    getSettings
};