'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useBackend } from '@/lib/hooks/use-backend'
import { LoadingSpinner } from '@/components/loading-spinner'

export function BackendStatus() {
  const { connectionStatus, checkConnection, isBackendAvailable, backendUrl } = useBackend()
  const [testGeneration, setTestGeneration] = useState<{
    isLoading: boolean
    result: any
    error: string | null
  }>({
    isLoading: false,
    result: null,
    error: null
  })

  // Check connection on mount
  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  const handleTestGeneration = async () => {
    setTestGeneration({ isLoading: true, result: null, error: null })
    
    try {
      const { generateSimpleCode } = useBackend()
      const result = await generateSimpleCode({
        user_prompt: 'Create a simple hello world HTML page',
        framework: 'html-css-js',
        project_type: 'web'
      })
      
      setTestGeneration({
        isLoading: false,
        result,
        error: null
      })
    } catch (error) {
      setTestGeneration({
        isLoading: false,
        result: null,
        error: error instanceof Error ? error.message : 'Test generation failed'
      })
    }
  }

  const getStatusColor = () => {
    if (connectionStatus.isChecking) return 'yellow'
    if (connectionStatus.isConnected === true) return 'green'
    if (connectionStatus.isConnected === false) return 'red'
    return 'gray'
  }

  const getStatusText = () => {
    if (connectionStatus.isChecking) return 'Checking...'
    if (connectionStatus.isConnected === true) return 'Connected'
    if (connectionStatus.isConnected === false) return 'Disconnected'
    return 'Unknown'
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Backend Connection Status
          <Badge variant={getStatusColor() === 'green' ? 'default' : 'destructive'}>
            {getStatusText()}
          </Badge>
        </CardTitle>
        <CardDescription>
          Monitor and test the connection to the ARC-BUILDER backend API
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Connection Details */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Backend URL:</span>
            <code className="text-sm bg-muted px-2 py-1 rounded">{backendUrl}</code>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Status:</span>
            <Badge variant={getStatusColor() === 'green' ? 'default' : 'destructive'}>
              {getStatusText()}
            </Badge>
          </div>
          {connectionStatus.lastChecked && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Checked:</span>
              <span className="text-sm text-muted-foreground">
                {connectionStatus.lastChecked.toLocaleTimeString()}
              </span>
            </div>
          )}
          {connectionStatus.error && (
            <div className="text-sm text-destructive">
              <strong>Error:</strong> {connectionStatus.error}
            </div>
          )}
        </div>

        <Separator />

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={checkConnection} 
            disabled={connectionStatus.isChecking}
            variant="outline"
          >
            {connectionStatus.isChecking ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Checking...
              </>
            ) : (
              'Check Connection'
            )}
          </Button>
          
          <Button 
            onClick={handleTestGeneration}
            disabled={!isBackendAvailable || testGeneration.isLoading}
          >
            {testGeneration.isLoading ? (
              <>
                <LoadingSpinner size="sm" className="mr-2" />
                Testing...
              </>
            ) : (
              'Test Generation'
            )}
          </Button>
        </div>

        {/* Test Results */}
        {(testGeneration.result || testGeneration.error) && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Test Generation Result:</h4>
              {testGeneration.error ? (
                <div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
                  {testGeneration.error}
                </div>
              ) : testGeneration.result ? (
                <div className="space-y-2">
                  <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                    ✅ Generation successful!
                  </div>
                  <div className="text-sm">
                    <strong>Files generated:</strong> {Object.keys(testGeneration.result.files || {}).length}
                  </div>
                  {testGeneration.result.files && (
                    <details className="text-xs">
                      <summary className="cursor-pointer font-medium">View generated files</summary>
                      <pre className="mt-2 bg-muted p-2 rounded overflow-x-auto">
                        {JSON.stringify(testGeneration.result.files, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ) : null}
            </div>
          </>
        )}

        {/* Backend Setup Instructions */}
        {connectionStatus.isConnected === false && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Setup Instructions:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>1. Make sure the backend server is running:</p>
                <code className="block bg-muted p-2 rounded text-xs">
                  cd backend && python -m uvicorn main:app --reload --port 8000
                </code>
                <p>2. Check that your .env files are configured with the correct credentials</p>
                <p>3. Verify the NEXT_PUBLIC_BACKEND_URL environment variable</p>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}