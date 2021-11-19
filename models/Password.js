const mongoose = require('mongoose');

const PasswordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  slug: String,
  username: {
    type: String,
    required: [true, 'Please add a username'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    trim: true
  },
  comments: {
    type: String,
    maxlength: [500, 'Comments max length is 500 characters']
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, 'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Password', PasswordSchema);