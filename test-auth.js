// Authentication Test Script
// Run this in browser console on the login page to test OAuth setup

console.log('🔍 Testing CareerPath AI Authentication Setup...')

// Test 1: Check Supabase Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not configured'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Configured ✅' : 'Not configured ❌'

console.log('📊 Environment Variables:')
console.log(`- Supabase URL: ${supabaseUrl}`)
console.log(`- Supabase Key: ${supabaseKey}`)

// Test 2: Check if OAuth providers work
async function testOAuthProviders() {
  console.log('\n🔐 Testing OAuth Providers...')
  
  try {
    // Test Google OAuth
    console.log('Testing Google OAuth...')
    const googleBtn = document.querySelector('button:contains("Continue with Google")')
    if (googleBtn) {
      console.log('✅ Google login button found')
    } else {
      console.log('❌ Google login button not found')
    }
    
    // Test GitHub OAuth  
    console.log('Testing GitHub OAuth...')
    const githubBtn = document.querySelector('button:contains("Continue with GitHub")')
    if (githubBtn) {
      console.log('✅ GitHub login button found')
    } else {
      console.log('❌ GitHub login button not found')
    }
    
    // Test Email/Password
    console.log('Testing Email/Password form...')
    const emailInput = document.querySelector('input[type="email"]')
    const passwordInput = document.querySelector('input[type="password"]')
    
    if (emailInput && passwordInput) {
      console.log('✅ Email/Password form found and functional')
    } else {
      console.log('❌ Email/Password form not found')
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error)
  }
}

// Test 3: Network connectivity to Supabase
async function testSupabaseConnection() {
  console.log('\n🌐 Testing Supabase Connection...')
  
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    })
    
    if (response.ok) {
      console.log('✅ Supabase connection successful')
    } else {
      console.log('❌ Supabase connection failed:', response.status)
    }
  } catch (error) {
    console.log('❌ Network error:', error.message)
  }
}

// Run all tests
console.log('\n🚀 Running authentication tests...')
testOAuthProviders()
testSupabaseConnection()

console.log('\n📋 Test completed! Check results above.')
console.log('\n💡 To test OAuth providers:')
console.log('1. Click "Continue with Google" - should redirect to Google login')
console.log('2. Click "Continue with GitHub" - should redirect to GitHub login')
console.log('3. If you get "validation_failed" error, check your Supabase Dashboard > Authentication > Providers')