// Frontend API service for connecting to the backend

interface GenerateRequest {
  user_prompt: string
  project_type?: string
  framework?: string
}

interface GenerateResponse {
  success: boolean
  message: string
  files: Record<string, string>
  error?: string
}

interface BackendHealthResponse {
  status: string
  backend_port: string
  cors_origins: string[]
  environment: string
}

interface AuthRequest {
  token: string
}

interface AuthResponse {
  success: boolean
  message: string
  backend_token?: string
  user: any
}

interface GoogleAuthRequest {
  google_token: string
}

class BackendApiService {
  private baseUrl: string
  private authToken: string | null = null

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
  }

  /**
   * Set the authentication token for API requests
   */
  setAuthToken(token: string | null) {
    this.authToken = token
  }

  /**
   * Get headers with authentication if available
   */
  private getHeaders(includeAuth: boolean = true): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }

    if (includeAuth && this.authToken) {
      headers.Authorization = `Bearer ${this.authToken}`
    }

    return headers
  }

  /**
   * Check if the backend is healthy and running
   */
  async checkHealth(): Promise<BackendHealthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: this.getHeaders(false),
      })

      if (!response.ok) {
        throw new Error(`Backend health check failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Backend health check failed:', error)
      throw new Error(`Cannot connect to backend at ${this.baseUrl}`)
    }
  }

  /**
   * Generate code using the backend LangGraph agent
   */
  async generateCode(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Generation failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Code generation failed:', error)
      throw error
    }
  }

  /**
   * Generate simple code for testing (fallback endpoint)
   */
  async generateSimpleCode(request: GenerateRequest): Promise<GenerateResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/generate-simple`, {
        method: 'POST',
        headers: this.getHeaders(false), // Simple generation doesn't require auth
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Simple generation failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Simple code generation failed:', error)
      throw error
    }
  }

  /**
   * Verify Supabase token with backend and get backend token
   */
  async verifyAuth(supabaseToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/verify`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify({ token: supabaseToken }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Auth verification failed: ${response.status}`)
      }

      const result = await response.json()
      
      // Store the backend token for future requests
      if (result.backend_token) {
        this.setAuthToken(result.backend_token)
      }

      return result
    } catch (error) {
      console.error('Auth verification failed:', error)
      throw error
    }
  }

  /**
   * Get current user information from backend
   */
  async getCurrentUser(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/user`, {
        method: 'GET',
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Get user failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Get current user failed:', error)
      throw error
    }
  }

  /**
   * Test protected route
   */
  async testProtectedRoute(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/protected`, {
        method: 'GET',
        headers: this.getHeaders(),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Protected route failed: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Protected route test failed:', error)
      throw error
    }
  }

  /**
   * Authenticate with Google OAuth token
   */
  async authenticateWithGoogle(googleToken: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/auth/google`, {
        method: 'POST',
        headers: this.getHeaders(false),
        body: JSON.stringify({ google_token: googleToken }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `Google auth failed: ${response.status}`)
      }

      const result = await response.json()
      
      // Store the backend token for future requests
      if (result.backend_token) {
        this.setAuthToken(result.backend_token)
      }

      return result
    } catch (error) {
      console.error('Google authentication failed:', error)
      throw error
    }
  }

  /**
   * Test the backend connection
   */
  async testConnection(): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const healthData = await this.checkHealth()
      return {
        success: true,
        message: 'Backend connection successful',
        data: healthData
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown connection error'
      }
    }
  }
}

// Export singleton instance
export const backendApi = new BackendApiService()

// Export types for use in components
export type { GenerateRequest, GenerateResponse, BackendHealthResponse, AuthRequest, AuthResponse, GoogleAuthRequest }