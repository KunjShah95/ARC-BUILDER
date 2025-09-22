"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { backendApi } from '@/lib/backend-api'
import type { User } from '@supabase/supabase-js'

interface BackendAuthState {
  user: User | null
  backendUser: any | null
  backendToken: string | null
  isLoading: boolean
  error: string | null
}

export function useBackendAuth() {
  const [state, setState] = useState<BackendAuthState>({
    user: null,
    backendUser: null,
    backendToken: null,
    isLoading: true,
    error: null
  })

  const supabase = createClient()

  // Initialize auth state
  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        // Get current Supabase session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Supabase session error:', error)
          if (mounted) {
            setState(prev => ({ ...prev, error: error.message, isLoading: false }))
          }
          return
        }

        if (session?.user && session?.access_token) {
          // Verify with backend and get backend token
          try {
            const authResult = await backendApi.verifyAuth(session.access_token)
            
            if (mounted) {
              setState({
                user: session.user,
                backendUser: authResult.user,
                backendToken: authResult.backend_token || null,
                isLoading: false,
                error: null
              })
            }
          } catch (backendError) {
            console.error('Backend auth verification failed:', backendError)
            if (mounted) {
              setState({
                user: session.user,
                backendUser: null,
                backendToken: null,
                isLoading: false,
                error: 'Backend authentication failed'
              })
            }
          }
        } else {
          if (mounted) {
            setState(prev => ({ ...prev, isLoading: false }))
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (mounted) {
          setState(prev => ({ 
            ...prev, 
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false 
          }))
        }
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        if (event === 'SIGNED_IN' && session?.user && session?.access_token) {
          try {
            const authResult = await backendApi.verifyAuth(session.access_token)
            
            if (mounted) {
              setState({
                user: session.user,
                backendUser: authResult.user,
                backendToken: authResult.backend_token || null,
                isLoading: false,
                error: null
              })
            }
          } catch (backendError) {
            console.error('Backend auth verification failed:', backendError)
            if (mounted) {
              setState({
                user: session.user,
                backendUser: null,
                backendToken: null,
                isLoading: false,
                error: 'Backend authentication failed'
              })
            }
          }
        } else if (event === 'SIGNED_OUT') {
          // Clear backend token
          backendApi.setAuthToken(null)
          if (mounted) {
            setState({
              user: null,
              backendUser: null,
              backendToken: null,
              isLoading: false,
              error: null
            })
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Helper functions
  const signInWithGoogle = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      
      if (error) throw error
    } catch (error) {
      console.error('Google sign in error:', error)
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Sign in failed',
        isLoading: false
      }))
    }
  }

  const signOut = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      // Clear backend token
      backendApi.setAuthToken(null)
      
      const { error } = await supabase.auth.signOut()
      
      if (error) throw error
    } catch (error) {
      console.error('Sign out error:', error)
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Sign out failed',
        isLoading: false
      }))
    }
  }

  const refreshBackendAuth = async () => {
    try {
      setState(prev => ({ ...prev, error: null }))
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.access_token) {
        const authResult = await backendApi.verifyAuth(session.access_token)
        setState(prev => ({
          ...prev,
          backendUser: authResult.user,
          backendToken: authResult.backend_token || null,
          error: null
        }))
      }
    } catch (error) {
      console.error('Backend auth refresh failed:', error)
      setState(prev => ({ 
        ...prev, 
        error: error instanceof Error ? error.message : 'Auth refresh failed'
      }))
    }
  }

  return {
    ...state,
    signInWithGoogle,
    signOut,
    refreshBackendAuth,
    isAuthenticated: !!state.user,
    isBackendAuthenticated: !!state.backendToken
  }
}