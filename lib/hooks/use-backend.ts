'use client'

import { useState, useCallback } from 'react'
import { backendApi, type GenerateRequest, type GenerateResponse } from '@/lib/backend-api'

interface UseBackendOptions {
  onSuccess?: (data: GenerateResponse) => void
  onError?: (error: Error) => void
}

export interface BackendConnectionStatus {
  isConnected: boolean | null
  isChecking: boolean
  lastChecked: Date | null
  error: string | null
}

export function useBackend(options: UseBackendOptions = {}) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<BackendConnectionStatus>({
    isConnected: null,
    isChecking: false,
    lastChecked: null,
    error: null
  })

  // Check backend connection
  const checkConnection = useCallback(async () => {
    setConnectionStatus(prev => ({ ...prev, isChecking: true, error: null }))
    
    try {
      const result = await backendApi.testConnection()
      setConnectionStatus({
        isConnected: result.success,
        isChecking: false,
        lastChecked: new Date(),
        error: result.success ? null : result.message
      })
      return result.success
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      setConnectionStatus({
        isConnected: false,
        isChecking: false,
        lastChecked: new Date(),
        error: errorMessage
      })
      return false
    }
  }, [])

  // Generate code using backend
  const generateCode = useCallback(async (request: GenerateRequest): Promise<GenerateResponse | null> => {
    setIsGenerating(true)
    
    try {
      const result = await backendApi.generateCode(request)
      options.onSuccess?.(result)
      return result
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Generation failed')
      options.onError?.(errorObj)
      throw errorObj
    } finally {
      setIsGenerating(false)
    }
  }, [options])

  // Generate simple code (fallback)
  const generateSimpleCode = useCallback(async (request: GenerateRequest): Promise<GenerateResponse | null> => {
    setIsGenerating(true)
    
    try {
      const result = await backendApi.generateSimpleCode(request)
      options.onSuccess?.(result)
      return result
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Simple generation failed')
      options.onError?.(errorObj)
      throw errorObj
    } finally {
      setIsGenerating(false)
    }
  }, [options])

  // Try backend first, fall back to simple if needed
  const generateWithFallback = useCallback(async (request: GenerateRequest): Promise<GenerateResponse | null> => {
    try {
      // First try the full backend generation
      return await generateCode(request)
    } catch (error) {
      console.log('Full backend generation failed, trying simple generation:', error)
      try {
        // Fall back to simple generation
        return await generateSimpleCode(request)
      } catch (fallbackError) {
        console.log('Simple generation also failed:', fallbackError)
        throw fallbackError
      }
    }
  }, [generateCode, generateSimpleCode])

  return {
    // State
    isGenerating,
    connectionStatus,
    
    // Methods
    checkConnection,
    generateCode,
    generateSimpleCode,
    generateWithFallback,
    
    // Utilities
    isBackendAvailable: connectionStatus.isConnected === true,
    backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
  }
}

// Export types for convenience
export type { GenerateRequest, GenerateResponse }