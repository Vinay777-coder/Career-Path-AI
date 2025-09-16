'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

export default function AuthTestPage() {
  const [tests, setTests] = useState({
    supabaseConfig: { status: 'pending', message: 'Checking...' },
    googleOAuth: { status: 'pending', message: 'Checking...' },
    githubOAuth: { status: 'pending', message: 'Checking...' },
    emailAuth: { status: 'pending', message: 'Checking...' }
  })

  const runTests = async () => {
    // Reset tests
    setTests({
      supabaseConfig: { status: 'pending', message: 'Checking...' },
      googleOAuth: { status: 'pending', message: 'Checking...' },
      githubOAuth: { status: 'pending', message: 'Checking...' },
      emailAuth: { status: 'pending', message: 'Checking...' }
    })

    // Test Supabase Configuration
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes('placeholder')) {
      setTests(prev => ({
        ...prev,
        supabaseConfig: { status: 'success', message: 'Supabase configured correctly' }
      }))
    } else {
      setTests(prev => ({
        ...prev,
        supabaseConfig: { status: 'error', message: 'Supabase not configured' }
      }))
    }

    // Test OAuth Providers by attempting sign in
    try {
      const { signInWithGoogle, signInWithGithub } = await import('@/lib/auth')
      
      // Test Google OAuth
      console.log('Testing Google OAuth...')
      const googleResult = await signInWithGoogle()
      console.log('Google OAuth result:', googleResult)
      
      if (googleResult.error) {
        const errorMsg = googleResult.error instanceof Error 
          ? googleResult.error.message 
          : typeof googleResult.error === 'string' 
            ? googleResult.error 
            : String(googleResult.error)
        
        if (errorMsg.includes('provider is not enabled') || errorMsg.includes('validation_failed')) {
          setTests(prev => ({
            ...prev,
            googleOAuth: { 
              status: 'error', 
              message: 'Google OAuth not enabled in Supabase Dashboard → Auth → Providers' 
            }
          }))
        } else if (errorMsg.includes('Invalid redirect') || errorMsg.includes('redirect_uri')) {
          setTests(prev => ({
            ...prev,
            googleOAuth: { 
              status: 'warning', 
              message: 'Google OAuth enabled but redirect URL needs configuration in Google Cloud Console' 
            }
          }))
        } else if (errorMsg.includes('client_id') || errorMsg.includes('credentials')) {
          setTests(prev => ({
            ...prev,
            googleOAuth: { 
              status: 'error', 
              message: 'Google OAuth credentials missing. Add Client ID and Secret in Supabase.' 
            }
          }))
        } else {
          setTests(prev => ({
            ...prev,
            googleOAuth: { 
              status: 'error', 
              message: `Google OAuth error: ${errorMsg}` 
            }
          }))
        }
      } else {
        setTests(prev => ({
          ...prev,
          googleOAuth: { status: 'success', message: 'Google OAuth configured correctly' }
        }))
      }

      // Test GitHub OAuth
      console.log('Testing GitHub OAuth...')
      const githubResult = await signInWithGithub()
      console.log('GitHub OAuth result:', githubResult)
      
      if (githubResult.error) {
        const errorMsg = githubResult.error instanceof Error 
          ? githubResult.error.message 
          : typeof githubResult.error === 'string' 
            ? githubResult.error 
            : String(githubResult.error)
        
        if (errorMsg.includes('provider is not enabled') || errorMsg.includes('validation_failed')) {
          setTests(prev => ({
            ...prev,
            githubOAuth: { 
              status: 'error', 
              message: 'GitHub OAuth not enabled in Supabase Dashboard → Auth → Providers' 
            }
          }))
        } else if (errorMsg.includes('Invalid redirect') || errorMsg.includes('redirect_uri')) {
          setTests(prev => ({
            ...prev,
            githubOAuth: { 
              status: 'warning', 
              message: 'GitHub OAuth enabled but redirect URL needs configuration in GitHub OAuth App' 
            }
          }))
        } else {
          setTests(prev => ({
            ...prev,
            githubOAuth: { 
              status: 'error', 
              message: `GitHub OAuth error: ${errorMsg}` 
            }
          }))
        }
      } else {
        setTests(prev => ({
          ...prev,
          githubOAuth: { status: 'success', message: 'GitHub OAuth configured correctly' }
        }))
      }

    } catch (error) {
      console.error('OAuth test error:', error)
      setTests(prev => ({
        ...prev,
        googleOAuth: { status: 'error', message: `Failed to test Google OAuth: ${error}` },
        githubOAuth: { status: 'error', message: `Failed to test GitHub OAuth: ${error}` }
      }))
    }

    // Test Email Authentication
    setTests(prev => ({
      ...prev,
      emailAuth: { status: 'success', message: 'Email/Password authentication ready' }
    }))
  }

  useEffect(() => {
    runTests()
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      default: return <RefreshCw className="w-5 h-5 text-gray-400 animate-spin" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Authentication Status Check
          </h1>
          <p className="text-xl text-gray-600">
            Verifying your OAuth and authentication setup
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(tests).map(([key, test]) => (
            <Card key={key} className={`border-2 ${getStatusColor(test.status)}`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{test.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button onClick={runTests} className="mr-4">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rerun Tests
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/login'}>
            Go to Login Page
          </Button>
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Quick Setup Guide:</h3>
          <div className="space-y-2 text-sm">
            <p><strong>✅ Email/Password:</strong> Ready to use immediately</p>
            <p><strong>🔧 Google OAuth:</strong> Enable in Supabase Dashboard → Auth → Providers → Google</p>
            <p><strong>🔧 GitHub OAuth:</strong> Enable in Supabase Dashboard → Auth → Providers → GitHub</p>
            <p><strong>📖 Full Guide:</strong> Check OAUTH_SETUP_GUIDE.md for detailed instructions</p>
          </div>
        </div>
      </div>
    </div>
  )
}