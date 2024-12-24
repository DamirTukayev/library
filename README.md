# Library Management System

## Overview
This project is a Library Management System built using modern web technologies. The system allows users to manage a library's book inventory, track borrowers, and perform CRUD operations on books. It supports user registration and login via Google authentication.

## Features
- **Book Management**: Add, view, edit, and delete books.
- **Search Functionality**: Search books by title, author, or borrower.
- **User Authentication**: Registration and login using Google.
- **Responsive Design**: Optimized for desktop and mobile devices.

## Technologies Used
### Frontend
- **Vue 3**: JavaScript framework for building the user interface.
- **Vuetify**: Material Design component library for Vue.
- **Axios**: For making HTTP requests to the backend API.
- **Vue Router**: For managing application navigation.

### Backend
- **Node.js**: Runtime environment for server-side logic.
- **SQLite**: Lightweight relational database for storing data.

### Authentication
- **Firebase**: For handling Google OAuth authentication and user management.

## Prerequisites
- **Node.js** installed on your machine.
- **Firebase** account for authentication setup.

## Installation

### Clone the Repository
```bash
git clone https://github.com/DamirTukayev/library.git
cd library
```

### Setup Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the SQLite database by running the provided schema script.
   ```bash
   node setupDatabase.js
   ```
4. Start the server:
   ```bash
   node server.js
   ```

The backend server will run at `http://localhost:3000`.

### Setup Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Firebase:
   - Add your Firebase project credentials in the `firebaseConfig.js` file.
4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend server will run at `http://localhost:5173` (or a similar port).

## Usage
1. Open the application in your browser.
2. Log in using Google authentication.
3. Add or manage books using the interface.
4. Use the search bar to filter books by title, author, or borrower.

## Project Structure
```
.
├── backend
│   ├── database.js
│   ├── setupDatabase.js
│   ├── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── views
│   │   ├── router
│   │   ├── App.vue
│   │   └── main.js
│   └── firebaseConfig.js
└── README.md
```

## Contributing
Feel free to fork this repository and make contributions. Pull requests are welcome!

## License
This project is licensed under the MIT License.

