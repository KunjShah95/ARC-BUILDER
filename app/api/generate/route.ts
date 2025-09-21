import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

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

    const systemPrompt = `You are an expert React/Next.js developer. Generate production-ready code based on the user's requirements.

Requirements:
- Framework: ${framework}
- Styling: ${styling}
- Components: ${components}
- Use TypeScript
- Include proper imports
- Use modern React patterns (hooks, functional components)
- Make it responsive and accessible
- Include proper error handling where needed

Generate ONLY the main page component code. Do not include explanations or markdown formatting.
The code should be ready to use in a Next.js app with the file structure:
- app/page.tsx (main page)
- components/ui/* (shadcn/ui components available)
- Standard Next.js 14 app router structure

Make the code visually appealing with proper spacing, colors, and layout.`

    const { text } = await generateText({
      model: openai("gpt-4"),
      system: systemPrompt,
      prompt: `Create a React component for: ${prompt}`,
      maxTokens: 2000,
    })

    return NextResponse.json({
      code: text,
      success: true,
    })
  } catch (error) {
    console.error("Generation error:", error)
    return NextResponse.json({ error: "Failed to generate code" }, { status: 500 })
  }
}
