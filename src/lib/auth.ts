import { supabase } from './supabase'

// Check if Supabase is configured
const isSupabaseConfigured = () => {
  return supabase !== null && process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
}

export async function signInWithGoogle() {
  try {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase not configured. Please add your Supabase credentials to .env.local') }
    }
    const { data, error } = await supabase!.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/auth/callback?next=/dashboard`
      }
    })
    return { data, error }
  } catch (err) {
    console.error('Google sign in error:', err)
    return { data: null, error: err }
  }
}

export async function signInWithGithub() {
  try {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase not configured. Please add your Supabase credentials to .env.local') }
    }
    const { data, error } = await supabase!.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3003'}/auth/callback?next=/dashboard`
      }
    })
    return { data, error }
  } catch (err) {
    console.error('GitHub sign in error:', err)
    return { data: null, error: err }
  }
}

export async function signOut() {
  try {
    // Clear mock session first
    clearMockSession()
    
    if (!isSupabaseConfigured()) {
      return { error: null } // No error for mock logout
    }
    const { error } = await supabase!.auth.signOut()
    return { error }
  } catch (err) {
    console.error('Sign out error:', err)
    return { error: err }
  }
}

// Real email/password authentication with Supabase
export async function signInWithEmailPassword(email: string, password: string) {
  try {
    if (!isSupabaseConfigured()) {
      // Use mock authentication for demo purposes
      if (email === 'demo@careerpath.ai' && password === 'demo123') {
        const mockUser = {
          id: 'mock-user-id',
          email: email,
          user_metadata: { username: 'Demo User' }
        }
        const sessionData = {
          user: mockUser,
          expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        }
        localStorage.setItem('mock-auth-session', JSON.stringify(sessionData))
        return { user: mockUser, error: null }
      } else {
        return { user: null, error: new Error('Invalid credentials. Try demo@careerpath.ai / demo123') }
      }
    }
    
    const { data, error } = await supabase!.auth.signInWithPassword({
      email,
      password,
    })
    
    return { user: data.user, error }
  } catch (err) {
    console.error('Email/password sign in error:', err)
    return { user: null, error: err }
  }
}

// Real email/password registration with Supabase
export async function signUpWithEmailPassword(email: string, password: string) {
  try {
    if (!isSupabaseConfigured()) {
      // Mock sign up - just create a demo account
      const mockUser = {
        id: 'mock-user-' + Date.now(),
        email: email,
        user_metadata: { username: email.split('@')[0] }
      }
      const sessionData = {
        user: mockUser,
        expires_at: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }
      localStorage.setItem('mock-auth-session', JSON.stringify(sessionData))
      return { user: mockUser, error: null }
    }
    
    const { data, error } = await supabase!.auth.signUp({
      email,
      password,
    })
    
    return { user: data.user, error }
  } catch (err) {
    console.error('Email/password sign up error:', err)
    return { user: null, error: err }
  }
}

// Get mock user from localStorage (client-side only)
export function getMockUser() {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return { user: null, error: null }
    }
    
    const session = localStorage.getItem('mock-auth-session')
    if (session) {
      const parsedSession = JSON.parse(session)
      // Check if session is expired
      if (parsedSession.expires_at > Date.now()) {
        return { user: parsedSession.user, error: null }
      } else {
        localStorage.removeItem('mock-auth-session')
      }
    }
    return { user: null, error: null }
  } catch (err) {
    return { user: null, error: err }
  }
}

// Clear mock session (client-side only)
export function clearMockSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mock-auth-session')
  }
}

export async function getCurrentUser() {
  try {
    // First check for mock user
    const mockAuth = getMockUser()
    if (mockAuth.user) {
      return mockAuth
    }
    
    // Then check Supabase
    if (!isSupabaseConfigured()) {
      return { user: null, error: new Error('Supabase not configured') }
    }
    const { data: { user }, error } = await supabase!.auth.getUser()
    return { user, error }
  } catch (err) {
    console.error('Get current user error:', err)
    return { user: null, error: err }
  }
}

export async function getProfile(userId: string) {
  try {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    const { data, error } = await supabase!
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    return { data, error }
  } catch (err) {
    console.error('Get profile error:', err)
    return { data: null, error: err }
  }
}

export async function updateProfile(userId: string, updates: any) {
  try {
    if (!isSupabaseConfigured()) {
      return { data: null, error: new Error('Supabase not configured') }
    }
    const { data, error } = await supabase!
      .from('profiles')
      .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
      .select()
      .single()
    
    return { data, error }
  } catch (err) {
    console.error('Update profile error:', err)
    return { data: null, error: err }
  }
}

// Check if user is authenticated (for client-side)
export async function checkAuth() {
  try {
    if (!isSupabaseConfigured()) {
      return { session: null, error: new Error('Supabase not configured') }
    }
    const { data: { session }, error } = await supabase!.auth.getSession()
    return { session, error }
  } catch (err) {
    console.error('Check auth error:', err)
    return { session: null, error: err }
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  if (!isSupabaseConfigured() || !supabase) {
    return { data: { subscription: null }, error: new Error('Supabase not configured') }
  }
  return supabase.auth.onAuthStateChange(callback)
}