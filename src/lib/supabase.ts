import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Check if we have valid Supabase credentials
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return url.startsWith('http://') || url.startsWith('https://');
  } catch {
    return false;
  }
};

// Client-side Supabase client
export const supabase = (isValidUrl(supabaseUrl) && supabaseAnonKey && !supabaseUrl.includes('placeholder')) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;

// Client component Supabase client (for use in client components)
export const createSupabaseClient = () => createClientComponentClient()

// Server component Supabase client (for use in server components)
export const createSupabaseServerClient = () => {
  // Dynamic import to avoid issues with client components
  const { cookies } = require('next/headers')
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

// Database types
export type Profile = {
  id: string
  username?: string
  avatar_url?: string
  bio?: string
  skills?: string[]
  goals?: string
  streak_count: number
  last_login_date?: string
  created_at: string
  updated_at?: string
}

export type RoadmapRecord = {
  id: string
  title: string
  description?: string
  steps: any
  category: string
  created_at: string
}

export type ProgressRecord = {
  id: string
  user_id: string
  roadmap_id: string
  completed_steps: string[]
  completion_percentage: number
  created_at: string
}

export type ResumeCheckRecord = {
  id: string
  user_id: string
  ats_score: number
  feedback: string
  strengths: string[]
  weaknesses: string[]
  created_at: string
}