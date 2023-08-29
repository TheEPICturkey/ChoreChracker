const express = require('express');
const router = express.Router();

const Chore = require('../models/chore');

router.get('/', async (req, res) => {
    try {
        const chores = await Chore.find();
        res.json(chores);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { title, description } = req.body;

    try {
        const chore = new Chore({
            title,
            description
        });

        await chore.save();
        res.json(chore);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;