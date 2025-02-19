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

## Setup Instructions

1. Clone both the repository separately:
   ```sh
   git clone https://github.com/rajeev2004/Book-Review-frontend.git
   cd Book-Review-frontend
   git clone https://github.com/rajeev2004/Book-Review-backend.git
   cd Book-Review-backend

2. Install dependencies:
    ```bash
    npm install

3. Configure the backend URL in the frontend code (e.g., the backend constant in the Dashboard.jsx file).

4. Start the development server:
    ```bash
    npm run dev

5. Set up a `.env` file in the backend repository:
   Add the following environment variables:
   ```sh
   DATABASE_URL=your_postgresql_connection_string
   PORT=5000
   SECRET_KEY=your_jwt_secret_key
   INVITE_CODE=admin_invite_code

6. Run the backend server (ensure the database is set up):
    ```bash
    node server.js

7. Access the application at http://localhost:5173

## Demo

You can check out the live website [here](https://rajeev2004.github.io/Book-Review-frontend/).

![Book Review Site Screenshot](https://raw.githubusercontent.com/rajeev2004/Book-Review-frontend/refs/heads/main/src/assets/Screenshot%202025-02-20%20034557.png?raw=true)