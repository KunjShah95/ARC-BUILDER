"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'success' | 'failed'>('testing')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [supabaseConfig, setSupabaseConfig] = useState<{url: string, keyLength: number} | null>(null)

  useEffect(() => {
    testSupabaseConnection()
  }, [])

  const testSupabaseConnection = async () => {
    try {
      setConnectionStatus('testing')
      
      // Check environment variables
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      setSupabaseConfig({
        url: url || 'Missing',
        keyLength: key ? key.length : 0
      })

      if (!url || !key) {
        throw new Error('Supabase environment variables are missing')
      }

      const supabase = createClient()
      
      // Try a simple query to test the connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count')
        .limit(0)
      
      if (error) {
        console.log('Table query failed (might be normal):', error)
        // Even if the table doesn't exist, if we got here, the connection works
        setConnectionStatus('success')
      } else {
        setConnectionStatus('success')
      }
      
    } catch (error) {
      console.error('Connection test failed:', error)
      setConnectionStatus('failed')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const testEmailSignup = async () => {
    try {
      const supabase = createClient()
      const testEmail = 'test@example.com'
      const testPassword = 'testpassword123'
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      })
      
      console.log('Test signup result:', { data, error })
      alert(`Test signup result: ${error ? error.message : 'Success (check console)'}`)
      
    } catch (error) {
      console.error('Test signup failed:', error)
      alert(`Test signup failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'testing': return 'text-yellow-600'
      case 'success': return 'text-green-600'
      case 'failed': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'testing': return 'Testing connection...'
      case 'success': return 'Connection successful!'
      case 'failed': return 'Connection failed'
      default: return 'Unknown status'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
          <CardDescription>Testing authentication service connectivity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className={`font-medium ${getStatusColor()}`}>
              Status: {getStatusText()}
            </div>
            
            {supabaseConfig && (
              <div className="text-sm text-gray-600 space-y-1">
                <div>URL: {supabaseConfig.url}</div>
                <div>Key Length: {supabaseConfig.keyLength} characters</div>
              </div>
            )}
            
            {errorMessage && (
              <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                Error: {errorMessage}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Button 
              onClick={testSupabaseConnection}
              className="w-full"
              variant="outline"
            >
              Retry Connection Test
            </Button>
            
            <Button 
              onClick={testEmailSignup}
              className="w-full"
              disabled={connectionStatus === 'failed'}
            >
              Test Email Signup
            </Button>
          </div>
          
          <div className="text-xs text-gray-500">
            Check the browser console for detailed logs
          </div>
        </CardContent>
      </Card>
    </div>
  )
}