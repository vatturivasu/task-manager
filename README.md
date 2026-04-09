Task Manager Application

Overview

This project is a simple Task Manager application built based on the given assignment. It allows a user to create, view, update, and delete tasks. The focus of this project is functionality, clean structure, and correct implementation.

This project was completed within the expected 1–2 hour scope as mentioned in the assignment.

Features

Frontend

* Display list of tasks
* Add a new task using a form
* Mark a task as completed
* Delete a task
* Show loading and error messages

Backend

* REST API using Express
* Basic validation for task input
* Clear JSON responses
* Clean and readable code structure

 Bonus Features Implemented

* Filter tasks (All / Completed / Incomplete)
* Edit task title
* Persist tasks after refresh using a JSON file

Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express
* Storage: File-based (tasks.json)

 Project Structure

task-manager/
│
├── backend/
│   ├── server.js
│   ├── tasks.json
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   ├── style.css
│
└── README.md

API Endpoints

GET /tasks
Returns all tasks

POST /tasks
Creates a new task

PATCH /tasks/:id
Updates task (toggle completed or edit title)

DELETE /tasks/:id
Deletes a task

Task Data Model

Each task contains:

id (number)
title (string)
completed (boolean)
createdAt (timestamp)

---

How to Run the Project

1. Start Backend

Open terminal inside backend folder:

npm install express cors
node server.js

Server will run on: http://localhost:5000

 2. Run Frontend

Open the frontend folder and open index.html in your browser.


Submission Note

This project is implemented based on the assignment requirements with a focus on simplicity and correctness.

For the backend, I used Node.js with Express and implemented all required API endpoints with basic validation and proper JSON responses. Instead of using a database, I used a JSON file to store tasks, which keeps the solution simple while also allowing data persistence.

For the frontend, I used plain HTML, CSS, and JavaScript to keep the structure easy to understand. The application supports creating, viewing, updating, and deleting tasks, along with loading and error handling.

Some optional features like filtering tasks, editing task titles, and data persistence are also included without adding unnecessary complexity.

The main focus of this project was clarity, correctness, and following the assignment instructions closely.
