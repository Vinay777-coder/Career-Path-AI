'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import { getResumeChecks } from '@/lib/resume'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Navbar } from '@/components/ui/navbar'
import { LoadingSpinner } from '@/components/ui/loading'
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, TrendingUp, Brain, Sparkles, Target } from 'lucide-react'
import Link from 'next/link'

interface ResumeCheck {
  id: string
  user_id: string
  ats_score: number
  feedback: string
  strengths: string[]
  weaknesses: string[]
  created_at: string
}

export default function ResumePage() {
  const [user, setUser] = useState<any>(null)
  const [resumeChecks, setResumeChecks] = useState<ResumeCheck[]>([])
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [currentAnalysis, setCurrentAnalysis] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    async function loadData() {
      const { user: currentUser, error: userError } = await getCurrentUser()
      
      if (userError || !currentUser) {
        router.push('/login')
        return
      }

      setUser(currentUser)

      const { data: checksData, error: checksError } = await getResumeChecks(currentUser.id)
      if (!checksError && checksData) {
        setResumeChecks(checksData)
      }

      setLoading(false)
    }

    loadData()
  }, [router])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile || !user) return

    setAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append('resume', selectedFile)

      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        setCurrentAnalysis(result.analysis)
        // Refresh the resume checks list
        const { data: checksData } = await getResumeChecks(user.id)
        if (checksData) {
          setResumeChecks(checksData)
        }
      } else {
        alert(result.error || 'Failed to analyze resume')
      }
    } catch (error) {
      console.error('Error analyzing resume:', error)
      alert('Failed to analyze resume. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar user={user} />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-float">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <LoadingSpinner size="lg" text="Loading resume analysis..." />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navbar user={user} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 text-sm font-medium text-blue-800 mb-8">
            <Brain className="w-4 h-4 mr-2" />
            AI-Powered Analysis
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Resume <span className="text-gradient">Analysis</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">Get AI-powered feedback and ATS score for your resume.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>
                Upload a PDF or text file to get instant AI analysis and ATS scoring
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Drop your resume here or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose File
                      </span>
                    </Button>
                  </label>
                </div>
              </div>

              {selectedFile && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">
                      {selectedFile.name}
                    </span>
                  </div>
                  <Button 
                    onClick={handleAnalyze} 
                    disabled={analyzing}
                    size="sm"
                  >
                    {analyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              )}

              <div className="text-xs text-gray-500">
                Supported formats: PDF, TXT. Maximum file size: 10MB
              </div>
            </CardContent>
          </Card>

          {/* Current Analysis */}
          {currentAnalysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Latest Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* ATS Score */}
                <div className={`p-4 rounded-lg ${getScoreBgColor(currentAnalysis.ats_score)}`}>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(currentAnalysis.ats_score)}`}>
                      {currentAnalysis.ats_score}%
                    </div>
                    <div className="text-sm font-medium text-gray-700">ATS Score</div>
                  </div>
                  <Progress value={currentAnalysis.ats_score} className="mt-2" />
                </div>

                {/* Strengths */}
                {currentAnalysis.strengths?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {currentAnalysis.strengths.map((strength: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Weaknesses */}
                {currentAnalysis.weaknesses?.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {currentAnalysis.weaknesses.map((weakness: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {weakness}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Previous Analyses */}
        {resumeChecks.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Previous Analyses</CardTitle>
              <CardDescription>Your resume analysis history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumeChecks.map((check) => (
                  <div key={check.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <div className={`text-lg font-bold ${getScoreColor(check.ats_score)}`}>
                          {check.ats_score}%
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(check.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-700 line-clamp-2">
                      {check.feedback}
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>{check.strengths?.length || 0} strengths</span>
                      <span>{check.weaknesses?.length || 0} improvements</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {resumeChecks.length === 0 && !currentAnalysis && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses yet</h3>
            <p className="text-gray-600">Upload your resume to get started with AI-powered analysis.</p>
          </div>
        )}
      </div>
    </div>
  )
}