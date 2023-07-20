# face-recognitio-app
# Face Detection Web App

![Face Detection Web App]

This is a web application for face detection using JavaScript, React, Create React App, Node.js, Express, Clarifai API, and MongoDB. The live version of the website can be accessed at [https://face-d.onrender.com](https://face-d.onrender.com).

## Overview

The Face Detection Web App allows users to upload images and detect faces within those images using the Clarifai API. The application is built with a frontend developed using React and Create React App, while the backend is powered by Node.js and Express. MongoDB is used to store user data and image analysis results.

## Features

- User authentication and registration
- Image upload and face detection
- Display of face detection results
- User dashboard to manage uploaded images and analysis results

## Prerequisites

Before running the application locally, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB

## Installation

1. Clone the repository from GitHub.

```bash
git clone <repository_link.git>
cd face-detection-web-app
```

2. Install dependencies for both frontend and backend.

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up MongoDB

Make sure MongoDB is running on your system, and create a new database for the web app.

4. Configuration

Create a `.env` file in the `backend` directory and configure the following environment variables:

```env
PORT=3000                     # The port on which the backend server will run
DATABASE_URL=mongodb://localhost:27017/<database_name>  # MongoDB connection URL
CLARIFAI_API_KEY=<clarifai_api_key>   # Clarifai API Key for face detection
```

Replace `<database_name>` with the name of the database you created in MongoDB, and `<clarifai_api_key>` with your Clarifai API Key.

## Running the Application

1. Start the backend server:

```bash
cd backend
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`.

## Tech Stack

### Frontend

- React
- Create React App
- Axios (for API requests)

### Backend

- Node.js
- Express
- Clarifai API (for face detection)
- MongoDB (with Mongoose as the ODM)

## Folder Structure

```
face-detection-web-app/
|-- backend/       # Backend server code
|   |-- controllers/
|   |-- models/
|   |-- routes/
|   |-- config/
|   |-- index.js
|   |-- .env
|-- frontend/      # Frontend code
|   |-- public/
|   |-- src/
|   |-- package.json
|   |-- .env
|-- .gitignore
|-- README.md
|-- package.json
```

## Contribution Guidelines

If you want to contribute to this project, please follow the guidelines in the CONTRIBUTING.md file. Create a pull request with your proposed changes and wait for code review before merging.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

Thanks to the Clarifai API for providing the face detection service and to the open-source community for providing valuable tools and libraries that made this project possible.
