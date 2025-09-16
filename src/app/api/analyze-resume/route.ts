import { NextRequest, NextResponse } from 'next/server'
import { analyzeResume } from '@/lib/ai'
import { saveResumeCheck } from '@/lib/resume'
import { getCurrentUser } from '@/lib/auth'
import pdf from 'pdf-parse'

export async function POST(request: NextRequest) {
  try {
    const { user, error: userError } = await getCurrentUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('resume') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Convert file to buffer for PDF parsing
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    let resumeText = ''

    // Parse PDF if it's a PDF file
    if (file.type === 'application/pdf') {
      try {
        const pdfData = await pdf(buffer)
        resumeText = pdfData.text
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError)
        return NextResponse.json({ error: 'Failed to parse PDF file' }, { status: 400 })
      }
    } else if (file.type === 'text/plain') {
      resumeText = buffer.toString('utf-8')
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Please upload a PDF or text file.' }, { status: 400 })
    }

    if (!resumeText.trim()) {
      return NextResponse.json({ error: 'No text content found in the file' }, { status: 400 })
    }

    // Analyze resume with AI
    const analysisResult = await analyzeResume(resumeText)
    
    if (!analysisResult.success) {
      return NextResponse.json({ error: analysisResult.error }, { status: 500 })
    }

    // Save analysis result to database
    const { data: savedResult, error: saveError } = await saveResumeCheck(user.id, analysisResult.data)
    
    if (saveError) {
      console.error('Error saving resume check:', saveError)
      // Still return the analysis even if saving fails
    }

    return NextResponse.json({
      success: true,
      analysis: analysisResult.data,
      saved: !saveError
    })

  } catch (error) {
    console.error('Resume analysis error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}