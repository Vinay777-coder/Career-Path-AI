'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signInWithGoogle, signInWithGithub, signInWithEmailPassword, signUpWithEmailPassword } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingDots } from '@/components/ui/loading'
import { Github, Chrome, Brain, ArrowLeft, Shield, Zap, Sparkles, Star, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [provider, setProvider] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [authMethod, setAuthMethod] = useState<'oauth' | 'email'>('oauth')
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()



  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setProvider('email')
    setError('')

    try {
      const result = isSignUp 
        ? await signUpWithEmailPassword(email, password)
        : await signInWithEmailPassword(email, password)
      
      if (result.error) {
        const errorMessage = result.error instanceof Error 
          ? result.error.message 
          : typeof result.error === 'string' 
            ? result.error 
            : (isSignUp ? 'Sign up failed' : 'Login failed')
        setError(errorMessage)
      } else if (result.user) {
        if (isSignUp) {
          alert('Account created successfully! Please check your email to verify your account, then sign in.')
          setIsSignUp(false) // Switch back to sign in mode
          setEmail('')
          setPassword('')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    }
    
    setLoading(false)
    setProvider(null)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setProvider('google')
    const { error } = await signInWithGoogle()
    if (error) {
      console.error('Error signing in with Google:', error)
      alert('Error signing in with Google: ' + (error instanceof Error ? error.message : String(error)))
    }
    setLoading(false)
    setProvider(null)
  }

  const handleGithubSignIn = async () => {
    setLoading(true)
    setProvider('github')
    const { error } = await signInWithGithub()
    if (error) {
      console.error('Error signing in with GitHub:', error)
      alert('Error signing in with GitHub: ' + (error instanceof Error ? error.message : String(error)))
    }
    setLoading(false)
    setProvider(null)
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float animate-delay-200"></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-float animate-delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="nav-blur relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Button variant="ghost" size="sm" className="hover:bg-white/50">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gradient">CareerPath AI</h1>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8">
          {/* Hero Section */}
          <div className="text-center animate-fade-in-scale">
            <div className="relative mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl animate-float">
              <Brain className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-pulse">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome Back
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sign in to continue your career journey with AI-powered guidance
            </p>
          </div>

          {/* Login Card */}
          <Card className="feature-card group border-0 shadow-2xl animate-slide-in-up animate-delay-200">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Sign In to Your Account
              </CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Choose your preferred sign-in method to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10" style={{ pointerEvents: 'auto' }}>
              {/* Auth Method Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setAuthMethod('oauth')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    authMethod === 'oauth'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  OAuth Login
                </button>
                <button
                  onClick={() => setAuthMethod('email')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                    authMethod === 'email'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Email & Password
                </button>
              </div>

              {authMethod === 'email' ? (
                /* Email/Password Form */
                <form onSubmit={handleEmailSignIn} className="space-y-4 relative z-10" style={{ pointerEvents: 'auto' }}>
                  {/* Sign In/Sign Up Toggle */}
                  <div className="flex p-1 bg-gray-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        !isSignUp
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isSignUp
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Sign Up
                    </button>
                  </div>


                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <span className="text-sm text-red-800">{error}</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative z-10">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="relative z-20 w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder="Enter your email"
                          autoComplete="email"
                          style={{ pointerEvents: 'auto' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative z-10">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="relative z-20 w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                          placeholder={isSignUp ? "Enter a password (min 6 characters)" : "Enter your password"}
                          autoComplete="current-password"
                          style={{ pointerEvents: 'auto' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 z-30 pointer-events-auto"
                          style={{ pointerEvents: 'auto' }}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || !email || !password}
                    className={`w-full h-14 transition-all duration-200 shadow-lg hover:shadow-xl text-base font-medium ${
                      loading || !email || !password
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }`}
                  >
                    {loading && provider === 'email' ? (
                      <LoadingDots className="mr-3 text-white" />
                    ) : (
                      <Mail className="w-5 h-5 mr-3" />
                    )}
                    {loading && provider === 'email' ? 'Processing...' : 
                     !email || !password ? 'Enter Email & Password' : (isSignUp ? 'Create Account' : 'Sign In with Email')}
                  </Button>

                </form>
              ) : (
                /* OAuth Buttons */
                <div className="space-y-4">
                  {/* Google Sign In */}
                  <Button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full h-14 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl text-base font-medium"
                    variant="outline"
                  >
                    {loading && provider === 'google' ? (
                      <LoadingDots className="mr-3 text-blue-500" />
                    ) : (
                      <Chrome className="w-5 h-5 mr-3" />
                    )}
                    Continue with Google
                  </Button>

                  {/* GitHub Sign In */}
                  <Button
                    onClick={handleGithubSignIn}
                    disabled={loading}
                    className="w-full h-14 bg-gray-900 hover:bg-gray-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl text-base font-medium"
                  >
                    {loading && provider === 'github' ? (
                      <LoadingDots className="mr-3 text-white" />
                    ) : (
                      <Github className="w-5 h-5 mr-3" />
                    )}
                    Continue with GitHub
                  </Button>
                </div>
              )}

              <div className="text-center py-4">
                <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
                  By signing in, you agree to our{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 underline">Privacy Policy</Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-1 gap-6 mt-12 animate-slide-in-up animate-delay-300">
            <div className="flex items-center space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">Secure Authentication</div>
                <div className="text-sm text-gray-600 mt-1">Your data is protected with industry-standard security measures</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">Instant Access</div>
                <div className="text-sm text-gray-600 mt-1">Get started immediately with AI-powered career features</div>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-base">Premium Experience</div>
                <div className="text-sm text-gray-600 mt-1">Join 10,000+ developers advancing their careers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}