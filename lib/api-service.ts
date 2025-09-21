/**
 * API service for communicating with the ArcBuilder backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface GenerateWebsiteRequest {
  user_prompt: string
  recursion_limit?: number
}

export interface GenerateWebsiteResponse {
  task_id: string
  status: string
  message: string
}

export interface WebsiteStatus {
  task_id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: {
    step: string
    message: string
  }
  error_message?: string
  result?: {
    plan: any
    task_plan: any
    files: Array<{
      path: string
      content: string
      size: number
    }>
    download_url: string
    file_count: number
  }
  created_at: string
  updated_at: string
}

export interface FilePreview {
  file_path: string
  content: string
  content_type: string
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
    throw new ApiError(response.status, errorData.detail || response.statusText)
  }

  return response.json()
}

export const apiService = {
  /**
   * Start website generation
   */
  async generateWebsite(request: GenerateWebsiteRequest): Promise<GenerateWebsiteResponse> {
    return apiRequest('/api/generate', {
      method: 'POST',
      body: JSON.stringify(request),
    })
  },

  /**
   * Get the status of a website generation task
   */
  async getTaskStatus(taskId: string): Promise<WebsiteStatus> {
    return apiRequest(`/api/status/${taskId}`)
  },

  /**
   * Download the generated website
   */
  async downloadWebsite(taskId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/api/download/${taskId}`)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }))
      throw new ApiError(response.status, errorData.detail || response.statusText)
    }

    return response.blob()
  },

  /**
   * Preview a specific file from the generated website
   */
  async previewFile(taskId: string, filePath: string): Promise<FilePreview> {
    return apiRequest(`/api/preview/${taskId}/${filePath}`)
  },

  /**
   * Delete a task and its generated files
   */
  async deleteTask(taskId: string): Promise<void> {
    await apiRequest(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
  },

  /**
   * Check if the backend server is running
   */
  async healthCheck(): Promise<{ message: string; status: string }> {
    try {
      return await apiRequest('/')
    } catch (error) {
      throw new ApiError(0, 'Backend server is not running')
    }
  },

  /**
   * Get download URL for a task
   */
  getDownloadUrl(taskId: string): string {
    return `${API_BASE_URL}/api/download/${taskId}`
  },

  /**
   * Poll task status until completion or failure
   */
  async pollTaskStatus(
    taskId: string, 
    onProgress?: (status: WebsiteStatus) => void,
    maxAttempts: number = 120, // 2 minutes with 1-second intervals
    interval: number = 1000
  ): Promise<WebsiteStatus> {
    let attempts = 0
    
    while (attempts < maxAttempts) {
      try {
        const status = await this.getTaskStatus(taskId)
        
        if (onProgress) {
          onProgress(status)
        }
        
        if (status.status === 'completed' || status.status === 'failed') {
          return status
        }
        
        await new Promise(resolve => setTimeout(resolve, interval))
        attempts++
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          throw new ApiError(404, 'Task not found')
        }
        // For other errors, continue polling
        await new Promise(resolve => setTimeout(resolve, interval))
        attempts++
      }
    }
    
    throw new ApiError(408, 'Task polling timeout')
  }
}

export { ApiError }
