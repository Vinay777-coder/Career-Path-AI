'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, getProfile, signOut } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { LoadingSpinner } from '@/components/ui/loading'
import { ConfigNotification } from '@/components/ui/config-notification'
import { 
  User, LogOut, Target, Brain, MessageSquare, Settings, Trophy, Flame,
  TrendingUp, Users, Bell, Search, Menu, ChevronRight, Briefcase,
  Monitor, Database, Smartphone, Send, Heart, MessageCircle, Edit3
} from 'lucide-react'
import Link from 'next/link'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

interface Profile {
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

const mockProgressData = [
  { name: 'Jan', progress: 65, completed: 12 },
  { name: 'Feb', progress: 75, completed: 18 },
  { name: 'Mar', progress: 85, completed: 24 },
  { name: 'Apr', progress: 70, completed: 20 },
  { name: 'May', progress: 90, completed: 28 },
  { name: 'Jun', progress: 95, completed: 32 },
]

const mockSkillData = [
  { name: 'JavaScript', progress: 85, color: '#F7DF1E' },
  { name: 'React', progress: 80, color: '#61DAFB' },
  { name: 'Node.js', progress: 75, color: '#339933' },
  { name: 'Python', progress: 70, color: '#3776AB' },
  { name: 'TypeScript', progress: 65, color: '#3178C6' },
]

const mockRoadmaps = [
  { id: 1, title: 'Full Stack Developer', progress: 75, category: 'Web Development', icon: Monitor },
  { id: 2, title: 'Data Scientist', progress: 45, category: 'Data Science', icon: Database },
  { id: 3, title: 'Mobile Developer', progress: 30, category: 'Mobile Development', icon: Smartphone },
]

const mockCommunityPosts = [
  { id: 1, author: 'Sarah Chen', content: 'Just completed my React certification! 🎉', time: '2h ago', likes: 24 },
  { id: 2, author: 'Mike Johnson', content: 'Looking for study partners for system design interviews', time: '4h ago', likes: 12 },
  { id: 3, author: 'Emma Davis', content: 'Landed my dream job at Google! Thanks to this community ❤️', time: '6h ago', likes: 156 },
]

type ActiveSection = 'dashboard' | 'profile' | 'roadmaps' | 'suggestions' | 'mentor' | 'community' | 'settings'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'roadmaps', label: 'Roadmaps', icon: Target },
    { id: 'suggestions', label: 'Career Suggestions', icon: Briefcase },
    { id: 'mentor', label: 'AI Mentor', icon: Brain },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  useEffect(() => {
    async function loadUserData() {
      try {
        const { user: currentUser, error: userError } = await getCurrentUser()
        
        if (userError || !currentUser) {
          router.push('/login')
          return
        }

        setUser(currentUser)

        const { data: profileData, error: profileError } = await getProfile(currentUser.id)
        if (!profileError && profileData) {
          setProfile(profileData)
        } else {
          const defaultProfile = {
            id: currentUser.id,
            username: currentUser.user_metadata?.full_name || 'Developer',
            avatar_url: currentUser.user_metadata?.avatar_url,
            streak_count: 7,
            created_at: new Date().toISOString()
          }
          setProfile(defaultProfile as Profile)
        }
      } catch (error) {
        console.error('Error loading user data:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <LoadingSpinner size="lg" text="Loading your dashboard..." />
        </div>
      </div>
    )
  }

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard()
      case 'profile':
        return renderProfile()
      case 'roadmaps':
        return renderRoadmaps()
      case 'suggestions':
        return renderSuggestions()
      case 'mentor':
        return renderMentor()
      case 'community':
        return renderCommunity()
      case 'settings':
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.username}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your career journey</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stats-card bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Current Streak</CardTitle>
            <Flame className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{profile?.streak_count || 7} days</div>
            <p className="text-xs opacity-80">Keep the momentum going! 🔥</p>
          </CardContent>
        </Card>

        <Card className="stats-card bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Roadmaps Active</CardTitle>
            <Target className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">3</div>
            <p className="text-xs opacity-80">Frontend, Backend, Full Stack</p>
          </CardContent>
        </Card>

        <Card className="stats-card bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Skills Mastered</CardTitle>
            <Trophy className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">12</div>
            <p className="text-xs opacity-80">JavaScript, React, Node.js +9</p>
          </CardContent>
        </Card>

        <Card className="stats-card bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium opacity-90">Progress Score</CardTitle>
            <TrendingUp className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">87%</div>
            <p className="text-xs opacity-80">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="feature-card group border-0 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl">Learning Progress</CardTitle>
          <CardDescription>Your monthly learning activity and completed courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProfile = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 feature-card group border-0 shadow-2xl">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your profile details and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full" />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{profile?.username || 'Developer'}</h3>
                <p className="text-gray-600">Full Stack Developer</p>
                <Button variant="outline" size="sm" className="mt-2">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={user?.email || ''} 
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 123-4567"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card group border-0 shadow-2xl">
          <CardHeader>
            <CardTitle>Skills Overview</CardTitle>
            <CardDescription>Your current skill levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSkillData.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRoadmaps = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Career Roadmaps</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRoadmaps.map((roadmap) => {
          const Icon = roadmap.icon
          return (
            <Card key={roadmap.id} className="feature-card group border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{roadmap.title}</CardTitle>
                    <CardDescription>{roadmap.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm font-medium mb-2">
                      <span>Progress</span>
                      <span>{roadmap.progress}%</span>
                    </div>
                    <Progress value={roadmap.progress} className="h-3" />
                  </div>
                  <Button className="w-full">Continue Learning</Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderSuggestions = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Career Suggestions</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="feature-card group border-0 shadow-2xl">
          <CardHeader>
            <CardTitle>Recommended Next Steps</CardTitle>
            <CardDescription>Based on your current progress and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900">Learn TypeScript</h4>
                <p className="text-blue-700 text-sm mt-1">Enhance your JavaScript skills with static typing</p>
                <Button size="sm" className="mt-3">Start Learning</Button>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-900">System Design Interview Prep</h4>
                <p className="text-green-700 text-sm mt-1">Prepare for senior developer interviews</p>
                <Button size="sm" className="mt-3">Start Prep</Button>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <h4 className="font-semibold text-purple-900">Build a Portfolio Project</h4>
                <p className="text-purple-700 text-sm mt-1">Showcase your full-stack skills</p>
                <Button size="sm" className="mt-3">Get Ideas</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderMentor = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">AI Career Mentor</h1>
      
      <Card className="feature-card group border-0 shadow-2xl">
        <CardHeader>
          <CardTitle>Chat with your AI mentor</CardTitle>
          <CardDescription>Get personalized career advice and guidance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-50 rounded-xl p-4 mb-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm max-w-md">
                  <p className="text-sm">Hello! I'm your AI career mentor. How can I help you today?</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Ask me anything about your career..."
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCommunity = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Community</h1>
      
      <div className="space-y-6">
        {mockCommunityPosts.map((post) => (
          <Card key={post.id} className="feature-card group border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{post.author}</h4>
                    <span className="text-sm text-gray-500">{post.time}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="feature-card group border-0 shadow-2xl">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Email notifications</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span>Push notifications</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between">
                <span>Weekly progress reports</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="feature-card group border-0 shadow-2xl">
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Control your privacy settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Profile visibility</span>
                <select className="border border-gray-200 rounded-lg px-3 py-2">
                  <option>Public</option>
                  <option>Private</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Data analytics</span>
                <input type="checkbox" className="toggle" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ConfigNotification />
      
      {/* Top Navigation */}
      <div className="nav-blur sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden hover:bg-white/50"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Link href="/dashboard" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gradient hidden sm:block">CareerPath AI</h1>
              </Link>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="hover:bg-white/50 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="w-8 h-8 rounded-full" />
                    ) : (
                      <User className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{profile?.username || 'Developer'}</p>
                  <p className="text-xs text-gray-500">Active Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex flex-col h-full pt-20 lg:pt-4">
            <div className="flex-1 px-4 py-6 space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as ActiveSection)
                      setSidebarOpen(false)
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 group ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 ${
                      activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                    <span className="font-medium">{item.label}</span>
                    {activeSection === item.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                )
              })}
            </div>
            
            <div className="p-4 border-t border-white/20">
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-white/50"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}