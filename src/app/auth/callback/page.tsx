'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have URL parameters (OAuth callback)
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const error = urlParams.get('error')
        
        // If there's an error from OAuth provider
        if (error) {
          console.error('OAuth error:', error)
          router.push('/login?error=oauth_failed')
          return
        }
        
        // If no OAuth code, this might be a direct access - check for existing session
        if (!code) {
          // Check for mock session first
          const mockSession = localStorage.getItem('mock-auth-session')
          if (mockSession) {
            try {
              const session = JSON.parse(mockSession)
              if (session.expires_at > Date.now()) {
                router.push('/dashboard')
                return
              } else {
                localStorage.removeItem('mock-auth-session')
              }
            } catch (e) {
              localStorage.removeItem('mock-auth-session')
            }
          }
          
          // No valid session found, redirect to login
          router.push('/login?error=no_session')
          return
        }
        
        // Handle OAuth code if present
        if (!supabase) {
          router.push('/login?error=config_error')
          return
        }
        
        // Wait briefly for the route handler to process OAuth
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Check current session after OAuth processing
        const { data, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session check error:', sessionError)
          router.push('/login?error=session_failed')
          return
        }

        if (data.session) {
          // Successful OAuth authentication - redirect to dashboard
          console.log('OAuth session found, redirecting to dashboard')
          router.push('/dashboard')
        } else {
          // No session - wait a bit more and try again
          console.log('No OAuth session found, waiting and retrying...')
          setTimeout(async () => {
            if (supabase) {
              const { data: retryData } = await supabase.auth.getSession()
              if (retryData.session) {
                router.push('/dashboard')
              } else {
                router.push('/login?error=no_session')
              }
            } else {
              router.push('/login?error=config_error')
            }
          }, 2000)
        }
      } catch (err) {
        console.error('Unexpected auth callback error:', err)
        router.push('/login?error=unexpected_error')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Completing authentication...
        </h2>
        <p className="text-gray-600">
          Please wait while we sign you in.
        </p>
      </div>
    </div>
  )
}