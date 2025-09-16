# CareerPath AI - Your AI-Powered Career Guide

A comprehensive full-stack SaaS application that provides personalized career guidance, roadmaps, and AI-powered resume analysis to help developers advance their careers.

## 🌟 Features

### 🔐 Authentication
- Google & GitHub OAuth login via Supabase
- Secure user sessions and profile management
- Automatic profile creation on first login

### 🛣️ Career Roadmaps
- Pre-built roadmaps for Backend, Frontend, Full Stack, and Data Science
- Interactive progress tracking with step completion
- Resource links and learning materials for each step
- Visual progress indicators and completion percentages

### 📊 Progress Tracking
- Personal dashboard with career statistics
- Daily streak tracking to maintain consistency
- Progress visualization with charts and graphs
- Achievement system for completed milestones

### 📄 AI Resume Analysis
- Upload PDF or text resumes for instant analysis
- AI-powered ATS scoring using Google Gemini
- Detailed feedback with strengths and weaknesses
- Historical analysis tracking and improvement suggestions

### 🤖 AI Career Assistant
- Interactive chat interface powered by Google Gemini
- Personalized career guidance and advice
- Quick question templates for common career queries
- Context-aware responses based on user profile

### 👤 User Profiles
- Customizable user profiles with skills and goals
- Bio and career objective management
- Skill tracking and portfolio integration
- Profile completion incentives

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, TailwindCSS
- **UI Components**: Radix UI primitives with custom styling
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with OAuth providers
- **AI Integration**: Google Gemini API
- **File Storage**: Supabase Storage for resumes and avatars
- **Charts**: Recharts for data visualization
- **PDF Processing**: pdf-parse for resume text extraction

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud account (for Gemini API)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd careerpath-ai
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Run the SQL commands from `database.sql` in the Supabase SQL editor
4. Enable Google and GitHub OAuth in Authentication > Providers
5. Set up storage buckets for 'resumes' and 'avatars'

### 3. Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com)
2. Create a new API key
3. Copy the API key for environment setup

### 4. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# App Configuration  
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── chat/              # AI assistant chat
│   ├── dashboard/         # User dashboard
│   ├── profile/           # User profile management
│   ├── resume/            # Resume analysis
│   ├── roadmaps/          # Career roadmaps
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── lib/                  # Utility libraries
│   ├── ai.ts             # AI integration functions
│   ├── auth.ts           # Authentication functions
│   ├── resume.ts         # Resume processing
│   ├── roadmaps.ts       # Roadmap data functions
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # General utilities
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles**: User profile information and preferences
- **roadmaps**: Career roadmap definitions and steps
- **progress**: User progress tracking for roadmaps  
- **resume_checks**: AI resume analysis results

See `database.sql` for complete schema and setup.

## 🔧 API Endpoints

### Authentication
- Uses Supabase Auth with automatic profile creation

### Resume Analysis
- `POST /api/analyze-resume` - Analyze uploaded resume with AI

### AI Chat
- `POST /api/chat` - Send messages to AI career assistant

## 🎨 UI/UX Features

- Responsive design for desktop and mobile
- Dark/light mode support (configured in globals.css)
- Loading states and error handling
- Interactive progress indicators
- Smooth animations with Framer Motion
- Accessible components with Radix UI

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 🔒 Security Features

- Row Level Security (RLS) enabled on all tables
- User data isolation with Supabase policies
- Secure file upload with storage policies
- API route protection with authentication checks
- Input validation and sanitization

## 📈 Performance Optimizations

- Next.js App Router for optimal loading
- Image optimization with Next.js Image component
- Lazy loading for components
- Efficient database queries with proper indexing
- Caching strategies for API responses

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the database schema in `database.sql`

## 🔮 Future Features

- [ ] Community features with user posts and comments
- [ ] Mentor matching system
- [ ] Advanced analytics and insights
- [ ] Mobile app with React Native
- [ ] Integration with job boards
- [ ] Video course recommendations
- [ ] Achievement badges and gamification
- [ ] Email notifications and reminders

---

Built with ❤️ using Next.js, Supabase, and Google Gemini AI