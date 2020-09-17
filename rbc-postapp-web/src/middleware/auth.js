const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  console.log(req.body);
  try {
    const token = req.header('Authorization');
    const verifyToken = jwt.verify(token, 'mysecretkeyforpostapp');
    const user = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    });

    if (!user) throw new Error();

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Unauthorized Access' });
  }
};

module.exports = auth;
