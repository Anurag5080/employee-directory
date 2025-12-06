const express = require('express');
const EmployeeService = require('../services/employeeService');

const router = express.Router();

/**
 * @route GET /api/employees
 * @desc Get all employees with optional search and pagination
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    
    const result = await EmployeeService.getAllEmployees({
      search,
      page: parseInt(page),
      limit: parseInt(limit)
    });
    
    res.json({
      success: true,
      data: result.employees,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch employees'
    });
  }
});

/**
 * @route GET /api/employees/:id
 * @desc Get employee by ID
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const employee = await EmployeeService.getEmployeeById(req.params.id);
    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(404).json({
      success: false,
      message: error.message || 'Employee not found'
    });
  }
});

/**
 * @route POST /api/employees
 * @desc Create new employee
 * @access Public
 */
router.post('/', async (req, res) => {
  try {
    const employee = await EmployeeService.createEmployee(req.body);
    res.status(201).json({
      success: true,
      data: employee,
      message: 'Employee created successfully'
    });
  } catch (error) {
    console.error('Create employee error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create employee'
    });
  }
});

/**
 * @route PUT /api/employees/:id
 * @desc Update employee by ID
 * @access Public
 */
router.put('/:id', async (req, res) => {
  try {
    const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
    res.json({
      success: true,
      data: employee,
      message: 'Employee updated successfully'
    });
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update employee'
    });
  }
});

/**
 * @route DELETE /api/employees/:id
 * @desc Delete employee by ID
 * @access Public
 */
router.delete('/:id', async (req, res) => {
  try {
    const result = await EmployeeService.deleteEmployee(req.params.id);
    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to delete employee'
    });
  }
});

module.exports = router;