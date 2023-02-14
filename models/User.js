const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
    ],
    email: {
        type: String,
        unique: true,
        required: [true, 'Pls provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Pls Provide a valid email'
        }
    },
    fullname: {
        type: String,
        required: [true, 'Pls provide your full name'],
        minlength: 5,
        maxlength: 25
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        unique: true,
        required: [true, 'Pls provide a username'],
        minlength: 3,
        maxlength: 15
    },
    password: {
        type: String,
        required: [true, 'Pls input your password'],
        minlength: 5
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: 'my city',
    },
    followers: [{type: mongoose.Types.ObjectId, ref: 'User'}],
    following: [{type: mongoose.Types.ObjectId, ref: 'User'}],

})

UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths())
    if (!this.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  
  UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, following: this.following }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_LIFETIME,
    })
  }
  
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
  }

  module.exports = mongoose.model('User', UserSchema)