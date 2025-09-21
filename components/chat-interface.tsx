"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { apiService, type WebsiteStatus, ApiError } from "@/lib/api-service"

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

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "👋 Welcome to ArcBuilder! I'm your AI assistant ready to help you build amazing websites. Just describe what you want to create and I'll generate a complete, production-ready website for you.\n\nTry something like:\n• \"Create a modern portfolio website for a photographer\"\n• \"Build an e-commerce store for selling handmade jewelry\"\n• \"Make a landing page for a SaaS productivity app\"",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      await apiService.pollTaskStatus(
        response.task_id,
        (status) => {
          // Update the loading message with progress
          setMessages((prev) => prev.map(msg => 
            msg.id === loadingMessageId 
              ? { 
                  ...msg, 
                  content: `${status.progress.message}\n\nStep: ${status.progress.step}`,
                  status: status
                }
              : msg
          ))
        }
      )

      // Get final status
      const finalStatus = await apiService.getTaskStatus(response.task_id)
      
      if (finalStatus.status === 'completed' && finalStatus.result) {
        const successMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "assistant",
          content: `🎉 **Website Generated Successfully!**

I've created your website based on: "${originalInput}"

**Generated Files:** ${finalStatus.result.file_count} files
**Features Include:**
✨ Modern, responsive design
🎨 Clean, semantic HTML/CSS/JS
⚡ Optimized performance
📱 Mobile-first approach
🔒 Best practices implemented

Your website is ready! You can download the complete source code or preview individual files.`,
          timestamp: new Date(),
          taskId: response.task_id,
          status: finalStatus,
        }

        setMessages((prev) => prev.filter((msg) => !msg.isLoading).concat(successMessage))
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 2).toString(),
          type: "assistant",
          content: `❌ **Generation Failed**

Sorry, there was an issue generating your website: ${finalStatus.error_message || 'Unknown error'}

Please try again with a different prompt or check if the backend server is running properly.`,
          timestamp: new Date(),
          error: finalStatus.error_message,
        }

        setMessages((prev) => prev.filter((msg) => !msg.isLoading).concat(errorMessage))
      }
    } catch (error) {
      console.error('Error generating website:', error)
      
      let errorContent = "❌ **Connection Error**\n\n"
      
      if (error instanceof ApiError) {
        if (error.status === 0) {
          errorContent += "Cannot connect to the backend server. Please make sure the Python backend is running on port 8000.\n\nTo start the backend:\n1. Navigate to `backend/app builder/`\n2. Run `python start_server.py`"
        } else {
          errorContent += `Server error (${error.status}): ${error.message}`
        }
      } else {
        errorContent += "An unexpected error occurred. Please try again."
      }

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: errorContent,
        timestamp: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error',
      }

      setMessages((prev) => prev.filter((msg) => !msg.isLoading).concat(errorMessage))
    } finally {
      setIsGenerating(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-border/50 p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">ArcBuilder Chat</h1>
            <p className="text-sm text-muted-foreground">AI-powered website generation</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.type === "user" ? "flex-row-reverse" : "flex-row"
                } items-start space-x-3`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  {message.type === "user" ? (
                    <>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  )}
                </Avatar>

                <Card
                  className={`${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-3"
                      : "bg-card border-border/50 mr-3"
                  }`}
                >
                  <CardContent className="p-4">
                    {message.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Generating your website...</span>
                      </div>
                    ) : (
                      <>
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>

                        {/* Action buttons for completed AI responses */}
                        {message.type === "assistant" && message.status?.status === 'completed' && message.taskId && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 text-xs"
                              onClick={async () => {
                                try {
                                  const blob = await apiService.downloadWebsite(message.taskId!)
                                  const url = window.URL.createObjectURL(blob)
                                  const a = document.createElement('a')
                                  a.href = url
                                  a.download = `website_${message.taskId}.zip`
                                  document.body.appendChild(a)
                                  a.click()
                                  document.body.removeChild(a)
                                  window.URL.revokeObjectURL(url)
                                } catch (error) {
                                  console.error('Download failed:', error)
                                }
                              }}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download ZIP
                            </Button>
                            
                            {message.status.result?.files && message.status.result.files.length > 0 && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => {
                                  // Show files in a modal or expand inline
                                  const mainFile = message.status?.result?.files.find(f => 
                                    f.path.includes('index.html') || f.path.includes('main.html')
                                  ) || message.status?.result?.files[0]
                                  
                                  if (mainFile) {
                                    copyToClipboard(mainFile.content)
                                  }
                                }}
                              >
                                <Code2 className="w-3 h-3 mr-1" />
                                View Files ({message.status.result.file_count})
                              </Button>
                            )}
                          </div>
                        )}

                        {/* Status indicator for processing messages */}
                        {message.type === "assistant" && message.status && message.status.status !== 'completed' && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                            {message.status.status === 'processing' && (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Processing...</span>
                              </>
                            )}
                            {message.status.status === 'failed' && (
                              <>
                                <AlertCircle className="w-3 h-3 text-destructive" />
                                <span className="text-destructive">Failed</span>
                              </>
                            )}
                            {message.status.status === 'pending' && (
                              <>
                                <Loader2 className="w-3 h-3 animate-spin" />
                                <span>Queued...</span>
                              </>
                            )}
                          </div>
                        )}

                        {/* Error indicator */}
                        {message.error && (
                          <div className="mt-3 flex items-center gap-2 text-xs text-destructive">
                            <AlertCircle className="w-3 h-3" />
                            <span>Error occurred</span>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border/50 p-4 bg-card/50 backdrop-blur-sm">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the website you want to build..."
              className="min-h-[60px] max-h-[120px] resize-none pr-12"
              disabled={isGenerating}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {inputValue.length}/500
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isGenerating}
            className="px-4 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Quick suggestions */}
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Portfolio website",
            "E-commerce store",
            "Landing page",
            "Blog",
            "Restaurant website",
          ].map((suggestion) => (
            <Badge
              key={suggestion}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80 transition-colors text-xs"
              onClick={() => setInputValue(`Create a modern ${suggestion.toLowerCase()}`)}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {suggestion}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}