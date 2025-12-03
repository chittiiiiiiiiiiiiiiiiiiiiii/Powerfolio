PowerFolio – Project Submission System

PowerFolio is a web application where students can submit their projects and admins can review and manage them.
The system has two roles: Student and Admin.

Student Features

Signup or Signin

New users can create an account.

Existing users can log in.

Submit Project

Students can submit project title, description, and links.

View Projects

Students can view all the projects they submitted.

They can also see the status of each project (Pending, Approved, Rejected).

Admin Features

Admins log in using their Name and Email Address.

Admin Dashboard includes four pages:

1. Analytics

Shows an overview of the system such as total projects and total active users.

2. Project Submissions

Shows all uploaded projects.

3. Review Projects

Shows only the pending projects.
Admins can approve or reject submissions.

4. User Management

Shows all registered students and active user count.

Add Admin Email

Admins can add another admin by entering Name and Email Address.

Technologies Used

Frontend: React +vite and MUI
Backend: Node.js and Express
Database: MongoDB

Steps to Run the Project
Step 1: Clone the Repository
git clone https://github.com/<your-username>/Powerfolio.git
cd Powerfolio

Step 2: Install Dependencies

Frontend:

cd client
npm install
npm start


Backend:

cd server
npm install
npm start

Environment Variables (.env file)

Create a .env file inside the server folder with the following:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

Running the Application

Start backend:

cd server
npm start


Start frontend:

cd client
npm start


Open the browser and go to:

http://localhost:3000
