import { supabase } from '@/lib/supabase'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return supabase !== null && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
}

export async function getRoadmaps() {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  
  const { data, error } = await supabase!
    .from('roadmaps')
    .select('*')
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export async function getRoadmapById(id: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  
  const { data, error } = await supabase!
    .from('roadmaps')
    .select('*')
    .eq('id', id)
    .single()
  
  return { data, error }
}

export async function getUserProgress(userId: string, roadmapId: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  
  const { data, error } = await supabase!
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .eq('roadmap_id', roadmapId)
    .single()
  
  return { data, error }
}

export async function updateUserProgress(userId: string, roadmapId: string, completedSteps: string[]) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  
  const completionPercentage = Math.round((completedSteps.length / 100) * 100) // This should be calculated based on total steps

  const { data, error } = await supabase!
    .from('progress')
    .upsert({
      user_id: userId,
      roadmap_id: roadmapId,
      completed_steps: completedSteps,
      completion_percentage: completionPercentage
    })
    .select()
    .single()
  
  return { data, error }
}