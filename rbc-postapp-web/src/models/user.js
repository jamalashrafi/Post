const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        unique: false,
    },
    tokens: [
        {
        token: {
            type: String,
            required: true,
        },
        },
    ],
});


userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
        next();
    }
});
userSchema.methods.getAuthenticationToken = async function () { 
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'mysecretkeyforpostapp');
    user.tokens = user.tokens.concat({ token });
    await user.save();
  
    return token;
  };
  
  userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
  
    return userObject;
  };
  
  userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
  
    if (!user) throw new Error("Can't login");
  
    const isVerified = await bcrypt.compare(password, user.password);
  
    if (!isVerified) throw new Error("Can't login");
  
    return user;
  };

  const User = mongoose.model('User', userSchema);
  
  module.exports = User;