# Render Deployment Fix for Google OAuth Domain Issue

## Problem Summary
After Google authentication, the domain was changing to `localhost:5173` instead of staying on your production domain. This was caused by hardcoded localhost URLs in the codebase.

## Issues Found and Fixed

### 1. Frontend AuthContext (Fixed)
**File**: `frontend/src/context/AuthContext.jsx`
**Issue**: Login function was hardcoded to redirect to `http://localhost:5001/api/auth/google`
**Fix**: Updated to use environment-based URL logic:
```javascript
const login = () => {
  const backendUrl = import.meta.env.MODE === "development" 
    ? "http://localhost:5001/api/auth/google" 
    : "/api/auth/google";
  window.location.href = backendUrl;
};
```

### 2. Backend CORS Configuration (Fixed)
**File**: `backend/src/server.js`
**Issue**: CORS origin was hardcoded to `http://localhost:5173`
**Fix**: Updated to use environment variable:
```javascript
app.use(cors({ 
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true 
}));
```

### 3. Backend Auth Callback (Already Environment-Based)
**File**: `backend/src/routes/authRoutes.js`
**Status**: ✅ Already using environment variable
```javascript
res.redirect(process.env.FRONTEND_URL || "http://localhost:5173");
```

## Environment Variables Required for Render

### Backend Environment Variables
Set these in your Render backend service environment variables:

```env
# Database Configuration
MONGO_URI=your_mongodb_connection_string

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_random

# Frontend URL (IMPORTANT: Set this to your production frontend URL)
FRONTEND_URL=https://your-frontend-app-name.onrender.com

# Server Configuration
PORT=5001
NODE_ENV=production
```

### Frontend Environment Variables
Set these in your Render frontend service environment variables:

```env
# Backend API URL (if using separate frontend/backend services)
VITE_API_URL=https://your-backend-app-name.onrender.com
```

## Google OAuth Console Configuration

### 1. Update Authorized Redirect URIs
In your Google Cloud Console, update the authorized redirect URIs to include your production URL:

**Development:**
- `http://localhost:5001/api/auth/google/callback`

**Production:**
- `https://your-backend-app-name.onrender.com/api/auth/google/callback`

### 2. Update Authorized JavaScript Origins
Add your production frontend URL:
- `https://your-frontend-app-name.onrender.com`

## Deployment Steps

### 1. Update Environment Variables
1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Add/update the `FRONTEND_URL` variable with your production frontend URL
5. Ensure `NODE_ENV=production`

### 2. Redeploy Services
1. Trigger a new deployment for both frontend and backend services
2. The code changes are already made, so just redeploy to apply them

### 3. Test the Flow
1. Visit your production frontend URL
2. Click "Login with Google"
3. Complete the OAuth flow
4. Verify you stay on the production domain throughout

## Code Changes Summary

### Files Modified:
1. `frontend/src/context/AuthContext.jsx` - Fixed hardcoded localhost URL
2. `backend/src/server.js` - Fixed hardcoded localhost URL in CORS

### Files Already Correct:
1. `frontend/src/lib/axios.js` - Already using environment-based URLs
2. `backend/src/routes/authRoutes.js` - Already using environment variables

## Verification Checklist

- [ ] Environment variables set correctly in Render
- [ ] Google OAuth redirect URIs updated
- [ ] Services redeployed
- [ ] OAuth flow works without redirecting to localhost
- [ ] User stays on production domain throughout authentication
- [ ] Login/logout functionality works correctly

## Troubleshooting

If you still experience issues:

1. **Check Render logs** for any environment variable errors
2. **Verify Google OAuth configuration** - ensure redirect URIs match exactly
3. **Clear browser cookies** and try again
4. **Check CORS errors** in browser developer tools
5. **Verify environment variables** are loaded correctly in production

The main issue was the hardcoded localhost URLs that didn't adapt to the production environment. With these fixes, your OAuth flow should work correctly on Render. 