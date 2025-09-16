import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
    console.error('Supabase not configured')
    return NextResponse.redirect(new URL('/login?error=supabase_not_configured', request.url))
  }

  if (code) {
    try {
      // Create a Supabase client for route handlers
      const supabase = createRouteHandlerClient({ cookies })
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth callback error:', error)
        return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
      }

      if (data.session) {
        console.log('Authentication successful, redirecting to:', next)
        // Successful authentication, redirect to dashboard
        return NextResponse.redirect(new URL(next, request.url))
      }
    } catch (error) {
      console.error('Auth callback exception:', error)
      return NextResponse.redirect(new URL('/login?error=auth_failed', request.url))
    }
  }

  // If no code or session, redirect to login
  console.log('No auth code found, redirecting to login')
  return NextResponse.redirect(new URL('/login?error=no_code', request.url))
}