'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getRoadmaps } from '@/lib/roadmaps'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/ui/navbar'
import { LoadingSpinner, LoadingCard } from '@/components/ui/loading'
import { ArrowLeft, BookOpen, Users, Code, Database, Cpu, Brain, Smartphone, Shield, Palette, Search, Filter, Star, TrendingUp, CheckCircle, Sparkles, Target } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface Roadmap {
  id: string
  title: string
  description?: string
  steps: any[]
  category: string
  created_at: string
}

const categoryIcons = {
  'Frontend': Code,
  'Backend': Database,
  'Full Stack': Cpu,
  'Data Science': Brain,
  'DevOps': Shield,
  'Mobile': Smartphone,
  'Design': Palette
}

const categoryColors = {
  'Frontend': 'from-blue-500 to-cyan-500',
  'Backend': 'from-green-500 to-emerald-500',
  'Full Stack': 'from-purple-500 to-violet-500',
  'Data Science': 'from-orange-500 to-red-500',
  'DevOps': 'from-gray-600 to-gray-700',
  'Mobile': 'from-pink-500 to-rose-500',
  'Design': 'from-indigo-500 to-purple-500'
}

const featuredRoadmaps = [
  {
    id: 'featured-1',
    title: 'Frontend Developer',
    description: 'Complete guide to become a modern frontend developer',
    category: 'Frontend',
    steps: 25,
    learners: '120k',
    difficulty: 'Beginner',
    duration: '6 months',
    featured: true
  },
  {
    id: 'featured-2', 
    title: 'Backend Developer',
    description: 'Master server-side development and APIs',
    category: 'Backend',
    steps: 30,
    learners: '95k',
    difficulty: 'Intermediate',
    duration: '8 months',
    featured: true
  },
  {
    id: 'featured-3',
    title: 'Full Stack Developer',
    description: 'End-to-end web development mastery',
    category: 'Full Stack',
    steps: 40,
    learners: '85k',
    difficulty: 'Advanced',
    duration: '12 months',
    featured: true
  }
]

const categories = [
  { name: 'All', count: '50+' },
  { name: 'Role-based', count: '25' },
  { name: 'Skill-based', count: '20' },
  { name: 'Frontend', count: '8' },
  { name: 'Backend', count: '12' },
  { name: 'Full Stack', count: '6' },
  { name: 'Data Science', count: '4' },
]

export default function RoadmapsPage() {
  const [user, setUser] = useState<any>(null)
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      const { user: currentUser, error: userError } = await getCurrentUser()
      
      if (userError || !currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      const { data: roadmapsData, error: roadmapsError } = await getRoadmaps()
      if (!roadmapsError && roadmapsData) {
        setRoadmaps(roadmapsData)
      }

      setLoading(false)
    }

    loadData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar user={user} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <LoadingSpinner size="lg" text="Loading roadmaps..." />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-sm font-medium text-blue-800 mb-8">
            <Target className="w-4 h-4 mr-2" />
            Career Development Paths
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
            Developer
            <span className="text-gradient block">Roadmaps</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            AI-curated roadmaps, guides and resources to help guide developers in picking up a path and guide their learnings.
          </p>
          
          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search roadmaps, technologies, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className={`${selectedCategory === category.name 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-lg' 
                : 'bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:shadow-md'
              } transition-all duration-200`}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-70">{category.count}</span>
            </Button>
          ))}
        </div>

        {/* Featured Roadmaps */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">🔥 Popular Roadmaps</h2>
              <p className="text-gray-600 text-lg">Most followed by our community</p>
            </div>
            <div className="flex items-center px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full border border-yellow-200/50">
              <Star className="w-4 h-4 mr-2 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-yellow-800">Highly Rated</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredRoadmaps.map((roadmap) => {
              const IconComponent = categoryIcons[roadmap.category as keyof typeof categoryIcons] || BookOpen
              const gradientClass = categoryColors[roadmap.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'
              
              return (
                <Card key={roadmap.id} className="feature-card group border-0 shadow-2xl overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${gradientClass}`}></div>
                  <CardHeader className="pb-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${gradientClass} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full">
                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                        <span className="text-sm font-semibold text-yellow-800">4.9</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors mb-3">
                      {roadmap.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {roadmap.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{roadmap.steps} steps</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span>{roadmap.learners}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-xs font-medium rounded-full">{roadmap.difficulty}</span>
                      <span className="px-3 py-1 bg-gradient-to-r from-green-50 to-green-100 text-green-800 text-xs font-medium rounded-full">{roadmap.duration}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 font-medium">Your Progress</span>
                        <span className="text-gray-600 font-semibold">0%</span>
                      </div>
                      <Progress value={0} className="h-3" />
                    </div>

                    <Link href={`/roadmaps/${roadmap.id}`}>
                      <Button className={`w-full h-12 bg-gradient-to-r ${gradientClass} hover:shadow-xl text-white border-0 transition-all duration-200 text-base font-semibold`}>
                        Start Learning
                        <TrendingUp className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* All Roadmaps */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">All Roadmaps</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{roadmaps.length} roadmaps available</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap) => {
              const IconComponent = categoryIcons[roadmap.category as keyof typeof categoryIcons] || BookOpen
              const gradientClass = categoryColors[roadmap.category as keyof typeof categoryColors] || 'from-gray-500 to-gray-600'
              const stepCount = Array.isArray(roadmap.steps) ? roadmap.steps.length : 0

              return (
                <Card key={roadmap.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${gradientClass} rounded-lg flex items-center justify-center shadow-md`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {roadmap.category}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {roadmap.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {roadmap.description || 'Complete roadmap to master this career path'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span>{stepCount} steps</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>1.2k learners</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="text-gray-600">0%</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>

                    <Link href={`/roadmaps/${roadmap.id}`}>
                      <Button className={`w-full bg-gradient-to-r ${gradientClass} hover:shadow-md text-white border-0 transition-all duration-200`}>
                        Start Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {roadmaps.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No roadmaps available yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We're working hard to bring you amazing learning paths. Check back soon for new roadmaps!
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Create Your Own Roadmap
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}