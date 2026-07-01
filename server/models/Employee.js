const mongoose = require('mongoose');


/**
 * Employee schema definition
 * @typedef {Object} EmployeeSchema
 * @property {string} name - Employee's full name
 * @property {string} role - Employee's job role
 * @property {string} department - Employee's department
 * @property {string} email - Employee's email address
 * @property {string} phone - Employee's phone number
 * @property {Date} hireDate - Employee's hire date
 * @property {Date} createdAt - Record creation timestamp
 * @property {Date} updatedAt - Record update timestamp
 */
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Employee name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Employee role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    maxlength: [100, 'Department cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  hireDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

/**
 * Employee model
 * Provides methods for database operations on employee documents
 */
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;