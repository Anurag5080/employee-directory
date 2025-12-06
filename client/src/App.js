import React, { useState, useEffect } from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import SearchBar from './components/SearchBar';
import { employeeService } from './services/employeeService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Main application component that manages the employee directory
// Handles state management, API calls, and UI rendering
function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees from the backend API
  // Optional search parameter filters results by name or department
  const fetchEmployees = async (search = '') => {
    try {
      setLoading(true);
      setError('');
      const response = await employeeService.getAllEmployees(search);
      setEmployees(response.data || []);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load employees on component mount and when search term changes
  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm]);

  // Handle search input changes and update the search term
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle creating a new employee and updating the UI
  const handleAddEmployee = async (employeeData) => {
    try {
      await employeeService.createEmployee(employeeData);
      setShowForm(false);
      fetchEmployees(searchTerm); // Refresh the list
      toast.success(`Employee "${employeeData.name}" has been added successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to add employee "${employeeData.name}". Please try again.`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Error adding employee:', err);
    }
  };

  // Handle updating an existing employee's information
  const handleUpdateEmployee = async (employeeData) => {
    try {
      await employeeService.updateEmployee(editingEmployee._id, employeeData);
      setShowForm(false);
      setEditingEmployee(null);
      fetchEmployees(searchTerm); // Refresh the list
      toast.success(`Employee "${employeeData.name}" has been updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to update employee "${employeeData.name}". Please try again.`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Error updating employee:', err);
    }
  };

  // Handle editing an employee - opens the form with existing data
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Handle employee deletion with confirmation dialog
  const handleDeleteEmployee = async (id, employeeName) => {
    toast.warn(
      <div>
        <h4>Delete Employee</h4>
        <p>Are you sure you want to delete <strong>{employeeName}</strong>?</p>
        <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              toast.dismiss();
              confirmDelete(id, employeeName);
            }}
          >
            Yes, Delete
          </button>
          <button
            style={{
              padding: '5px 10px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  // Actually delete the employee after confirmation
  const confirmDelete = async (id, employeeName) => {
    try {
      await employeeService.deleteEmployee(id);
      fetchEmployees(searchTerm); // Refresh the list
      toast.success(`Employee "${employeeName}" has been deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      toast.error(`Failed to delete employee "${employeeName}". Please try again.`, {
        position: "top-right",
        autoClose: 3000,
      });
      console.error('Error deleting employee:', err);
    }
  };

  // Close the employee form and clear any editing state
  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Directory</h1>
        <p>Manage and search your employee database</p>
      </header>

      <main className="app-main">
        <div className="app-controls">
          <SearchBar onSearch={handleSearch} />
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            Add Employee
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading employees...</div>
        ) : (
          <EmployeeList
            employees={employees}
            onEdit={handleEditEmployee}
            onDelete={handleDeleteEmployee}
          />
        )}

        {showForm && (
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
            onCancel={handleCloseForm}
          />
        )}

        {/* Toast notifications container */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </main>
    </div>
  );
}

export default App;