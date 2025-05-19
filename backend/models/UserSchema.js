const mongoose = require('mongoose')

//schema is the fields and datatypes that the user model will have
const UserSchema = new mongoose.Schema({
    firebaseUID: { type: String, required: true},
    favoriteRecipeIds: { type: [String] }
  });

module.exports = mongoose.model('User', UserSchema);