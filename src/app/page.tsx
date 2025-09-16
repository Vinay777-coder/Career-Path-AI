import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Navbar } from '@/components/ui/navbar'
import { Footer } from '@/components/ui/footer'
import { ConfigNotification } from '@/components/ui/config-notification'
import { ArrowRight, Target, BookOpen, Brain, Users, Star, Check, Zap, Globe, Shield, TrendingUp, Sparkles, Rocket, Award } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Configuration Notification */}
      <ConfigNotification />
      
      {/* Navigation */}
      <Navbar showAuth={true} />

      {/* Hero Section */}
      <div className="relative overflow-hidden hero-section">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float animate-delay-200"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-400/10 rounded-full blur-3xl animate-float animate-delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-sm font-medium text-blue-800 mb-8 animate-fade-in-scale">
              <Sparkles className="w-4 h-4 mr-2" />
              🚀 AI-Powered Career Guidance Platform
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight animate-slide-in-up">
              <span className="text-gray-900">Accelerate Your</span>
              <br />
              <span className="text-gradient animate-gradient-shift">Tech Career</span>
              <br />
              <span className="text-gray-900">with AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-up animate-delay-200">
              Get personalized roadmaps, AI-powered resume analysis, and expert guidance 
              to land your dream job in tech. Join thousands of developers already advancing their careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-in-up animate-delay-300">
              <Link href="/login">
                <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-blue-500/25 button-glow">
                  <Rocket className="mr-3 h-5 w-5" />
                  Start Your Journey
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white shadow-xl">
                <Star className="mr-3 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-in-up animate-delay-500">
              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-white fill-current" />
                </div>
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Secure</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-sm font-medium text-blue-800 mb-8">
              <Target className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
              Everything You Need to
              <span className="text-gradient block">Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and AI-powered insights to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Card className="feature-card group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">Personalized Roadmaps</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  AI-curated learning paths for Backend, Frontend, Full Stack, and Data Science careers with step-by-step guidance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">Progress Tracking</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Visual dashboards with completion rates, streak tracking, and achievement badges to keep you motivated
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">AI Resume Analysis</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Get instant ATS scores, detailed feedback, and personalized recommendations powered by advanced AI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">AI Career Assistant</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  24/7 intelligent chat support for career guidance, interview prep, and skill development advice
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">Curated Resources</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Access to courses, tutorials, and documentation tailored to your learning path
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="feature-card group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-3">Global Community</CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  Connect with developers worldwide, share experiences, and learn from industry experts
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-shadow">10K+</div>
              <div className="text-blue-100 font-medium">Active Users</div>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-shadow">50K+</div>
              <div className="text-blue-100 font-medium">Resumes Analyzed</div>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-shadow">95%</div>
              <div className="text-blue-100 font-medium">Success Rate</div>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold mb-2 text-shadow">24/7</div>
              <div className="text-blue-100 font-medium">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-sm font-medium text-blue-800 mb-8">
            <Rocket className="w-4 h-4 mr-2" />
            Ready to Get Started?
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Transform Your
            <span className="text-gradient block">Career Today</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who have already accelerated their careers with CareerPath AI. 
            Start your journey to success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/login">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-2xl hover:shadow-blue-500/25 button-glow">
                <Rocket className="mr-3 h-5 w-5" />
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>No setup required</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>Start immediately</span>
            </div>
            <div className="flex items-center">
              <Check className="w-4 h-4 mr-2 text-green-500" />
              <span>All features included</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}