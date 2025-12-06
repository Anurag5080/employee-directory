import React from 'react';

// Modal component to display detailed employee information
const EmployeeModal = ({ employee, isOpen, onClose, onEdit, onDelete }) => {
  if (!isOpen || !employee) return null;

  // Format date string to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle background click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="employee-modal-overlay" onClick={handleBackdropClick}>
      <div className="employee-modal-content">
        <div className="employee-modal-header">
          <h2 className="employee-modal-title">{employee.name}</h2>
          <button 
            className="employee-modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div className="employee-modal-body">
          <div className="employee-modal-section">
            <h3 className="section-title">Basic Information</h3>
            <div className="employee-modal-details">
              <div className="modal-detail-row">
                <span className="modal-detail-label">Role:</span>
                <span className="modal-detail-value">{employee.role}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Department:</span>
                <span className="modal-detail-value">{employee.department}</span>
              </div>
              <div className="modal-detail-row">
                <span className="modal-detail-label">Email:</span>
                <span className="modal-detail-value">{employee.email}</span>
              </div>
              {employee.phone && (
                <div className="modal-detail-row">
                  <span className="modal-detail-label">Phone:</span>
                  <span className="modal-detail-value">{employee.phone}</span>
                </div>
              )}
              <div className="modal-detail-row">
                <span className="modal-detail-label">Hire Date:</span>
                <span className="modal-detail-value">{formatDate(employee.hireDate)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="employee-modal-footer">
          <button
            className="btn btn-edit"
            onClick={() => {
              onEdit(employee);
              onClose();
            }}
          >
            Edit Employee
          </button>
          <button
            className="btn btn-delete"
            onClick={() => {
              onDelete(employee._id, employee.name);
              onClose();
            }}
          >
            Delete Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;