import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Star } from 'lucide-react'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          UI Components Test Page
        </h1>
        
        {/* Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Test Card 1</CardTitle>
              <CardDescription>
                This is a test card to verify UI components are working
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">If you can see this card with proper styling, the UI components are working correctly.</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Test Card 2</CardTitle>
              <CardDescription>
                Another test card with different styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                Test Button - Click Me
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Test Gradient Text */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Gradient Text Test: 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              This Should Be Gradient
            </span>
          </h2>
        </div>

        {/* Test Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button variant="default">Default Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            Custom Gradient Button
          </Button>
        </div>

        {/* Navigation Link */}
        <div className="text-center">
          <a href="/" className="text-blue-600 hover:text-blue-800 underline">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  )
}