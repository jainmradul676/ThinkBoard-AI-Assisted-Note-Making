# Google OAuth Setup Guide for ThinkBoard

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
MONGO_URI=your_mongodb_connection_string

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Server Configuration
PORT=5001
NODE_ENV=development
```

## Google OAuth Setup Steps

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:5001/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)

### 2. Get Your Credentials

- Copy the `Client ID` and `Client Secret`
- Add them to your `.env` file

### 3. Generate JWT Secret

Generate a secure random string for JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Running the Application

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Features Implemented

✅ **Google OAuth Authentication**
- Sign in with Google
- Automatic user creation
- JWT token management
- Secure cookie-based sessions

✅ **User-Specific Notes**
- Notes are tied to authenticated users
- Users can only see their own notes
- Protected API routes

✅ **Frontend Integration**
- Authentication context
- Protected routes
- Login/logout functionality
- User information display

## Next Steps

After setting up Google OAuth, you can proceed to implement AI features:
- OpenAI API integration
- Note summarization
- Content generation
- And more AI-powered features 