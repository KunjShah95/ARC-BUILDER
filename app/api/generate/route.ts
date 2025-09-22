import { type NextRequest, NextResponse } from "next/server"

// Backend API integration
interface BackendGenerateRequest {
  user_prompt: string
  project_type?: string
  framework?: string
}

async function callBackendGeneration(prompt: string, framework: string): Promise<any> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
  
  // Try the full LangGraph agent first
  try {
    const response = await fetch(`${backendUrl}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_prompt: prompt,
        framework: framework.toLowerCase().replace(/\s+/g, '-'),
        project_type: 'web'
      } as BackendGenerateRequest),
      // Add timeout for the full agent
      signal: AbortSignal.timeout(30000) // 30 second timeout for full generation
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success && data.files) {
        // Convert backend files response to frontend format
        const mainFile = data.files['index.html'] || Object.values(data.files)[0] || ''
        return { text: mainFile, fromBackend: true, allFiles: data.files, source: 'backend-full' }
      }
    }
  } catch (error) {
    console.log('Full backend generation failed, trying simple generation:', error)
  }

  // Fall back to simple generation if full agent fails
  try {
    const response = await fetch(`${backendUrl}/api/generate-simple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_prompt: prompt,
        framework: framework.toLowerCase().replace(/\s+/g, '-'),
        project_type: 'web'
      } as BackendGenerateRequest),
      // Add timeout
      signal: AbortSignal.timeout(15000) // 15 second timeout
    })

    if (response.ok) {
      const data = await response.json()
      if (data.success && data.files) {
        // Convert backend files response to frontend format
        const mainFile = data.files['index.html'] || Object.values(data.files)[0] || ''
        return { text: mainFile, fromBackend: true, allFiles: data.files, source: 'backend-simple' }
      }
    }
  } catch (error) {
    console.log('Simple backend generation also failed:', error)
    throw new Error('Backend generation failed. Please ensure the backend server is running.')
  }

  throw new Error('Backend did not return successful results')
}

export async function POST(request: NextRequest) {
  try {
    const {
      prompt,
      framework = "Next.js 14",
      styling = "Tailwind CSS",
      components = "shadcn/ui",
    } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // All code generation now happens via the backend
    const backendResult = await callBackendGeneration(prompt, framework)
    
    return NextResponse.json({
      code: backendResult.text,
      files: backendResult.allFiles,
      success: true,
      source: backendResult.source || 'backend',
      framework,
      styling,
      components
    })

  } catch (error) {
    console.error("Generation error:", error)
    
    // Provide helpful error message for backend connection issues
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    const isBackendError = errorMessage.includes('Backend generation failed') || 
                          errorMessage.includes('fetch')

    return NextResponse.json({ 
      error: isBackendError 
        ? "Backend server is not available. Please ensure the backend is running on http://localhost:8000"
        : `Code generation failed: ${errorMessage}`,
      details: errorMessage,
      backendRequired: true
    }, { status: 500 })
  }
}
