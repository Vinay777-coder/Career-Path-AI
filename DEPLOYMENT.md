# CareerPath AI - Setup & Deployment Guide

## 🚀 Quick Setup Instructions

### 1. Environment Setup
1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase and Gemini API credentials

### 2. Supabase Setup
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run the SQL from `database.sql` in SQL Editor
4. Enable OAuth providers in Auth settings
5. Create storage buckets: `resumes` and `avatars`

### 3. Google Gemini API
1. Get API key from [Google AI Studio](https://aistudio.google.com)
2. Add to your `.env.local` file

### 4. Run Development Server
```bash
npm install
npm run dev
```

## 📦 Production Deployment

### Vercel Deployment
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
   - `NEXT_PUBLIC_APP_URL`

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## 🔧 Configuration Checklist

### Supabase Configuration
- [ ] Project created
- [ ] Database schema deployed from `database.sql`
- [ ] Google OAuth configured
- [ ] GitHub OAuth configured
- [ ] Storage buckets created (`resumes`, `avatars`)
- [ ] RLS policies enabled
- [ ] Environment variables set

### OAuth Setup
- [ ] Google Cloud Console project
- [ ] GitHub OAuth app
- [ ] Redirect URLs configured
- [ ] Client IDs added to Supabase

### API Keys
- [ ] Gemini API key obtained
- [ ] API key added to environment variables
- [ ] Billing enabled on Google Cloud (if required)

## 🛠️ Troubleshooting

### Common Issues
1. **OAuth not working**: Check redirect URLs in provider settings
2. **Database errors**: Ensure RLS policies are set correctly
3. **API errors**: Verify environment variables are set
4. **File upload issues**: Check storage bucket permissions

### Debug Steps
1. Check browser console for errors
2. Verify environment variables in Vercel/local
3. Test database connection in Supabase
4. Validate API keys in respective dashboards

## 🎯 Features Included

✅ **Authentication**: Google & GitHub OAuth via Supabase
✅ **User Profiles**: Customizable profiles with skills and goals
✅ **Career Roadmaps**: Interactive learning paths with progress tracking
✅ **Resume Analysis**: AI-powered ATS scoring and feedback
✅ **AI Assistant**: Chat interface for career guidance
✅ **Progress Tracking**: Dashboard with statistics and streaks
✅ **Responsive Design**: Mobile-friendly interface
✅ **File Upload**: PDF resume processing
✅ **Data Visualization**: Charts and progress indicators

## 📈 Next Steps

### MVP Extensions
- [ ] Community features (posts, comments)
- [ ] Mentor matching system
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Job board integration

### Performance Optimizations
- [ ] Image optimization
- [ ] Database indexing
- [ ] Caching strategies
- [ ] CDN setup
- [ ] Monitoring and analytics

## 📞 Support

- GitHub Issues: Create issues for bugs or feature requests
- Documentation: Check README.md for detailed information
- Database Schema: Refer to database.sql for structure

---

Your CareerPath AI application is now ready for production! 🎉