const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST /api/auth
// @desc    Authenticate user
// @access  Public

router.post('/',
  [
    check('userName', 'User Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty()
  ],
  async (req, res) => {

    // ensure no input errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { userName, password } = req.body;
    try {

      // check if username exists
      let user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          name: user.name
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      )
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ error: [{ msg: 'Unable to authenticate' }] });
    }
  });


// @route   GET /api/auth
// @desc    Get details of authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);

  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;