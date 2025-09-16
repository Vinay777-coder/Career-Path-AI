## Google OAuth Consent Screen Setup Guide

### Issue: 403 "You do not have access to this page"
This error occurs when your OAuth consent screen isn't properly configured for your user.

### Solution: Configure OAuth Consent Screen

#### Step 1: Access OAuth Consent Screen
1. Go to: https://console.cloud.google.com/
2. Select your project
3. Navigate: APIs & Services → OAuth consent screen

#### Step 2: Configure User Type
**Choose "External" for testing:**
- External: Anyone with a Google account can use your app
- Internal: Only users in your Google Workspace organization

**Recommended for development: External**

#### Step 3: Fill Required Information
**App Information:**
- App name: `CareerPath AI`
- User support email: `your-email@gmail.com`
- App logo: (optional for testing)

**Developer contact information:**
- Email addresses: `your-email@gmail.com`

**Authorized domains (Important!):**
- Add: `localhost` (for local development)
- Add: `supabase.co` (for Supabase auth)

#### Step 4: Configure Scopes
**Required scopes for basic authentication:**
- `../auth/userinfo.email`
- `../auth/userinfo.profile`
- `openid`

**These are usually added automatically by Supabase**

#### Step 5: Test Users (If in Testing mode)
**Add your email address as a test user:**
- Click "ADD USERS"
- Enter your Gmail address
- Save

#### Step 6: Review and Save
- Review all settings
- Click "SAVE AND CONTINUE"
- Publish the app (or keep in testing with test users)

### Alternative Quick Fix for Development

If you want to quickly test without full OAuth setup:

#### Option 1: Use Email/Password Authentication
- Go to: http://localhost:3002/login
- Switch to "Email & Password" tab
- Create an account with your email
- This bypasses Google OAuth entirely

#### Option 2: Add Your Email as Test User
1. Google Cloud Console → OAuth consent screen
2. Test users section
3. Add your Gmail address
4. Save and try again

### Verification Steps

After configuring:
1. Clear browser cache/cookies
2. Go to: http://localhost:3002/login
3. Click "Continue with Google"
4. You should see Google's consent screen (not 403 error)
5. After consent, should redirect to dashboard

### Common OAuth Consent Screen Errors:

**"App isn't verified"**
- Solution: Click "Advanced" → "Go to CareerPath AI (unsafe)"
- For production: Submit for verification

**"redirect_uri_mismatch"**
- Solution: Check OAuth credentials have correct redirect URI
- Should be: `https://meicahgitveuoeihigrk.supabase.co/auth/v1/callback`

**"access_denied"**
- Solution: User clicked "Cancel" - try again

### Quick Test Command:
```bash
# Make sure server is running on correct port
npm run dev

# Test at: http://localhost:3002/login
```

### Need Help?
If still getting 403 errors, please share:
1. Screenshot of OAuth consent screen configuration
2. Your Google account type (personal Gmail vs Workspace)
3. Whether you added your email as a test user