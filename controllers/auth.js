const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ error: 'Username already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { 
      expiresIn: '1d' 
    });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { 
      expiresIn: '1d' 
    });

    res.cookie('token', token, { httpOnly: true });
    res.json({ message: 'Login successful', isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};