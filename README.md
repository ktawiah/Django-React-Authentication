# Django React Authentication Project

Welcome to our full stack auth application! This project showcases the implementation of user JSON Web Token authentication using Django Rest Framework for the backend and Next.js for the frontend.

## Table of Contents
- [Features](#features)
- [Project Setup](#getting-started)
- [Contribution](#contributing)

## Features

- User Account Registration
- User Account Login
- User Account Logout

## Getting Started
Follow the following instruction to setup this project locally on your device

#### 1. To begin first clone this project 
```bash
  git clone https://github.com/ktawiah/Django-React-Authentication.git
```

#### 2. Navigate to the backend directory
```bash
cd backend
```

#### 3. Create a virtual environment
``` bash
  pipenv shell
```

#### 4. Install backend dependencies
```bash
  pipenv install
```

#### 5. Run migrations
```bash
  python manage.py makemigrations
  python manage.py migrate
```
#### 6. Start the backend development server
```bash
  python manage.py runserver
```

#### 7. Open a new terminal instance and navigate into the frontend directory
```bash
  cd frontend
```

### 8. Install frontend dependencies
```bash
  npm run dev
  # or
  yarn dev
  # or
  pnpm dev
  # or
  bun dev
```

### 9. Run frontend dev server
```bash
  npm run dev
```

#### 10. Open [http://localhost:3000](http://localhost:3000) with your browser to see frontend result and [http://localhost:8000](http://localhost:8000) to view backend results.


## Contributing
Contributions to this project are welcomed! If you have any ingenious ideas for enhancements or new features, please don't hesitate to open an issue or submit a pull request. Your input is much appreciated.

