const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/register', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.getAuthenticationToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthenticationToken();
    return res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch('/updateProfile', auth, async (req, res) => {
  try {
    const propsToBeUpdated = Object.keys(req.body);
    const allowedProperties = ['name', 'email', 'password'];
    const isValid = propsToBeUpdated.every((prop) =>
      allowedProperties.includes(prop)
    );
    if (!isValid) return res.send(400).send({ error: 'Invalid updates' });
    propsToBeUpdated.forEach((prop) => (req.user[prop] = req.body[prop]));
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
