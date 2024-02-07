const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId, // Auto-generate ObjectId 
      unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim:true
        },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim:true
        },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        validate: {
            validator: function(value) {
              // Basic mobile number validation (example: 1234567890)
              return /^\d{10}$/.test(value);
            },
            message: props => `${props.value} is not a valid mobile number!`,
          },
        },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(value) {
              // Basic email validation (example: abc@def)
              return /^[a-z]+@[a-z]+\.[a-z]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`,
          },
        },
      role: {
          type: String,
          required: true,
      },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [16, 'Password must be at most 16 characters long'],
        }
    });

const User = mongoose.model('User', userSchema);
module.exports = User;