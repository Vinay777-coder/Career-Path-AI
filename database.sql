-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT,
  avatar_url TEXT,
  bio TEXT,
  skills TEXT[],
  goals TEXT,
  streak_count INTEGER DEFAULT 0,
  last_login_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  steps JSONB NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create progress tracking table
CREATE TABLE IF NOT EXISTS progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  roadmap_id UUID REFERENCES roadmaps ON DELETE CASCADE,
  completed_steps TEXT[],
  completion_percentage INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, roadmap_id)
);

-- Create resume checks table
CREATE TABLE IF NOT EXISTS resume_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  ats_score INTEGER NOT NULL,
  feedback TEXT NOT NULL,
  strengths TEXT[],
  weaknesses TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create policies for progress
CREATE POLICY "Users can view own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policies for resume checks
CREATE POLICY "Users can view own resume checks" ON resume_checks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resume checks" ON resume_checks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Roadmaps are public for reading
CREATE POLICY "Anyone can view roadmaps" ON roadmaps
  FOR SELECT USING (true);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies
CREATE POLICY "Users can upload their own resume"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own resume"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample roadmaps
INSERT INTO roadmaps (title, description, category, steps) VALUES
(
  'Backend Developer',
  'Complete roadmap to become a backend developer',
  'Backend',
  '[
    {
      "id": "1",
      "title": "Learn Programming Fundamentals",
      "description": "Master basic programming concepts and choose a language",
      "resources": [
        {"title": "JavaScript Basics", "url": "https://javascript.info/", "type": "documentation"},
        {"title": "Python for Beginners", "url": "https://www.python.org/about/gettingstarted/", "type": "documentation"}
      ]
    },
    {
      "id": "2", 
      "title": "Database Fundamentals",
      "description": "Learn SQL and database design principles",
      "resources": [
        {"title": "SQL Tutorial", "url": "https://www.w3schools.com/sql/", "type": "course"},
        {"title": "Database Design", "url": "https://www.lucidchart.com/pages/database-diagram/database-design", "type": "article"}
      ]
    },
    {
      "id": "3",
      "title": "API Development", 
      "description": "Build RESTful APIs and understand HTTP",
      "resources": [
        {"title": "REST API Tutorial", "url": "https://restfulapi.net/", "type": "documentation"},
        {"title": "Express.js Guide", "url": "https://expressjs.com/", "type": "documentation"}
      ]
    }
  ]'::jsonb
),
(
  'Frontend Developer',
  'Complete roadmap to become a frontend developer', 
  'Frontend',
  '[
    {
      "id": "1",
      "title": "HTML & CSS",
      "description": "Master the building blocks of web development",
      "resources": [
        {"title": "HTML Tutorial", "url": "https://www.w3schools.com/html/", "type": "course"},
        {"title": "CSS Tutorial", "url": "https://www.w3schools.com/css/", "type": "course"}
      ]
    },
    {
      "id": "2",
      "title": "JavaScript",
      "description": "Learn modern JavaScript and ES6+ features", 
      "resources": [
        {"title": "JavaScript Guide", "url": "https://javascript.info/", "type": "documentation"},
        {"title": "You Don''t Know JS", "url": "https://github.com/getify/You-Dont-Know-JS", "type": "article"}
      ]
    },
    {
      "id": "3",
      "title": "React",
      "description": "Build interactive UIs with React",
      "resources": [
        {"title": "React Docs", "url": "https://react.dev/", "type": "documentation"},
        {"title": "React Tutorial", "url": "https://react.dev/learn", "type": "course"}
      ]
    }
  ]'::jsonb
),
(
  'Full Stack Developer',
  'Complete roadmap combining frontend and backend skills',
  'Full Stack', 
  '[
    {
      "id": "1",
      "title": "Frontend Fundamentals",
      "description": "HTML, CSS, JavaScript basics",
      "resources": [
        {"title": "MDN Web Docs", "url": "https://developer.mozilla.org/", "type": "documentation"}
      ]
    },
    {
      "id": "2", 
      "title": "Backend Development",
      "description": "Server-side programming and databases",
      "resources": [
        {"title": "Node.js Guide", "url": "https://nodejs.org/en/docs/", "type": "documentation"}
      ]
    },
    {
      "id": "3",
      "title": "DevOps & Deployment",
      "description": "Deploy and manage applications",
      "resources": [
        {"title": "Docker Tutorial", "url": "https://docs.docker.com/get-started/", "type": "course"}
      ]
    }
  ]'::jsonb
),
(
  'Data Science',
  'Complete roadmap to become a data scientist',
  'Data Science',
  '[
    {
      "id": "1",
      "title": "Python & Statistics",
      "description": "Programming and statistical foundations",
      "resources": [
        {"title": "Python for Data Science", "url": "https://www.python.org/", "type": "course"}
      ]
    },
    {
      "id": "2",
      "title": "Machine Learning", 
      "description": "ML algorithms and frameworks",
      "resources": [
        {"title": "Scikit-learn", "url": "https://scikit-learn.org/", "type": "documentation"}
      ]
    },
    {
      "id": "3",
      "title": "Data Visualization",
      "description": "Present insights effectively",
      "resources": [
        {"title": "Matplotlib Guide", "url": "https://matplotlib.org/", "type": "documentation"}
      ]
    }
  ]'::jsonb
);