'use client'

import * as React from "react"
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id: string
  title?: string
  description?: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  onClose?: (id: string) => void
}

const toastVariants = {
  success: {
    icon: CheckCircle,
    className: "border-green-200 bg-green-50/90 text-green-800",
    iconClassName: "text-green-500"
  },
  error: {
    icon: XCircle,
    className: "border-red-200 bg-red-50/90 text-red-800",
    iconClassName: "text-red-500"
  },
  warning: {
    icon: AlertCircle,
    className: "border-yellow-200 bg-yellow-50/90 text-yellow-800",
    iconClassName: "text-yellow-500"
  },
  info: {
    icon: Info,
    className: "border-blue-200 bg-blue-50/90 text-blue-800",
    iconClassName: "text-blue-500"
  }
}

export function Toast({ id, title, description, type = 'info', duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = React.useState(true)
  const variant = toastVariants[type]
  const IconComponent = variant.icon

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => onClose?.(id), 150)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => onClose?.(id), 150)
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-start space-x-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-all duration-300",
        variant.className,
        isVisible ? "animate-slide-in-up opacity-100" : "opacity-0 translate-y-2"
      )}
    >
      <IconComponent className={cn("h-5 w-5 flex-shrink-0 mt-0.5", variant.iconClassName)} />
      <div className="flex-1 space-y-1">
        {title && (
          <div className="text-sm font-semibold">{title}</div>
        )}
        {description && (
          <div className="text-sm opacity-90">{description}</div>
        )}
      </div>
      <button
        onClick={handleClose}
        className="flex-shrink-0 rounded-lg p-1 hover:bg-black/5 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function ToastContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2 w-96 max-w-[calc(100vw-2rem)]">
      {children}
    </div>
  )
}