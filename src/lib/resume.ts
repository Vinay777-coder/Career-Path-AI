import { supabase } from '@/lib/supabase'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return supabase !== null && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
}

export async function saveResumeCheck(userId: string, analysisResult: any) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  
  const { data, error } = await supabase!
    .from('resume_checks')
    .insert({
      user_id: userId,
      ats_score: analysisResult.ats_score,
      feedback: analysisResult.feedback,
      strengths: analysisResult.strengths,
      weaknesses: analysisResult.weaknesses
    })
    .select()
    .single()
  
  return { data, error }
}

export async function getResumeChecks(userId: string) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured') }
  }
  
  const { data, error } = await supabase!
    .from('resume_checks')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export async function uploadResumeFile(userId: string, file: File) {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase not configured'), fileName: null }
  }
  
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/resume-${Date.now()}.${fileExt}`

  const { data, error } = await supabase!.storage
    .from('resumes')
    .upload(fileName, file)

  return { data, error, fileName }
}