export interface User {
  id: string
  username?: string
  avatar_url?: string
  bio?: string
  skills?: string[]
  goals?: string
  streak_count: number
  last_login_date?: string
  created_at: string
}

export interface Roadmap {
  id: string
  title: string
  description?: string
  steps: RoadmapStep[]
  category: string
  created_at: string
}

export interface RoadmapStep {
  id: string
  title: string
  description?: string
  resources: Resource[]
  completed?: boolean
}

export interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'course' | 'documentation'
}

export interface Progress {
  id: string
  user_id: string
  roadmap_id: string
  completed_steps: string[]
  completion_percentage: number
  created_at: string
}

export interface ResumeCheck {
  id: string
  user_id: string
  ats_score: number
  feedback: string
  strengths: string[]
  weaknesses: string[]
  created_at: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}