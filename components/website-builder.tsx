'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@/contexts/auth-context'
import {
  Send,
  Bot,
  User,
  Code2,
  Sparkles,
  Copy,
  Download,
  ExternalLink,
  Loader2,
  MessageSquare,
  Wand2,
  AlertCircle,
  CheckCircle,
  Monitor,
  Tablet,
  Smartphone,
  Settings,
  Save,
  Eye,
  RefreshCw,
  Zap,
  Globe,
  Palette,
  Layout,
  FileCode,
  LogOut,
  Briefcase,
} from 'lucide-react'
import { apiService, type WebsiteStatus, ApiError } from '@/lib/api-service'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
  taskId?: string
  status?: WebsiteStatus
  error?: string
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile'

export const WebsiteBuilder: React.FC = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "👋 Welcome to ArcBuilder, " + (user?.name || 'there') + "! I'm your AI assistant ready to help you build amazing websites. Just describe what you want to create and I'll generate a complete, production-ready website for you.\n\nTry something like:\n• \"Create a modern portfolio website for a photographer\"\n• \"Build an e-commerce store for selling handmade jewelry\"\n• \"Make a landing page for a SaaS productivity app\"",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentViewport, setCurrentViewport] = useState<ViewportSize>('desktop')
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const originalInput = inputValue
    setInputValue("")
    setIsGenerating(true)

    // Add loading message
    const loadingMessageId = (Date.now() + 1).toString()
    const loadingMessage: Message = {
      id: loadingMessageId,
      type: "assistant",
      content: "Starting website generation...",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, loadingMessage])

    try {
      // Check if backend is running
      await apiService.healthCheck()
      
      // Start website generation
      const response = await apiService.generateWebsite({
        user_prompt: originalInput,
        recursion_limit: 100
      })

      // Update loading message with task ID
      setMessages((prev) => prev.map(msg => 
        msg.id === loadingMessageId 
          ? { ...msg, content: "Website generation started. Please wait...", taskId: response.task_id }
          : msg
      ))

      // Poll for status updates
      const pollStatus = async () => {
        try {
          const status = await apiService.getTaskStatus(response.task_id)
          
          setMessages((prev) => prev.map(msg => 
            msg.id === loadingMessageId 
              ? { 
                  ...msg, 
                  content: status.status === 'completed' 
                    ? "✅ Website generated successfully! Your website is ready." 
                    : status.status === 'failed'
                    ? "❌ Website generation failed. Please try again."
                    : `🔄 Generating website... Status: ${status.status}`,
                  status,
                  isLoading: status.status === 'processing' || status.status === 'pending'
                }
              : msg
          ))

          if (status.status === 'completed') {
            setPreviewUrl(status.result?.download_url || "")
            setIsGenerating(false)
          } else if (status.status === 'failed') {
            setIsGenerating(false)
          } else {
            // Continue polling
            setTimeout(pollStatus, 2000)
          }
        } catch (error) {
          console.error('Polling error:', error)
          setIsGenerating(false)
          setMessages((prev) => prev.map(msg => 
            msg.id === loadingMessageId 
              ? { ...msg, content: "❌ Error checking website status. Please try again.", isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' }
              : msg
          ))
        }
      }

      // Start polling after a short delay
      setTimeout(pollStatus, 1000)

    } catch (error) {
      setIsGenerating(false)
      let errorMessage = "Sorry, I encountered an error while generating your website."
      
      if (error instanceof ApiError) {
        if (error.message.includes('Backend server')) {
          errorMessage = "🔧 The backend server isn't running. Please start the backend server and try again."
        } else {
          errorMessage = `❌ ${error.message}`
        }
      }

      setMessages((prev) => prev.map(msg => 
        msg.id === loadingMessageId 
          ? { ...msg, content: errorMessage, isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' }
          : msg
      ))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getViewportStyles = () => {
    switch (currentViewport) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      default:
        return 'w-full'
    }
  }

  const refreshPreview = () => {
    setIsPreviewLoading(true)
    // Simulate preview refresh
    setTimeout(() => {
      setIsPreviewLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background-secondary to-background glass">
      {/* Premium Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-20 dark:opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
        <motion.div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Left Panel - Premium Chat Interface */}
      <div className="w-1/3 border-r border-border-secondary glass glass-strong flex flex-col">
        {/* Premium Header */}
        <motion.div
          className="p-6 border-b border-border-secondary glass glass-strong"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-4"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-30 blur-sm"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div>
                <span className="text-2xl font-black text-gradient">
                  ArcBuilder
                </span>
                <div className="text-sm text-foreground-tertiary font-medium tracking-wider uppercase">
                  AI Website Builder
                </div>
              </div>
            </motion.div>
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="w-10 h-10 shadow-xl">
                  <AvatarFallback className="bg-gradient-primary text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="glass glass-strong px-4 py-2 rounded-xl text-foreground-secondary hover:text-foreground transition-all duration-300"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Premium Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Avatar className="w-10 h-10 shadow-xl">
                      <AvatarFallback className={`${
                        message.type === 'user'
                          ? 'bg-gradient-primary text-white'
                          : 'bg-gradient-to-br from-accent to-primary text-white'
                      } font-bold`}>
                        {message.type === 'user' ? (
                          <User className="w-5 h-5" />
                        ) : (
                          <Bot className="w-5 h-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card className={`${
                      message.type === 'user'
                        ? 'card-elevated glass glass-strong bg-gradient-primary text-white border-primary/30'
                        : 'card-elevated glass glass-strong bg-card/80 dark:bg-card/60 border-border-secondary hover:border-primary/40'
                    } transition-all duration-500`}>
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <p className={`text-base leading-relaxed whitespace-pre-wrap ${
                              message.type === 'user' ? 'text-white' : 'text-foreground'
                            }`}>
                              {message.content}
                            </p>
                            {message.isLoading && (
                              <motion.div
                                className="flex items-center gap-3 mt-4 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                <div className="relative">
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  <motion.div
                                    className="absolute inset-0 bg-primary/20 rounded-full blur-sm"
                                    animate={{
                                      scale: [1, 1.5, 1],
                                      opacity: [0.5, 0, 0.5],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Number.POSITIVE_INFINITY,
                                      ease: "easeInOut",
                                    }}
                                  />
                                </div>
                                <span className="text-foreground-secondary font-medium">Generating your website...</span>
                              </motion.div>
                            )}
                            {message.status && (
                              <motion.div
                                className="mt-4 flex items-center gap-3"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                <Badge className={`${
                                  message.status.status === 'completed'
                                    ? 'bg-success text-white border-success/30'
                                    : message.status.status === 'failed'
                                    ? 'bg-destructive text-white border-destructive/30'
                                    : 'glass glass-strong border-border-secondary'
                                } px-3 py-1 font-semibold`}>
                                  {message.status.status}
                                </Badge>
                                {message.status.result?.download_url && (
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Button
                                      size="sm"
                                      className="btn-primary px-4 py-2 rounded-xl font-medium"
                                      onClick={() => setPreviewUrl(message.status!.result!.download_url)}
                                    >
                                      <Eye className="w-4 h-4 mr-2" />
                                      View Website
                                    </Button>
                                  </motion.div>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Premium Input Area */}
        <motion.div
          className="p-6 border-t border-border-secondary glass glass-strong"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="space-y-5">
            <div className="relative">
              <Textarea
                placeholder="Describe the website you want to build... (e.g., 'Create a modern portfolio for a photographer')"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isGenerating}
                className="min-h-[80px] pr-16 resize-none glass glass-strong border-2 border-border-secondary focus:border-primary/50 rounded-2xl text-base placeholder:text-foreground-tertiary transition-all duration-300"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isGenerating}
                  className="absolute bottom-3 right-3 btn-primary px-4 py-2 rounded-xl font-semibold shadow-lg"
                >
                  {isGenerating ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Loader2 className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Premium Quick Actions */}
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: Zap, text: "Portfolio", prompt: "Create a modern portfolio website for a photographer" },
                { icon: Globe, text: "E-commerce", prompt: "Build an e-commerce store for selling products" },
                { icon: Layout, text: "Landing Page", prompt: "Make a landing page for a SaaS app" },
                { icon: Briefcase, text: "Business", prompt: "Create a professional business website" },
              ].map((action, index) => (
                <motion.div
                  key={action.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(action.prompt)}
                    disabled={isGenerating}
                    className="glass glass-strong border-2 border-border-secondary hover:border-primary/50 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 group"
                  >
                    <action.icon className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    {action.text}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Premium Right Panel - Website Preview */}
      <div className="flex-1 flex flex-col glass glass-strong">
        {/* Premium Preview Header */}
        <motion.div
          className="p-6 border-b border-border-secondary glass glass-strong"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Website Preview</h2>
                <p className="text-sm text-foreground-tertiary">Real-time preview of your generated website</p>
              </div>
              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Badge className="glass glass-strong bg-success/10 text-success border-success/30 px-3 py-1 font-semibold">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Generated Successfully
                  </Badge>
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Premium Viewport Controls */}
              <div className="flex items-center glass glass-strong rounded-2xl p-1 border border-border-secondary">
                {[
                  { key: 'desktop', icon: Monitor, label: 'Desktop' },
                  { key: 'tablet', icon: Tablet, label: 'Tablet' },
                  { key: 'mobile', icon: Smartphone, label: 'Mobile' },
                ].map(({ key, icon: Icon, label }) => (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={currentViewport === key ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setCurrentViewport(key as ViewportSize)}
                      className={`px-3 py-2 rounded-xl font-medium transition-all duration-300 ${
                        currentViewport === key
                          ? 'bg-primary text-white shadow-lg'
                          : 'hover:bg-primary/10 text-foreground-secondary'
                      }`}
                      title={label}
                    >
                      <Icon className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Premium Action Buttons */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshPreview}
                  disabled={isPreviewLoading}
                  className="glass glass-strong border-2 border-border-secondary hover:border-primary/50 px-4 py-2 rounded-xl font-medium"
                >
                  {isPreviewLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>

              {previewUrl && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(previewUrl, '_blank')}
                    className="btn-primary px-4 py-2 rounded-xl font-medium shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Premium Preview Content */}
        <div className="flex-1 p-6 bg-gradient-to-b from-background-secondary/30 to-background">
          <motion.div
            className={`h-full glass glass-strong rounded-3xl border-2 border-border-secondary shadow-2xl overflow-hidden ${getViewportStyles()}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {previewUrl ? (
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title="Website Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-center p-12">
                <motion.div
                  className="space-y-8 max-w-lg"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <div className="relative">
                    <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                      <Wand2 className="w-12 h-12 text-white" />
                    </div>
                    <motion.div
                      className="absolute -inset-4 bg-gradient-primary opacity-20 blur-2xl rounded-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Build Something Amazing</h3>
                    <p className="text-lg text-foreground-secondary leading-relaxed">
                      Describe your website vision in the chat, and watch as our AI transforms your ideas into
                      production-ready websites with enterprise-grade code and stunning designs.
                    </p>
                  </div>
                  <div className="flex justify-center gap-4 mt-8">
                    <Badge className="glass glass-strong px-4 py-2 font-semibold">
                      <Palette className="w-4 h-4 mr-2" />
                      Custom Design
                    </Badge>
                    <Badge className="glass glass-strong px-4 py-2 font-semibold">
                      <FileCode className="w-4 h-4 mr-2" />
                      Clean Code
                    </Badge>
                    <Badge className="glass glass-strong px-4 py-2 font-semibold">
                      <Zap className="w-4 h-4 mr-2" />
                      Lightning Fast
                    </Badge>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}