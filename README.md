# Employee Directory

A full-stack web application for managing employee information with search functionality, built with React frontend and Node.js/Express backend with MongoDB.

## Features

- **List employees** with name, role, department, email, phone, and hire date
- **Search functionality** by name or department
- **Add new employees** with form validation
- **Edit employee details**
- **Delete employees** with confirmation
- **Responsive design** that works on all devices
- **Modern UI** with clean, professional styling

## Tech Stack

### Frontend
- React 18
- CSS3 with responsive design
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled

## Project Structure

```
Employee Directory/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── EmployeeList.js
│   │   │   ├── EmployeeCard.js
│   │   │   ├── EmployeeForm.js
│   │   │   └── SearchBar.js
│   │   ├── services/       # API service layer
│   │   │     └── employeeService.js
│   │   ├── utils/          # Helper functions
│   │   ├── assets/         # Images, styles
│   │   ├── App.js
│   │    └── index.js
│    └── public/
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   │    └── Employee.js
│   ├── routes/             # API routes
│   │    └── employees.js
│   ├── services/           # Business logic
│   │    └── employeeService.js
│   ├── config/             # Database configuration
│   │    └── database.js
│    └── index.js
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install server dependencies
cd server && npm install && cd ..

# Install client dependencies
cd client && npm install && cd ..
```

### 2. Set up MongoDB

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Make sure MongoDB service is running on `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Create a MongoDB Atlas account
2. Create a cluster and get your connection string
3. Update the `MONGODB_URI` in `server/.env`

### 3. Environment Configuration

The server uses environment variables from `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/employee_directory
CLIENT_URL=http://localhost:3000
```

### 4. Running the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend concurrently
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

#### Run Separately

**Backend only:**
```bash
cd server
npm run dev
```

**Frontend only:**
```bash
cd client
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees (supports search) |
| GET | `/api/employees/:id` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
| GET | `/api/health` | Health check |

### Search Parameters
- `search`: Search term for name or department
- `page`: Page number for pagination (default: 1)
- `limit`: Items per page (default: 10)

## Usage

1. **View Employees**: The main page displays all employees in a responsive grid
2. **Search**: Use the search bar to filter employees by name or department
3. **Add Employee**: Click "Add Employee" to open the form
4. **Edit Employee**: Click "Edit" on any employee card
5. **Delete Employee**: Click "Delete" and confirm the action

## Best Practices Implemented

### File Structure
- Organized components, services, and utilities
- Clear separation of concerns
- PascalCase for components, camelCase for functions

### Code Quality
- JSDoc comments for functions
- Inline comments for complex logic
- Error handling throughout
- Input validation on both frontend and backend

### UI/UX
- Responsive design for all screen sizes
- Loading states and error messages
- Form validation with user feedback
- Confirmation for destructive actions

## Development

### Adding New Features
1. Create components in `client/src/components/`
2. Add API endpoints in `server/routes/`
3. Implement business logic in `server/services/`
4. Update the service layer in `client/src/services/`

### Testing
```bash
cd client
npm test
```

## Production Build

```bash
# Build the React app
cd client
npm run build

# The built files will be in client/build/
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Port Already in Use**
   - Change PORT in `.env` or use different ports

3. **CORS Errors**
   - Verify CLIENT_URL in server configuration

## License

MIT License