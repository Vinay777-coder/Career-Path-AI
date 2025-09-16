# OAuth Provider Setup Guide

This guide will help you fix the "validation_failed" error when using Google and GitHub OAuth providers.

## Current Issue
You're seeing this error: `{"code":400,"error_code":"validation_failed","msg":"Unsupported provider: provider is not enabled"}`

This happens because OAuth providers need to be properly configured in your Supabase project.

## Setup Instructions

### 1. Configure Supabase Environment Variables

First, make sure your `.env.local` file has valid Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 2. Enable OAuth Providers in Supabase Dashboard

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to Authentication > Providers**
3. **Enable Google OAuth**:
   - Toggle "Enable Google provider" to ON
   - Add your Google OAuth credentials:
     - Client ID (from Google Cloud Console)
     - Client Secret (from Google Cloud Console)

4. **Enable GitHub OAuth**:
   - Toggle "Enable GitHub provider" to ON
   - Add your GitHub OAuth credentials:
     - Client ID (from GitHub OAuth App)
     - Client Secret (from GitHub OAuth App)

### 3. Set Up Google OAuth (Google Cloud Console)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client IDs"
5. Set Application type to "Web application"
6. Add authorized redirect URIs:
   - `https://your-project-id.supabase.co/auth/v1/callback`
   - `http://localhost:3001/auth/callback` (for local development)
7. Copy the Client ID and Client Secret to Supabase

### 4. Set Up GitHub OAuth (GitHub Developer Settings)

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: CareerPath AI
   - **Homepage URL**: http://localhost:3001
   - **Authorization callback URL**: `https://your-project-id.supabase.co/auth/v1/callback`
4. Copy the Client ID and Client Secret to Supabase

### 5. Configure Redirect URLs

In your Supabase Dashboard:
1. Go to Authentication > URL Configuration
2. Add these redirect URLs:
   - `http://localhost:3001/auth/callback`
   - `https://your-domain.com/auth/callback` (for production)

### 6. Test the Setup

1. Restart your development server: `npm run dev`
2. Try logging in with Google or GitHub
3. The OAuth flow should now work without errors

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URL"**: Make sure the callback URLs match exactly in both OAuth providers and Supabase
2. **"OAuth provider not configured"**: Check that you've enabled the providers in Supabase Dashboard
3. **"Invalid client ID/secret"**: Verify the credentials are copied correctly from the OAuth providers

### Quick Fix for Development:

If you want to test email/password authentication while setting up OAuth:
1. The current app now supports real email/password authentication
2. Create an account using the "Sign Up" tab
3. Check your email for verification (if email confirmation is enabled)
4. Sign in with your credentials

## Email/Password Authentication

The app now supports real email/password authentication through Supabase:
- **Sign Up**: Creates a new account with email verification
- **Sign In**: Authenticates existing users
- No more demo credentials - use real authentication only

## Next Steps

1. Set up your Supabase project with real credentials
2. Configure OAuth providers as described above
3. Test both email/password and OAuth authentication
4. Deploy to production with proper redirect URLs

Need help? Check the [Supabase Auth Documentation](https://supabase.com/docs/guides/auth) for more detailed instructions.