# Group Polling App

A modern web application for creating and voting on time-based polls with user authentication.

## Features

- **User Authentication**: Secure registration and login system
- **Poll Creation**: Create polls with custom time options using a calendar interface
- **Voting System**: Vote on poll options with user-based tracking
- **Modern UI**: Beautiful interface built with Shadcn/UI and Tailwind CSS
- **Real-time Updates**: Instant feedback and notifications

## Authentication

The app now includes a complete authentication system:

### Registration
- Users can create accounts with email, name, and password
- Password validation and confirmation
- Email uniqueness validation

### Login
- Secure login with email and password
- Session persistence using localStorage
- Automatic redirect after successful login

### User Management
- User state management throughout the app
- Logout functionality
- Conditional UI based on authentication status

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npx prisma db push
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

1. **Create an Account**: Click "Sign Up" to register with your email, name, and password
2. **Sign In**: Use your credentials to log in to your account
3. **Create Polls**: Once logged in, you can create polls with time-based options
4. **Vote**: Participate in polls created by other users
5. **Logout**: Click the logout button to sign out

## Technology Stack

- **Frontend**: Next.js 13, React, TypeScript
- **UI Components**: Shadcn/UI, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom implementation with bcrypt for password hashing
- **Forms**: React Hook Form with Zod validation

## Database Schema

The app uses the following main models:

- **User**: Stores user authentication and profile information
- **Poll**: Contains poll details and creator information
- **PollOption**: Individual options for each poll
- **Vote**: Tracks user votes on poll options

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/polls` - Create new polls
- `GET /api/polls/[slug]` - Get poll details
- `POST /api/polls/[slug]/vote` - Submit votes

## Security Features

- Password hashing with bcrypt
- Input validation with Zod schemas
- User session management
- Protected routes and API endpoints
