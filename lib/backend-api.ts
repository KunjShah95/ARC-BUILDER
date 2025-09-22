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

class BackendApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
  }

  /**
   * Check if the backend is healthy and running
   */
  async checkHealth(): Promise<BackendHealthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
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
        headers: {
          'Content-Type': 'application/json',
        },
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
export type { GenerateRequest, GenerateResponse, BackendHealthResponse }