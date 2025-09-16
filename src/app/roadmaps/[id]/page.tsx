'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getRoadmapById, getUserProgress, updateUserProgress } from '@/lib/roadmaps'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, CheckCircle, Circle, ExternalLink, BookOpen, Video, FileText, Code, Brain } from 'lucide-react'
import Link from 'next/link'

interface RoadmapStep {
  id: string
  title: string
  description?: string
  resources: Resource[]
}

interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'course' | 'documentation'
}

interface Roadmap {
  id: string
  title: string
  description?: string
  steps: RoadmapStep[]
  category: string
  created_at: string
}

interface UserProgress {
  id: string
  user_id: string
  roadmap_id: string
  completed_steps: string[]
  completion_percentage: number
  created_at: string
}

const resourceIcons = {
  article: FileText,
  video: Video,
  course: BookOpen,
  documentation: Code
}

export default function RoadmapDetailPage() {
  const [user, setUser] = useState<any>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()
  const params = useParams()
  const roadmapId = params?.id as string

  useEffect(() => {
    async function loadData() {
      const { user: currentUser, error: userError } = await getCurrentUser()
      
      if (userError || !currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      // Load roadmap data
      const { data: roadmapData, error: roadmapError } = await getRoadmapById(roadmapId)
      if (!roadmapError && roadmapData) {
        setRoadmap(roadmapData)
      }

      // Load user progress
      const { data: progressData, error: progressError } = await getUserProgress(currentUser.id, roadmapId)
      if (!progressError && progressData) {
        setProgress(progressData)
      }

      setLoading(false)
    }

    if (roadmapId) {
      loadData()
    }
  }, [router, roadmapId])

  const toggleStepCompletion = async (stepId: string) => {
    if (!user || !roadmap || updating) return

    setUpdating(true)
    try {
      const currentCompletedSteps = progress?.completed_steps || []
      const isCompleted = currentCompletedSteps.includes(stepId)
      
      let newCompletedSteps: string[]
      if (isCompleted) {
        newCompletedSteps = currentCompletedSteps.filter(id => id !== stepId)
      } else {
        newCompletedSteps = [...currentCompletedSteps, stepId]
      }

      const { data, error } = await updateUserProgress(user.id, roadmapId, newCompletedSteps)
      if (!error && data) {
        setProgress(data)
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading roadmap...</p>
        </div>
      </div>
    )
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Roadmap not found</h2>
          <p className="text-gray-600 mb-4">The roadmap you're looking for doesn't exist.</p>
          <Link href="/roadmaps">
            <Button>Back to Roadmaps</Button>
          </Link>
        </div>
      </div>
    )
  }

  const completedSteps = progress?.completed_steps || []
  const totalSteps = roadmap.steps.length
  const completionPercentage = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/roadmaps">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Roadmaps
                </Button>
              </Link>
            </div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">CareerPath AI</h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
              {roadmap.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{roadmap.title}</h1>
          <p className="text-gray-600 mb-6">{roadmap.description}</p>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm font-medium text-gray-700">{completionPercentage}%</span>
            </div>
            <Progress value={completionPercentage} />
            <div className="mt-2 text-sm text-gray-600">
              {completedSteps.length} of {totalSteps} steps completed
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {roadmap.steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            
            return (
              <Card 
                key={step.id} 
                className={`relative transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm border-gray-200 shadow-md'
                }`}
              >
                {/* Step Number */}
                <div className="absolute -left-4 top-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                  </div>
                </div>
                
                <CardHeader className="ml-8">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleStepCompletion(step.id)}
                      disabled={updating}
                      className="flex-shrink-0 transition-colors"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-8 h-8 text-green-600 hover:text-green-700" />
                      ) : (
                        <Circle className="w-8 h-8 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <CardTitle className={`text-xl ${
                        isCompleted ? 'text-green-800 line-through' : 'text-gray-900'
                      }`}>
                        Step {index + 1}: {step.title}
                      </CardTitle>
                      {step.description && (
                        <CardDescription className={`mt-2 ${
                          isCompleted ? 'text-green-700' : 'text-gray-600'
                        }`}>
                          {step.description}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>

                {step.resources && step.resources.length > 0 && (
                  <CardContent>
                    <h4 className="font-medium text-gray-900 mb-3">Resources</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.resources.map((resource, resourceIndex) => {
                        const IconComponent = resourceIcons[resource.type] || FileText
                        
                        return (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <IconComponent className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{resource.title}</div>
                              <div className="text-xs text-gray-500 capitalize">{resource.type}</div>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400" />
                          </a>
                        )
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        {/* Completion Message */}
        {completionPercentage === 100 && (
          <Card className="mt-8 border-green-200 bg-green-50">
            <CardContent className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-800 mb-2">Congratulations!</h3>
              <p className="text-green-700 mb-4">
                You've completed the {roadmap.title} roadmap. You're well on your way to mastering this career path!
              </p>
              <Link href="/roadmaps">
                <Button>Explore More Roadmaps</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}