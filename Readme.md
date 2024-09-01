# Train Service Management System API

## Overview

The Train Service Management System API is a backend application built using Node.js, Express, and MongoDB. It allows users to manage train services, stations, user wallets, and ticketing. Users can register, log in, manage their tickets, and receive reminders for upcoming train departures.

## Installation

Follow these steps to set up and run the project:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Tamim-369/TSMS-Express.git
   cd TSMS-Express

   ```

2. **Install dependencies:**
   Make sure you have Node.js installed. Run the following command to install the required packages:

```bash
npm install
```

3. **Set up environment variables:**

Create a .env file in the root directory and add the following environment variables:

```text
PORT=3000
MONGODB_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password
JWT_SECRET=your_jwt_secret
```

Replace your_mongodb_connection_string with your actual MongoDB connection string.

Replace your_email@example.com and your_email_password_or_app_password with your email credentials for sending notifications.

Replace your_jwt_secret with a secret key for signing JWT tokens.

4. **Run the application:**
   Start the server using the following command:

```bash
npm start
```
