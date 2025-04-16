# Book Review Platform

A full-stack book review platform where users can browse books and leave reviews. Only admins have the privilege to add new books to the collection.

## Features
- 📚 Browse and search for books by title or author.
- ✍️ Users can write and submit reviews.
- 🌟 Filter books based on ratings.
- 🔐 Admin-only access to add new books.
- 🛠️ Built with **React, Node.js, Express, and PostgreSQL**.

## Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Styling**: CSS for styling the application.
- **Libraries**: Axios for API communication, React Router for navigation.

## Link

- **Backend Repository**: https://github.com/rajeev2004/Book-Review-backend

## **Setup Instructions**

### **Backend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/Book-Review-backend.git
   cd Book-Review-backend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file and add the following environment variables: 
    ```bash
    DATABASE_URL=your_database_url
    SECRET_KEY=your_jwt_secret
    INVITE_CODE=your_admin_code

4. Start the backend server (ensure the database is set up):
    ```bash
    node server.js

### **Frontend Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/rajeev2004/Book-Review-frontend.git
   cd Book-Review-frontend

2. Install dependencies:
    ```bash
    npm install

3. Update the backend URL in the frontend:
    Open each .jsx file where the backend URL is defined and update the backend constant to use the local server URL:
    ```bash
    const backend = "http://localhost:5000";

4. Start the frontend development server:
    ```bash
    npm run dev

5. Access the application at http://localhost:5173

## Demo

You can check out the live website [here](https://rajeev2004.github.io/Book-Review-frontend/).

![Book Review Site Screenshot](https://raw.githubusercontent.com/rajeev2004/Book-Review-frontend/refs/heads/main/src/assets/Screenshot%202025-02-20%20034557.png?raw=true)