'use client'

import { useState, useEffect } from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { X, AlertTriangle, ExternalLink } from 'lucide-react'

export function ConfigNotification() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const isConfigured = supabaseUrl && !supabaseUrl.includes('placeholder')
    
    // Check if user has previously dismissed this notification
    const dismissed = localStorage.getItem('config-notification-dismissed')
    
    if (!isConfigured && !dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('config-notification-dismissed', 'true')
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed top-20 left-4 right-4 z-40 max-w-md mx-auto">
      <Alert className="bg-amber-50 border-amber-200 animate-slide-in-down">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="font-medium mb-2">Configuration Required</p>
              <p className="text-sm mb-3">
                To enable authentication and data features, please set up your Supabase credentials.
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-100"
                  onClick={() => window.open('https://supabase.com', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Get Supabase
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-amber-600 hover:bg-amber-100"
                >
                  Dismiss
                </Button>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="p-1 text-amber-600 hover:bg-amber-100 ml-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  )
}