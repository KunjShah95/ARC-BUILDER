"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
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

export default function GeneratorPage() {
  const router = useRouter()
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
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Simple authentication check
  useEffect(() => {
    const checkAuth = () => {
      // For demo purposes, we'll allow access without authentication
      // In production, you would check for a valid session
      setIsAuthenticated(true)
    }
    checkAuth()
  }, [])

  const handleGenerateWithAI = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    setProgress(0)
    setActiveTab("preview")
    setGenerationError("")

    try {
      // Show progress while making API call
      const progressSteps = [
        { progress: 15, message: "Connecting to AI backend..." },
        { progress: 30, message: "Analyzing your requirements..." },
        { progress: 50, message: "GPT-OSS-120B is generating your code..." },
        { progress: 70, message: "Processing generated files..." },
        { progress: 85, message: "Finalizing your application..." },
      ]

      // Start progress updates
      let currentStep = 0
      const progressInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          setProgress(progressSteps[currentStep].progress)
          currentStep++
        }
      }, 1000)

      // Call the backend API
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          framework,
          styling,
          components,
        }),
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Generation failed')
      }

      // Show completion
      setProgress(100)
      setGeneratedCode(result.code || result.files?.['index.html'] || 'No code generated')
      
      // If we have multiple files, we could handle them here
      if (result.files && Object.keys(result.files).length > 1) {
        console.log('Generated files:', result.files)
      }

    } catch (error) {
      console.error("Generation failed:", error)
      setGenerationError(error instanceof Error ? error.message : "Failed to generate code")
    } finally {
      setIsGenerating(false)
    }
  }

  const generateCodeFromPrompt = (prompt: string, framework: string, styling: string, components: string) => {
    const isLanding = prompt.toLowerCase().includes('landing') || prompt.toLowerCase().includes('marketing')
    const isDashboard = prompt.toLowerCase().includes('dashboard') || prompt.toLowerCase().includes('admin')
    const isEcommerce = prompt.toLowerCase().includes('ecommerce') || prompt.toLowerCase().includes('store') || prompt.toLowerCase().includes('shop')
    const isBlog = prompt.toLowerCase().includes('blog') || prompt.toLowerCase().includes('content')
    const isPortfolio = prompt.toLowerCase().includes('portfolio') || prompt.toLowerCase().includes('personal')
    const isSaaS = prompt.toLowerCase().includes('saas') || prompt.toLowerCase().includes('app') || prompt.toLowerCase().includes('software')

    if (isLanding) {
      return `import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Check, Users, Zap } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              <Zap className="w-4 h-4 mr-2" />
              New Feature Available
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              ${prompt.slice(0, 30)}...
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              ${prompt.slice(0, 100)}... Built with modern technology and designed for scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Built with the latest technologies for maximum performance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized for speed with modern React and Next.js
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Production Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Built with best practices and security in mind
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>User Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Intuitive design that your users will love
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    "This platform has transformed how we build applications. The AI generation is incredible!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                      U{i}
                    </div>
                    <div>
                      <p className="font-semibold">User {i}</p>
                      <p className="text-sm text-gray-500">Verified User</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}`
    }

    if (isDashboard) {
      return `import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Bell,
  Search,
  Filter
} from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ${prompt.slice(0, 20)} Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12,234</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {i}
                        </div>
                        <div>
                          <p className="font-medium">Activity {i}</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Project Alpha</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Project Beta</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Project Gamma</span>
                    <span>90%</span>
                  </div>
                  <Progress value={90} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}`
    }

    // Default generic template
    return `import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function GeneratedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Generated with ArcBuilder AI
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ${prompt.slice(0, 50)}...
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Built with ${framework} and ${styling} using ${components} components
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feature 1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Auto-generated content based on your prompt: "${prompt.slice(0, 100)}..."
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feature 2</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Responsive design with modern ${styling} styling.
              </p>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Feature 3</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Production-ready ${framework} components with ${components}.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}`
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
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-center">
                          <Badge variant="outline" className="text-xs">
                            <Zap className="w-3 h-3 mr-1" />
                            Powered by GPT-OSS-120B
                          </Badge>
                        </div>
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
