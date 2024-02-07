const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId, // Auto-generate ObjectId 
        unique: true,
      },
    firstName: {
        type: String,
        required: [true, 'First name is required']
        },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
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
    mailId: {
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
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth is required'],
        },
    age: {
        type: String,
        required: [true, 'Age is required'],
    },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
    },
    education:{
        type: String,
        required: [true, 'Education is required'],
    },
    experience: {
        type: String,
        required: [true, 'Experience is required'],
    },
    photo: {
        type: String,
        required: true,
      },
})

const employee = mongoose.model('Employee', employeeSchema);
module.exports = employee;