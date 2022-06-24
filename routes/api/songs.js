const express = require('express');
const router = express.Router();

// @route   GET api/songs
// @desc    Get all songs
// @access  Public

router.get('/', (req, res) => res.send('Songs route'));

module.exports = router;