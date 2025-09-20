"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowRight,
  Code2,
  Zap,
  Shield,
  Layers,
  Github,
  Database,
  Sparkles,
  Rocket,
  Users,
  Star,
  Play,
  CheckCircle,
  Target,
  Award,
  BarChart3,
  TrendingUp,
  Menu,
  X,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Google's standard easing
      staggerChildren: 0.1,
    },
  },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: {
    scale: 1.02,
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  whileTap: { scale: 0.98 },
}

const glowEffect = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(34, 197, 94, 0.2)",
      "0 0 60px rgba(34, 197, 94, 0.4)",
      "0 0 20px rgba(34, 197, 94, 0.2)",
    ],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? "#22c55e" : "#84cc16",
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}

function InteractiveCodeEditor() {
  const [activeFile, setActiveFile] = useState("component.tsx")
  const [isTyping, setIsTyping] = useState(false)

  const files = {
    "component.tsx": `import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function Dashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          Analytics Overview
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Total Users</span>
            <span className="font-bold">12,847</span>
          </div>
          <div className="flex justify-between">
            <span>Revenue</span>
            <span className="font-bold text-green-600">
              $45,231
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}`,
    "api.ts": `import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()
    
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, name, created_at: new Date() }])
      .select()
    
    if (error) throw error
    
    return NextResponse.json({ 
      success: true, 
      user: data[0] 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}`,
    "config.ts": `export const config = {
  database: {
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production'
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    providers: ['google', 'github', 'email']
  },
  deployment: {
    platform: 'vercel',
    regions: ['us-east-1', 'eu-west-1'],
    environment: process.env.NODE_ENV
  },
  integrations: {
    stripe: process.env.STRIPE_SECRET_KEY,
    sendgrid: process.env.SENDGRID_API_KEY,
    analytics: process.env.GA_TRACKING_ID
  }
}`,
  }

  return (
    <Card className="bg-gray-900 border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex space-x-1">
          {Object.keys(files).map((file) => (
            <button
              key={file}
              onClick={() => setActiveFile(file)}
              className={`px-3 py-1 text-sm rounded-t-lg transition-colors ${
                activeFile === file
                  ? "bg-gray-800 text-white border-b-2 border-green-500"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {file}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>
      <div className="p-4 h-96 overflow-auto">
        <pre className="text-sm text-gray-300 font-mono leading-relaxed">
          <code>{files[activeFile as keyof typeof files]}</code>
        </pre>
      </div>
    </Card>
  )
}

function MetricsDashboard() {
  const metrics = [
    { label: "Websites Generated", value: "127K+", change: "+23%", trend: "up" },
    { label: "Lines of Code", value: "2.4B+", change: "+156%", trend: "up" },
    { label: "Deploy Success Rate", value: "99.97%", change: "+0.02%", trend: "up" },
    { label: "Avg Generation Time", value: "12.3s", change: "-34%", trend: "down" },
    { label: "Developer Satisfaction", value: "4.9/5", change: "+0.1", trend: "up" },
    { label: "Enterprise Clients", value: "2,847", change: "+67%", trend: "up" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <Card className="p-4 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/50 border-2 hover:border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-2 h-2 rounded-full ${metric.trend === "up" ? "bg-green-500" : "bg-blue-500"}`}></div>
              <TrendingUp className={`w-4 h-4 ${metric.trend === "up" ? "text-green-500" : "text-blue-500"}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
            <div className="text-xs text-muted-foreground mb-1">{metric.label}</div>
            <div className={`text-xs font-medium ${metric.trend === "up" ? "text-green-600" : "text-blue-600"}`}>
              {metric.change}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

export default function ArcBuilderLanding() {
  const [activeDemo, setActiveDemo] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      setScrollProgress(latest)
    })
    return unsubscribe
  }, [scrollYProgress])

  const demos = [
    {
      title: "E-commerce Platform",
      description: "Complete shopping experience with cart, checkout, and admin dashboard",
      tech: ["Next.js", "Stripe", "Supabase", "Tailwind"],
      preview: "/modern-ecommerce-dashboard.png",
    },
    {
      title: "SaaS Dashboard",
      description: "Analytics-rich dashboard with user management and billing integration",
      tech: ["React", "Chart.js", "Auth0", "PostgreSQL"],
      preview: "/saas-analytics-dashboard.png",
    },
    {
      title: "Social Media App",
      description: "Real-time messaging, posts, and social features with mobile-first design",
      tech: ["Next.js", "Socket.io", "Redis", "Cloudinary"],
      preview: "/social-media-mobile-app.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <ParticleSystem />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary z-50"
          style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "left" }}
        ></div>
      </div>

      <motion.header
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg"
              variants={glowEffect}
              animate="animate"
            >
              <Code2 className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ArcBuilder
            </span>
            <Badge variant="secondary" className="text-xs">
              Pro
            </Badge>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { name: "Features", href: "#features" },
              { name: "Showcase", href: "#showcase" },
              { name: "Pricing", href: "#pricing" },
              { name: "Docs", href: "#docs" },
              { name: "Community", href: "#community" },
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors relative group py-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Github className="w-4 h-4 mr-2" />
              Star on GitHub
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg"
              onClick={() => window.location.href = '/auth'}
            >
              Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`lg:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 ${isMenuOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            {["Features", "Showcase", "Pricing", "Docs", "Community"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.header>

      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/hero-background.jpg)",
              filter: "brightness(0.3) contrast(1.2)",
            }}
          />
          {/* Gradient Overlays for Better Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div className="container mx-auto text-center relative z-10" style={{ y, opacity, scale }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(34, 197, 94, 0.15)" }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Introducing ArcBuilder 3.0 • AI-First • Enterprise Ready
              </span>
              <Badge variant="secondary" className="text-xs animate-pulse">
                New
              </Badge>
              <ArrowUpRight className="w-3 h-3 text-primary" />
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 text-balance leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Ship{" "}
              <motion.span className="relative inline-block" whileHover={{ scale: 1.05, rotate: 1 }}>
                <motion.span
                  className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-300%"
                  animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                  transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  Production
                </motion.span>
                <motion.div
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </motion.span>
              <br />
              at{" "}
              <motion.span className="relative" whileHover={{ scale: 1.05 }}>
                <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Lightning</span>
                <motion.div
                  className="absolute top-0 right-0 w-6 h-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="w-6 h-6 text-accent" />
                </motion.div>
              </motion.span>{" "}
              Speed
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto text-pretty leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Transform your wildest ideas into{" "}
              <span className="text-primary font-semibold">enterprise-grade applications</span> with AI-generated React
              scaffolds, seamless integrations, and Google-level architecture.{" "}
              <motion.span
                className="text-accent font-semibold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                From concept to IPO
              </motion.span>{" "}
              in record time.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div {...scaleOnHover}>
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 relative overflow-hidden group"
                  onClick={() => window.location.href = '/auth'}
                >
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center">
                    <Rocket className="w-6 h-6 mr-3" />
                    Start Building Free
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </span>
                </Button>
              </motion.div>

              <motion.div {...scaleOnHover}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-xl px-12 py-6 bg-transparent hover:bg-primary/5 border-2 hover:border-primary transition-all duration-300 group"
                >
                  <Play className="w-6 h-6 mr-3 group-hover:text-primary transition-colors" />
                  Watch 3-Min Demo
                </Button>
              </motion.div>

              <motion.div
                className="flex items-center space-x-2 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="w-8 h-8 border-2 border-background">
                      <AvatarImage
                        src={`/developer-avatar.png?key=aoiue&height=32&width=32&query=developer avatar ${i}`}
                      />
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span>Join 50K+ developers</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div className="mb-8">
                <div className="flex justify-center space-x-4 mb-6">
                  {demos.map((demo, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveDemo(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeDemo === index
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      {demo.title}
                    </button>
                  ))}
                </div>
              </div>

              <Card className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{demos[activeDemo].title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{demos[activeDemo].description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {demos[activeDemo].tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <Button size="sm" className="bg-primary hover:bg-primary/90">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline">
                        <Code2 className="w-4 h-4 mr-2" />
                        View Code
                      </Button>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-br from-muted/50 to-muted/20 p-8 flex items-center justify-center">
                    <motion.img
                      key={activeDemo}
                      src={demos[activeDemo].preview}
                      alt={demos[activeDemo].title}
                      className="rounded-lg shadow-lg max-w-full h-auto"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-2xl backdrop-blur-sm border border-primary/20 flex items-center justify-center"
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Code2 className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-xl backdrop-blur-sm border border-accent/20 flex items-center justify-center"
          animate={{
            y: [10, -10, 10],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Zap className="w-6 h-6 text-accent" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary/10 rounded-full backdrop-blur-sm border border-secondary/20 flex items-center justify-center"
          animate={{
            scale: [1, 1.2, 1],
            rotate: 360,
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Sparkles className="w-5 h-5 text-secondary" />
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              <BarChart3 className="w-4 h-4 mr-2" />
              Real-Time Analytics
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Join thousands of developers and enterprises who are shipping faster than ever before
            </p>
          </motion.div>

          <MetricsDashboard />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Website Generation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Transform Your Ideas into <span className="text-primary">Production-Ready</span> Websites
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              ArcBuilder is an AI assistant that generates complete React scaffolds with Tailwind CSS, shadcn/ui
              components, and seamless integrations. From brief to deployment in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Features Section with Interactive Cards */}
      <section id="features" className="py-32 px-4 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Core Features
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ship Fast</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Production-ready components, integrations, and deployment configs generated from your brief. No
              boilerplate, no setup time, just pure productivity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Code2,
                title: "React + Tailwind Scaffolds",
                description:
                  "Complete component hierarchies with shadcn/ui primitives, responsive layouts, and TypeScript support",
                color: "from-blue-500 to-cyan-500",
                features: ["TypeScript Ready", "Responsive Design", "Component Library"],
              },
              {
                icon: Zap,
                title: "Framer Motion Animations",
                description: "Polished micro-interactions, page transitions, and entrance animations built-in",
                color: "from-purple-500 to-pink-500",
                features: ["Micro-interactions", "Page Transitions", "Gesture Support"],
              },
              {
                icon: Shield,
                title: "Accessibility First",
                description:
                  "ARIA labels, semantic HTML, keyboard navigation, and screen reader optimizations included",
                color: "from-green-500 to-emerald-500",
                features: ["WCAG Compliant", "Keyboard Navigation", "Screen Reader"],
              },
              {
                icon: Layers,
                title: "Modular Architecture",
                description:
                  "Clean separation of concerns with prop-driven customization points and reusable components",
                color: "from-orange-500 to-red-500",
                features: ["Clean Code", "Reusable Components", "Easy Customization"],
              },
              {
                icon: Database,
                title: "Database Integration",
                description: "Supabase, Neon, and other database adapters with security best practices and type safety",
                color: "from-indigo-500 to-purple-500",
                features: ["Type Safety", "Security First", "Multiple Providers"],
              },
              {
                icon: Rocket,
                title: "Deployment Ready",
                description: "Vercel, Netlify, and Fly.io configs with environment setup and CI/CD pipelines",
                color: "from-teal-500 to-green-500",
                features: ["One-Click Deploy", "CI/CD Ready", "Environment Config"],
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                > 
                  <Card className="h-full hover:shadow-2xl transition-all duration-500 bg-card/50 backdrop-blur-sm border-2 hover:border-primary/30 group">
                    <CardHeader className="pb-4">
                      <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {feature.features.map((feat, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {feat}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Seamless Integrations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with your favorite tools and services with secure, production-ready adapters
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Supabase", description: "Database & Auth", logo: "S" },
              { name: "GitHub", description: "Code Repository", logo: "G" },
              { name: "Langraph", description: "Agent Orchestration", logo: "L" },
              { name: "Vector DB", description: "Context Storage", logo: "V" },
            ].map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-accent-foreground">{integration.logo}</span>
                    </div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription>{integration.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Trusted by Developers</h2>
            <p className="text-xl text-muted-foreground">See what teams are saying about ArcBuilder</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "ArcBuilder cut our prototype time from weeks to hours. The generated code is clean and production-ready.",
                author: "Sarah Chen",
                role: "Lead Developer",
                avatar: "SC",
              },
              {
                quote:
                  "The integration adapters saved us countless hours of boilerplate. Security best practices built-in.",
                author: "Marcus Rodriguez",
                role: "CTO",
                avatar: "MR",
              },
              {
                quote:
                  "Finally, an AI tool that understands developer workflows. The scaffolds are exactly what we need.",
                author: "Emily Watson",
                role: "Frontend Architect",
                avatar: "EW",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <Avatar className="w-10 h-10 mr-3">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Build Faster?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Join developers who are shipping production-ready websites in minutes, not weeks.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                  onClick={() => window.location.href = '/auth'}
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  Start Building Now
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Deploy anywhere</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: "10K+", label: "Apps Generated" },
                { number: "50M+", label: "Lines of Code" },
                { number: "99.9%", label: "Uptime" },
                { number: "< 30s", label: "Generation Time" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Award className="w-4 h-4 mr-2" />
              Ready to Ship
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8 text-balance">
              Stop Building.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Start Shipping.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
              Join thousands of developers who are shipping production-ready applications in minutes, not months. Your
              next breakthrough is just one brief away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                >
                  <Rocket className="w-6 h-6 mr-3" />
                  Start Building Now
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>

              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Deploy anywhere</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: "10K+", label: "Apps Generated" },
                { number: "50M+", label: "Lines of Code" },
                { number: "99.9%", label: "Uptime" },
                { number: "< 30s", label: "Generation Time" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <motion.div className="flex items-center space-x-3 mb-6" whileHover={{ scale: 1.05 }}>
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ArcBuilder
                </span>
              </motion.div>
              <p className="text-muted-foreground text-lg mb-6 max-w-md">
                AI-powered website generation for modern developers. Transform ideas into production-ready applications.
              </p>
              <div className="flex space-x-4">
                {[Github, Users, Star].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-10 h-10 bg-muted/50 hover:bg-primary hover:text-primary-foreground rounded-lg flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "Integrations", "Templates", "API Reference"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Examples", "Community", "Blog", "Changelog"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Support", "Privacy", "Terms"],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <motion.a
                        href="#"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        whileHover={{ x: 5 }}
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 ArcBuilder. All rights reserved. Built with ❤️ for developers.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
