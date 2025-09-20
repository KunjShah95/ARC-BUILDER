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
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
  codePreview?: string
  websiteUrl?: string
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
    setInputValue("")
    setIsGenerating(true)

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "assistant",
      content: "Generating your website...",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, loadingMessage])

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: "assistant",
        content: `I've created a beautiful ${userMessage.content.toLowerCase()}! Your website includes:

✨ **Modern Design**: Clean, responsive layout with smooth animations
🎨 **Custom Styling**: Tailwind CSS with shadcn/ui components
⚡ **Performance Optimized**: Next.js 14 with App Router
🔒 **SEO Ready**: Meta tags, structured data, and accessibility features
📱 **Mobile First**: Responsive design that works on all devices

The website is now ready for deployment. You can preview it, download the code, or deploy it directly to Vercel!`,
        timestamp: new Date(),
        codePreview: "https://github.com/example/generated-website",
        websiteUrl: "https://your-website-preview.vercel.app",
      }

      setMessages((prev) => prev.filter((msg) => !msg.isLoading).concat(aiResponse))
      setIsGenerating(false)
    }, 3000)
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

                        {/* Action buttons for AI responses with code/website */}
                        {message.type === "assistant" && (message.codePreview || message.websiteUrl) && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {message.websiteUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 text-xs"
                                onClick={() => window.open(message.websiteUrl, "_blank")}
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Preview Website
                              </Button>
                            )}
                            {message.codePreview && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs"
                                  onClick={() => window.open(message.codePreview, "_blank")}
                                >
                                  <Code2 className="w-3 h-3 mr-1" />
                                  View Code
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs"
                                  onClick={() => copyToClipboard(message.codePreview!)}
                                >
                                  <Copy className="w-3 h-3 mr-1" />
                                  Copy Link
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-8 text-xs"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </>
                            )}
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