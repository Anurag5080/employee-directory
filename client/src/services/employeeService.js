import axios from 'axios';

// Base URL for API calls - uses proxy in development
const API_BASE_URL = '/api';

// Service class for handling employee API operations
// Encapsulates all API calls for employee CRUD operations
class EmployeeService {
  // Fetch all employees from the API
  // Optional search parameter filters by name or department
  async getAllEmployees(search = '') {
    try {
      const params = {};
      if (search) {
        params.search = search;
      }

      const response = await axios.get(`${API_BASE_URL}/employees`, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch employees');
    }
  }

  // Get a specific employee by their ID
  async getEmployeeById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch employee');
    }
  }

  // Create a new employee in the database
  async createEmployee(employeeData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/employees`, employeeData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create employee');
    }
  }

  // Update an existing employee's information
  async updateEmployee(id, employeeData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/employees/${id}`, employeeData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to update employee');
    }
  }

  // Delete an employee from the database
  async deleteEmployee(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/employees/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to delete employee');
    }
  }

  // Handle API errors and provide meaningful error messages
  // Differentiates between network errors and server errors
  handleError(error, defaultMessage) {
    console.error('API Error:', error);

    if (error.response) {
      // Server responded with error status
      const serverMessage = error.response.data?.message || defaultMessage;
      return new Error(serverMessage);
    } else if (error.request) {
      // Request made but no response received
      return new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(defaultMessage);
    }
  }
}

// Export a singleton instance
export const employeeService = new EmployeeService();