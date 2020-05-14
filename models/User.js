const { Schema, model } = require('mongoose');
const { isEmail, isLength } = require('validator');
const { compare, genSalt, hash } = require('bcryptjs');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email address'],
    required: [true, 'You must provide an email address']
  },
  password: {
    type: String,
    required: [true, 'You must provide a password'],
    validate: [ (value) => isLength(value, { min: 6 }), 'Your password must be at least 6 characters long' ]
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  todos: [ {type: Schema.Types.ObjectId, ref: 'Todo' } ],
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  const user = this;
  try {
    const isMatch = await compare(candidatePassword, user.password);
    return Promise.resolve(isMatch);
  } catch (e) {
    return Promise.reject(e);
  }
}

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    try {
      const salt = await genSalt();
      const hashedPassword = await hash(user.password, salt);
      console.log(salt);
      console.log(hashedPassword);
      user.password = hashedPassword;
    } catch (e) {
      next(e);
    }
  }
  // Finally call save
  next();
});


module.exports = model('User', UserSchema);
