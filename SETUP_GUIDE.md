# 🚀 CareerPath AI - Complete Setup Guide

## Step 1: Supabase Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization or use existing
4. Create a new project
5. Wait for the project to be ready (2-3 minutes)

### 1.2 Get Your Credentials
1. Go to Settings > API
2. Copy your Project URL
3. Copy your anon (public) key
4. Update your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 1.3 Run Database Setup
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the entire contents of `database.sql`
3. Click "Run" to execute all the SQL commands
4. This will create all tables, policies, and sample data

### 1.4 Configure Authentication
1. Go to Authentication > Providers
2. Enable Google:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project-ref.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for development)
   - Copy Client ID and Client Secret to Supabase
   
3. Enable GitHub:
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create new OAuth App
   - Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
   - Copy Client ID and Client Secret to Supabase

### 1.5 Setup Storage
1. Go to Storage
2. Create bucket named `resumes` (private)
3. Create bucket named `avatars` (public)
4. The policies should already be created from the SQL script

## Step 2: Google Gemini API Setup

### 2.1 Get API Key
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Click "Get API key"
3. Create new project or use existing
4. Create API key
5. Add to your `.env.local`:

```env
GEMINI_API_KEY=your-gemini-api-key-here
```

## Step 3: Final Environment Setup

Your complete `.env.local` should look like:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key-here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 4: Test the Application

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test Authentication:**
   - Go to `http://localhost:3000`
   - Click "Get Started"
   - Try signing in with Google or GitHub
   - Should redirect to `/dashboard` after successful login

3. **Test Database Connection:**
   - After login, check if your profile is created
   - Go to `/roadmaps` to see if roadmaps load
   - Check Supabase dashboard to see if data is being created

4. **Test AI Features:**
   - Go to `/chat` and try asking a question
   - Go to `/resume` and try uploading a PDF
   - Both should work if Gemini API key is correct

## Step 5: Troubleshooting

### Common Issues:

1. **Authentication not working:**
   - Check OAuth redirect URLs in Google/GitHub settings
   - Make sure Supabase Auth providers are enabled
   - Check browser console for errors

2. **Database errors:**
   - Make sure all SQL from `database.sql` was executed
   - Check if RLS policies are enabled
   - Verify tables exist in Supabase dashboard

3. **AI features not working:**
   - Verify Gemini API key is correct
   - Check if billing is enabled on Google Cloud
   - Look at server logs for API errors

4. **Build errors:**
   - Make sure all dependencies are installed: `npm install`
   - Clear Next.js cache: `rm -rf .next`
   - Restart development server

## Step 6: Production Deployment

### 6.1 Vercel Deployment
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel dashboard
4. Update redirect URLs to include your production domain

### 6.2 Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
GEMINI_API_KEY=your-gemini-api-key-here
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## ✅ Success Checklist

- [ ] Supabase project created and configured
- [ ] Database schema deployed
- [ ] Google OAuth configured
- [ ] GitHub OAuth configured
- [ ] Storage buckets created
- [ ] Gemini API key obtained
- [ ] Environment variables set
- [ ] Application runs locally
- [ ] Authentication works
- [ ] Database operations work
- [ ] AI features work
- [ ] Ready for production deployment

## 🎉 You're All Set!

Your CareerPath AI application should now be fully functional with:
- ✅ Modern, professional UI/UX
- ✅ Complete authentication system
- ✅ Working database integration
- ✅ AI-powered features
- ✅ Full-stack functionality
- ✅ Production-ready code

If you encounter any issues, check the console logs and Supabase logs for detailed error messages.