# Setting Up Google Authentication

This guide will walk you through the process of setting up Google OAuth for your Group Polling application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"

## Step 2: Configure the OAuth Consent Screen

1. Click on "OAuth consent screen" in the left sidebar
2. Select "External" user type (unless you have a Google Workspace organization)
3. Fill in the required information:
   - App name: "Group Polling"
   - User support email: Your email
   - Developer contact information: Your email
4. Click "Save and Continue"
5. Add the following scopes:
   - `./auth/userinfo.email`
   - `./auth/userinfo.profile`
6. Click "Save and Continue"
7. Add any test users if needed, then click "Save and Continue"

## Step 3: Create OAuth Client ID

1. Click on "Credentials" in the left sidebar
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Name: "Group Polling Web Client"
5. Add the following Authorized JavaScript origins:
   - `http://localhost:3000` (for development)
   - Your production URL when deployed
6. Add the following Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://your-production-domain.com/api/auth/callback/google` (for production)
7. Click "Create"
8. Note your Client ID and Client Secret

## Step 4: Configure Environment Variables

Add the following to your `.env.local` file:

```
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Replace:
- `your-nextauth-secret-key` with a random string (you can generate one with `openssl rand -base64 32`)
- `your-google-client-id` with the Client ID from Step 3
- `your-google-client-secret` with the Client Secret from Step 3

## Step 5: Run Database Migrations

Since we've updated the database schema to support OAuth accounts, run:

```
npm run db:push
```

## Step 6: Start Your Application

```
npm run dev
```

Now you should be able to sign in with Google on your login and register pages!

## Troubleshooting

- If you encounter CORS errors, make sure your authorized origins are correctly set up
- If the redirect fails, check that your redirect URIs are properly configured
- For production, ensure you've added your production domain to both authorized origins and redirect URIs 