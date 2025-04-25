const mongoose = require('mongoose')

//schema is the fields and datatypes that the user model will have
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String },

  });

module.exports = mongoose.model('User', UserSchema);