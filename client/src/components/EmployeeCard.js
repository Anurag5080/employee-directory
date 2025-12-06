import React from 'react';

// Component that displays individual employee information in a card format
// Shows employee details and provides edit/delete actions
const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  // Format date string to a more readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle edit button click - passes employee data to parent
  const handleEdit = () => {
    onEdit(employee);
  };

  // Handle delete button click - passes employee ID and name for confirmation
  const handleDelete = () => {
    onDelete(employee._id, employee.name);
  };

  return (
    <div className="employee-card">
      <div className="employee-info">
        <h3 className="employee-name">{employee.name}</h3>
        <div className="employee-details">
          <div className="employee-detail">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{employee.role}</span>
          </div>
          <div className="employee-detail">
            <span className="detail-label">Department:</span>
            <span className="detail-value">{employee.department}</span>
          </div>
          <div className="employee-detail">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{employee.email}</span>
          </div>
          {employee.phone && (
            <div className="employee-detail">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">{employee.phone}</span>
            </div>
          )}
          <div className="employee-detail">
            <span className="detail-label">Hire Date:</span>
            <span className="detail-value">{formatDate(employee.hireDate)}</span>
          </div>
        </div>
      </div>

      <div className="employee-actions">
        <button
          className="btn btn-edit"
          onClick={handleEdit}
          aria-label={`Edit ${employee.name}`}
        >
          Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Delete ${employee.name}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;