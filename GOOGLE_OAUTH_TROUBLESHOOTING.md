## Google OAuth Troubleshooting Guide

### Common Google OAuth Error Messages and Solutions:

#### 1. **"validation_failed" or "Unsupported provider: provider is not enabled"**
**Cause:** Google OAuth is not enabled in your Supabase project
**Solution:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `meicahgitveuoeihigrk`
3. Navigate to **Authentication** → **Providers**
4. Find **Google** in the list
5. Toggle it **ON**
6. Add your Google OAuth credentials (see steps below)

#### 2. **"Invalid redirect URI"**
**Cause:** The callback URL doesn't match what's configured in Google Cloud Console
**Solution:**
- Your callback URL should be: `https://meicahgitveuoeihigrk.supabase.co/auth/v1/callback`
- Add this exact URL to your Google Cloud Console OAuth app

#### 3. **"OAuth provider not configured"**
**Cause:** Missing Google Client ID and Secret in Supabase
**Solution:** Follow the Google Cloud Console setup below

---

## Step-by-Step Google OAuth Setup:

### Part 1: Google Cloud Console Setup

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account

2. **Create or Select Project:**
   - Create a new project OR select existing one
   - Project name suggestion: "CareerPath AI"

3. **Enable Google+ API:**
   - Go to **APIs & Services** → **Library**
   - Search for "Google+ API" 
   - Click **Enable**

4. **Create OAuth 2.0 Credentials:**
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **OAuth 2.0 Client IDs**
   - Choose **Web application**
   - Name: "CareerPath AI Web Client"

5. **Configure Authorized URLs:**
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3009
     https://meicahgitveuoeihigrk.supabase.co
     ```
   - **Authorized redirect URIs:**
     ```
     https://meicahgitveuoeihigrk.supabase.co/auth/v1/callback
     http://localhost:3009/auth/callback
     ```

6. **Copy Credentials:**
   - Copy the **Client ID** 
   - Copy the **Client Secret**

### Part 2: Supabase Configuration

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select project: `meicahgitveuoeihigrk`

2. **Enable Google Provider:**
   - Go to **Authentication** → **Providers**
   - Find **Google** and toggle it **ON**

3. **Add Google Credentials:**
   - Paste your **Google Client ID**
   - Paste your **Google Client Secret**
   - Click **Save**

4. **Configure Site URL (if needed):**
   - Go to **Authentication** → **URL Configuration**
   - Set **Site URL** to: `http://localhost:3009`
   - Add **Redirect URLs:**
     ```
     http://localhost:3009/auth/callback
     https://your-production-domain.com/auth/callback
     ```

---

## Testing Your Setup:

1. **Clear Browser Cache/Cookies**
2. **Restart your development server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```
3. **Test Google Login:**
   - Go to: http://localhost:3009/login
   - Click "Continue with Google"
   - Should redirect to Google sign-in

---

## Quick Diagnostic Commands:

1. **Check your Supabase project URL:**
   ```
   Your project: https://meicahgitveuoeihigrk.supabase.co
   ```

2. **Verify callback URL format:**
   ```
   Correct: https://meicahgitveuoeihigrk.supabase.co/auth/v1/callback
   Wrong: https://meicahgitveuoeihigrk.supabase.co/auth/callback
   ```

3. **Test API connection:**
   ```bash
   curl -H "apikey: YOUR_SUPABASE_ANON_KEY" \
        https://meicahgitveuoeihigrk.supabase.co/auth/v1/providers
   ```

---

## What Error Are You Seeing?

Please share the exact error message you're getting when clicking "Continue with Google" so I can provide more specific help!