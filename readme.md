# User Testing Application

This is a user testing application that allows users to sign in, view available tests assigned to them, and complete those tests. Users can also view their completed tests and associated scores.


## Installation

1. Clone the repository:
  ```sh
  git clone https://github.com/your-username/user-testing-app.git
  ```
2. Navigate to the project directory:

 ```sh
  cd user-testing-app
  ```


3. Install dependencies:

```sh
  npm install
```


4. Configuration
Create a .env file in the project root and configure the following environment variables:


```sh
# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# JWT Secret (for authentication)
JWT_SECRET=your_secret_key

# Email Service Configuration (if applicable)
EMAIL_SERVICE=your_email_service_provider
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
```

# Other configuration variables...
Configure your database. Ensure that Sequelize is properly configured to connect to your database.

## Usage
Start the application:

```sh
npm start
```

Access the application at http://localhost:3000 in your web browser.

Register a user account to start using the application.

## API Endpoints
- POST /api/register: Register a new user account.
- POST /api/login: Log in with an existing user account.
- GET /api/users: Get a list of all active users.
- GET /api/available-tests: Get a list of available tests for the authenticated user.
- GET /api/completed-tests: Get a list of completed tests for the authenticated user.
