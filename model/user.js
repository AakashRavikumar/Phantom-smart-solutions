const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id:{ type:Number },
  email: { type: String },
  password: { type: String },
  facebookId: { type: String },
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;