const Employee = require('../models/Employee');

// Service class containing business logic for employee operations
// Handles database interactions and business rules
class EmployeeService {
  // Get all employees with optional search and pagination
  // Supports filtering by name or department and pagination
  static async getAllEmployees({ search = '', page = 1, limit = 10 }) {
    try {
      const query = {};
      
      // Add search functionality for name and department
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { department: { $regex: search, $options: 'i' } }
        ];
      }

      const skip = (page - 1) * limit;
      
      const employees = await Employee.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);
      
      const total = await Employee.countDocuments(query);
      
      return {
        employees,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw new Error(`Failed to fetch employees: ${error.message}`);
    }
  }

  // Get a specific employee by their MongoDB ID
  // Throws error if employee is not found
  static async getEmployeeById(id) {
    try {
      const employee = await Employee.findById(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return employee;
    } catch (error) {
      throw new Error(`Failed to fetch employee: ${error.message}`);
    }
  }

  // Create a new employee record
  // Validates email uniqueness before creation
  static async createEmployee(employeeData) {
    try {
      // Check if email already exists
      const existingEmployee = await Employee.findOne({ email: employeeData.email });
      if (existingEmployee) {
        throw new Error('Employee with this email already exists');
      }

      const employee = new Employee(employeeData);
      return await employee.save();
    } catch (error) {
      throw new Error(`Failed to create employee: ${error.message}`);
    }
  }

  // Update an existing employee's information
  // Validates email uniqueness and updates the record
  static async updateEmployee(id, updateData) {
    try {
      // If email is being updated, check for duplicates
      if (updateData.email) {
        const existingEmployee = await Employee.findOne({ 
          email: updateData.email, 
          _id: { $ne: id } 
        });
        if (existingEmployee) {
          throw new Error('Another employee with this email already exists');
        }
      }

      const employee = await Employee.findByIdAndUpdate(
        id, 
        updateData, 
        { new: true, runValidators: true }
      );
      
      if (!employee) {
        throw new Error('Employee not found');
      }
      
      return employee;
    } catch (error) {
      throw new Error(`Failed to update employee: ${error.message}`);
    }
  }

  // Delete an employee by their ID
  // Returns success message after deletion
  static async deleteEmployee(id) {
    try {
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        throw new Error('Employee not found');
      }
      return { message: 'Employee deleted successfully' };
    } catch (error) {
      throw new Error(`Failed to delete employee: ${error.message}`);
    }
  }
}

module.exports = EmployeeService;