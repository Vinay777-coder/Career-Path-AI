'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Brain, Menu, X, Settings, LogOut, User } from 'lucide-react'
import { signOut } from '@/lib/auth'

interface NavbarProps {
  user?: any
  showAuth?: boolean
}

export function Navbar({ user, showAuth = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  const navItems = user ? [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Roadmaps', href: '/roadmaps' },
    { name: 'Resume', href: '/resume' },
    { name: 'AI Chat', href: '/chat' },
  ] : [
    { name: 'Features', href: '#features' },
    { name: 'About', href: '#about' },
  ]

  return (
    <nav className="nav-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">CareerPath AI</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-600 hover:text-gray-900 transition-colors font-medium relative group ${
                  pathname === item.href ? 'text-blue-600' : ''
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 group-hover:w-full ${
                  pathname === item.href ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          {showAuth && (
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link href="/profile">
                    <Button variant="ghost" size="sm" className="hover:bg-white/50">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleSignOut}
                    className="hover:bg-white/50"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:bg-white/50"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 animate-slide-in-up">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors font-medium ${
                    pathname === item.href ? 'text-blue-600 bg-white/50' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {showAuth && (
                <div className="border-t border-white/20 pt-3 mt-3 space-y-2">
                  {user ? (
                    <>
                      <Link href="/profile">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start hover:bg-white/50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start hover:bg-white/50"
                        onClick={() => {
                          handleSignOut()
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button 
                          variant="ghost" 
                          className="w-full justify-start hover:bg-white/50"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/login">
                        <Button 
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}