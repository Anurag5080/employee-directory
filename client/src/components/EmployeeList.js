import React from 'react';
import EmployeeCard from './EmployeeCard';

// Component that displays a list of employee cards
// Handles empty state and renders employee grid
const EmployeeList = ({ employees, onEdit, onDelete, onCardClick }) => {
  // Show empty state message when no employees match the search
  const renderEmptyState = () => (
    <div className="empty-state">
      <h3>No Employees Found</h3>
      <p>No employees match your current search criteria.</p>
      <p>Try adjusting your search or add new employees to get started.</p>
    </div>
  );

  // Render the grid of employee cards when employees exist
  const renderEmployeeList = () => (
    <div className="employee-list">
      <div className="employee-list-header">
        <h2>Employees ({employees.length})</h2>
      </div>
      <div className="employee-grid">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            employee={employee}
            onEdit={onEdit}
            onDelete={onDelete}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="employee-list-container">
      {employees.length === 0 ? renderEmptyState() : renderEmployeeList()}
    </div>
  );
};

export default EmployeeList;