const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST /api/addUser
// @desc    Add user
// @access  Public

router.post('/',
  [
    check('userName', 'User Name is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password should be six or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {

    // ensure no input errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { userName, name, password } = req.body;
    try {

      // check if username exists
      let user = await User.findOne({ userName });
      if (user) {
        return res.status(400).json({ error: [{ msg: 'Username already taken' }] });
      }

      user = new User({
        userName, name, password
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.send('User registered');

    } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: [{ msg: 'Unable to add user' }] });
    }
  });

module.exports = router;