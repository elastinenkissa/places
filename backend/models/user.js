const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /(^$|^.*@.*\..*$)/.test(v);
      },
      message: 'Please enter an email.',
    },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  places: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, object) => {
    object.id = object._id.toString();
    delete object._id;
    delete object.__v;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
