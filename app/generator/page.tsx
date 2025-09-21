"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import {
  Wand2,
  Code2,
  Palette,
  Zap,
  Download,
  Github,
  Database,
  Sparkles,
  Copy,
  Check,
  Settings,
  Eye,
  Monitor,
  Smartphone,
  Tablet,
  Bot,
} from "lucide-react"

const templates = [
  { id: "landing", name: "Landing Page", description: "Modern marketing site", icon: "🚀" },
  { id: "dashboard", name: "Dashboard", description: "Admin interface", icon: "📊" },
  { id: "ecommerce", name: "E-commerce", description: "Online store", icon: "🛒" },
  { id: "blog", name: "Blog", description: "Content platform", icon: "📝" },
  { id: "portfolio", name: "Portfolio", description: "Personal showcase", icon: "🎨" },
  { id: "saas", name: "SaaS App", description: "Software platform", icon: "💼" },
]

const integrations = [
  { id: "github", name: "GitHub", icon: Github, status: "connected" },
  { id: "supabase", name: "Supabase", icon: Database, status: "connected" },
  { id: "vercel", name: "Vercel", icon: Zap, status: "connected" },
]

export default async function GeneratorPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedCode, setGeneratedCode] = useState("")
  const [activeTab, setActiveTab] = useState("prompt")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [previewMode, setPreviewMode] = useState("desktop")
  const [copied, setCopied] = useState(false)
  const [framework, setFramework] = useState("Next.js 14")
  const [styling, setStyling] = useState("Tailwind CSS")
  const [components, setComponents] = useState("shadcn/ui")
  const [generationError, setGenerationError] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleGenerateWithAI = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)
    setActiveTab("preview")
    setGenerationError("")

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          framework,
          styling,
          components,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate code")
      }

      clearInterval(progressInterval)
      setProgress(100)
      setGeneratedCode(data.code)
    } catch (error) {
      console.error("Generation failed:", error)
      setGenerationError(error instanceof Error ? error.message : "Failed to generate code")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)
    setActiveTab("preview")

    const intervals = [10, 25, 45, 70, 85, 100]
    for (let i = 0; i < intervals.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setProgress(intervals[i])
    }

    setGeneratedCode(`import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function GeneratedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ${prompt.slice(0, 50)}...
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Generated with ArcBuilder AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Feature 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Auto-generated content based on your prompt.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Responsive design with Tailwind CSS.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Feature 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Production-ready React components.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}`)

    setIsGenerating(false)
  }

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">ArcBuilder Generator</h1>
            </div>

            <div className="flex items-center gap-2">
              {integrations.map((integration) => (
                <Badge
                  key={integration.id}
                  variant={integration.status === "connected" ? "default" : "secondary"}
                  className="flex items-center gap-1"
                >
                  <integration.icon className="w-3 h-3" />
                  {integration.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="prompt" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Prompt
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Main Prompt Area */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      Describe Your Website
                    </CardTitle>
                    <CardDescription>
                      Tell us what you want to build. Be as detailed as possible for better results.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      ref={textareaRef}
                      placeholder="Example: Create a modern landing page for a SaaS productivity app called 'TaskFlow'. Include a hero section with pricing tiers, testimonials, and a contact form. Use a blue and white color scheme with clean typography..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[200px] resize-none"
                    />

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">{prompt.length}/2000 characters</div>

                      <div className="flex items-center gap-2">
                        <Button onClick={handleGenerate} disabled={!prompt.trim() || isGenerating} variant="outline">
                          {isGenerating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Mock Generate
                            </>
                          )}
                        </Button>

                        <Button
                          onClick={handleGenerateWithAI}
                          disabled={!prompt.trim() || isGenerating}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {isGenerating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Generating with AI...
                            </>
                          ) : (
                            <>
                              <Bot className="w-4 h-4 mr-2" />
                              Generate with AI
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <AnimatePresence>
                  {isGenerating && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Card>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Generating your website with AI...</span>
                              <span className="text-sm text-gray-500">{progress}%</span>
                            </div>
                            <Progress value={progress} className="w-full" />
                            <div className="text-xs text-gray-500">
                              {progress < 25 && "Analyzing your requirements..."}
                              {progress >= 25 && progress < 50 && "Planning component structure..."}
                              {progress >= 50 && progress < 75 && "Generating React code with AI..."}
                              {progress >= 75 && progress < 100 && "Applying styling and optimizations..."}
                              {progress === 100 && "Complete! Your AI-generated website is ready."}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {generationError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                              <span className="text-white text-xs">!</span>
                            </div>
                            <span className="text-sm font-medium">Generation Failed</span>
                          </div>
                          <p className="text-sm text-red-600 dark:text-red-400 mt-2">{generationError}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Templates & Settings */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Quick Templates
                    </CardTitle>
                    <CardDescription>Start with a template or describe from scratch</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {templates.map((template) => (
                        <motion.button
                          key={template.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedTemplate(template.id)
                            setPrompt(`Create a ${template.name.toLowerCase()} - ${template.description}. `)
                            textareaRef.current?.focus()
                          }}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            selectedTemplate === template.id
                              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                          }`}
                        >
                          <div className="text-lg mb-1">{template.icon}</div>
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.description}</div>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Generation Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Framework</label>
                      <select
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={framework}
                        onChange={(e) => setFramework(e.target.value)}
                      >
                        <option>Next.js 14</option>
                        <option>React + Vite</option>
                        <option>Remix</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Styling</label>
                      <select
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={styling}
                        onChange={(e) => setStyling(e.target.value)}
                      >
                        <option>Tailwind CSS</option>
                        <option>CSS Modules</option>
                        <option>Styled Components</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Components</label>
                      <select
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        value={components}
                        onChange={(e) => setComponents(e.target.value)}
                      >
                        <option>shadcn/ui</option>
                        <option>Headless UI</option>
                        <option>Chakra UI</option>
                      </select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      Live Preview
                    </CardTitle>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border rounded-lg p-1">
                        <button
                          onClick={() => setPreviewMode("desktop")}
                          className={`p-2 rounded ${previewMode === "desktop" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                        >
                          <Monitor className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPreviewMode("tablet")}
                          className={`p-2 rounded ${previewMode === "tablet" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                        >
                          <Tablet className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPreviewMode("mobile")}
                          className={`p-2 rounded ${previewMode === "mobile" ? "bg-blue-100 dark:bg-blue-900" : ""}`}
                        >
                          <Smartphone className="w-4 h-4" />
                        </button>
                      </div>

                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[600px] flex items-center justify-center">
                    {generatedCode ? (
                      <div
                        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                          previewMode === "mobile"
                            ? "w-80 h-[600px]"
                            : previewMode === "tablet"
                              ? "w-[768px] h-[600px]"
                              : "w-full h-[600px]"
                        }`}
                      >
                        <div className="h-full overflow-auto">
                          <div className="p-8 text-center">
                            <h1 className="text-3xl font-bold mb-4">Generated Website Preview</h1>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                              Your website has been generated successfully!
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="p-6 border rounded-lg">
                                  <h3 className="font-semibold mb-2">Feature {i}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Generated content based on your prompt.
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p>Generate a website to see the preview</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="code" className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      Generated Code
                    </CardTitle>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={copyCode}>
                        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                        {copied ? "Copied!" : "Copy"}
                      </Button>

                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        Push to GitHub
                      </Button>

                      <Button size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Deploy
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {generatedCode ? (
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{generatedCode}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-12">
                      <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Generate a website to see the code</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
