# Project React README

# HBCards

React HBCards project

## Introduction and Objectives

In this project, we aim to develop a web application that incorporates server-side RESTful API calls using React. Proficiency in building such projects is highly sought after in the development and IT industry, hence, significant importance is attached to this project. It is recommended to invest time and effort in both writing and understanding all the code and components that comprise this project.

## General Description

This project involves the development of a web application with a content management system that allows business users to publish content. The published content will be available in various parts of the website.

## Key Highlights

- Central website with content display page.
- Login system with access to the site management interface.
- Site management interface allowing addition, editing, or deletion of content.
- Content of the website will be stored on the server.

### Client-Side Technology Requirements

1. Design and Responsiveness: Material Design.
2. Icons: used icons from library such as Material Icons.
3. Navigation Menu: The site/application have a dynamic navigation menu appearing on all pages. The links displayed should based on user permissions. The navigation menu include a search field that displays information on the main page according to the data entered in the field. Clicking a button to change screen view should toggle between light mode and dark mode.
4. Login Page: Include a login page with appropriate titles and a form for login/registration. Use regex for password fields, requiring passwords with at least one uppercase and one lowercase letter in English, at least four digits, and one special character from the following list: !@%$#^&_-\__(. Additionally, passwords should be at least 8 characters long. The different fields required in the login and registration forms are displayed in Annex 4.
5. User Profile Editing: Allow logged-in users to edit their details.
6. CRM System: Enable admin users to see a link that, when clicked, will take them to a CRM system page. This page include appropriate titles and a table of all users in the database along with their statuses. Only admin users able to view the content of this page. Allowing changing the status of a business user to regular and vice versa. Additionally, allow users to delete any user except an admin user.

### Additional Sections

#### Project Structure

The project follows a modular structure, with separate directories for components, styles, and utility functions. The main entry point is the `App.js` file, which renders the root component of the application.

#### Installation Instructions

To install and run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to start the development server.
5. Open your web browser and visit `http://localhost:3000` to view the application.

#### Usage Guide

Once the application is running, you can navigate through different pages using the dynamic navigation menu. Perform CRUD operations on content, manage user profiles, and access the CRM system page if you're an admin user.

#### Forms Validation

All forms in the application include client-side validation to ensure data integrity. Error messages are displayed below each form field to guide users in providing valid input.

#### HTTP Requests

The application uses Axios library to make HTTP requests to the server. Requests are handled asynchronously, and responses are processed accordingly. Examples of common request methods (GET, POST, PUT, DELETE) are implemented throughout the application.

#### User Access Control

User permissions and access control are managed based on user roles (e.g., admin, business user). The navigation menu and content visibility are determined by the user's role and permissions.

#### Deployment

For deployment to a production environment, consider hosting the application on a web server and configuring the server accordingly. Ensure that necessary security measures are in place to protect sensitive data.

#### Testing

Testing of the application can be performed using unit tests, integration tests, and end-to-end tests. Automated testing frameworks such as Jest and React Testing Library can be utilized to ensure the reliability and stability of the application.

#### Troubleshooting

If you encounter any issues or errors during installation, setup, or usage of the application, refer to the troubleshooting section in the documentation or seek assistance from the project maintainers.

### Contact Information

For support or further assistance, please contact [Higa Hamodi] at [Thoumedievalkid@hotmail.com].
