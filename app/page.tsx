"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ArrowRight,
  Code2,
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
  Globe,
  Clock,
  Cpu,
  FileCode,
  Palette,
  Settings,
  Terminal,
  Briefcase,
  Trophy,
  Zap,
  Eye,
  Heart,
  MessageCircle,
  Download,
  BookOpen,
  Headphones,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"

// Professional animation configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
    },
  },
}

// Enhanced particle system for professional feel
function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: any[] = []
    const particleCount = 50

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(59, 130, 246, ${particle.opacity})`
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-20"
    />
  )
}

// Professional metrics component
function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    websites: 12547,
    developers: 8932,
    countries: 67,
    satisfaction: 98.7,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        websites: prev.websites + Math.floor(Math.random() * 3),
        developers: prev.developers + Math.floor(Math.random() * 2),
        countries: prev.countries,
        satisfaction: prev.satisfaction,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
    >
      {[
        { label: "Websites Built", value: metrics.websites.toLocaleString(), icon: Rocket },
        { label: "Happy Developers", value: metrics.developers.toLocaleString(), icon: Users },
        { label: "Countries", value: metrics.countries.toString(), icon: Globe },
        { label: "Satisfaction", value: `${metrics.satisfaction}%`, icon: Heart },
      ].map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.7 + index * 0.1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <metric.icon className="w-5 h-5 text-primary mr-2" />
            <span className="text-2xl font-bold text-foreground">{metric.value}</span>
          </div>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function ProfessionalLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const navigation = [
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Company", href: "#company" },
  ]

  const features = [
    {
      icon: Zap,
      title: "Lightning-Fast Generation",
      description: "Generate production-ready websites in under 30 seconds with our advanced AI engine.",
      color: "from-yellow-500 to-orange-500",
      metrics: "< 30s",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with HTTPS, security headers, and vulnerability scanning.",
      color: "from-green-500 to-emerald-500",
      metrics: "99.9%",
    },
    {
      icon: Palette,
      title: "Design Excellence",
      description: "Beautiful, modern designs that follow the latest UI/UX best practices.",
      color: "from-purple-500 to-pink-500",
      metrics: "20+ Themes",
    },
    {
      icon: Code2,
      title: "Clean Code",
      description: "Maintainable, well-structured code following industry standards and conventions.",
      color: "from-blue-500 to-cyan-500",
      metrics: "100% Valid",
    },
    {
      icon: Database,
      title: "Database Integration",
      description: "Seamless integration with popular databases and APIs out of the box.",
      color: "from-indigo-500 to-purple-500",
      metrics: "15+ DBs",
    },
    {
      icon: Rocket,
      title: "One-Click Deploy",
      description: "Deploy to Vercel, Netlify, or your preferred hosting platform instantly.",
      color: "from-teal-500 to-green-500",
      metrics: "10+ Hosts",
    },
  ]

  const testimonials = [
    {
      quote: "ArcBuilder has revolutionized our development workflow. What used to take weeks now takes minutes. The quality is exceptional.",
      author: "Sarah Chen",
      role: "Senior Engineering Manager",
      company: "TechCorp",
      avatar: "SC",
      rating: 5,
    },
    {
      quote: "The AI understands context better than any tool I've used. It's like having a senior developer on the team 24/7.",
      author: "Marcus Rodriguez",
      role: "Lead Developer",
      company: "StartupXYZ",
      avatar: "MR",
      rating: 5,
    },
    {
      quote: "Our client delivery time has improved by 300%. The generated code is production-ready and follows best practices.",
      author: "Emily Watson",
      role: "Agency Owner",
      company: "Digital Solutions",
      avatar: "EW",
      rating: 5,
    },
  ]

  const solutions = [
    {
      title: "Agencies & Freelancers",
      description: "Scale your business with rapid prototyping and client delivery",
      icon: Briefcase,
      benefits: ["Faster client turnaround", "Higher profit margins", "Scalable workflows"],
    },
    {
      title: "Startups & SMBs",
      description: "Launch your MVP quickly without compromising on quality",
      icon: Rocket,
      benefits: ["Rapid MVP development", "Cost-effective scaling", "Professional results"],
    },
    {
      title: "Enterprise Teams",
      description: "Streamline development cycles and maintain consistency",
      icon: Users,
      benefits: ["Consistent code quality", "Reduced development time", "Team collaboration"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <ParticleSystem />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
        <motion.div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0%, transparent 50%)",
            y: backgroundY,
          }}
        />
      </div>

      {/* Professional Header */}
      <motion.header
        className="fixed top-0 w-full z-50 bg-background/80 dark:bg-background/90 backdrop-blur-xl border-b border-border/50"
        style={{ opacity: headerOpacity }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ArcBuilder
              </span>
              <div className="text-xs text-muted-foreground">Professional AI</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
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
            <ThemeToggle />
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
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
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-background/95 dark:bg-background/98 backdrop-blur-xl border-b border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section - Professional & Sophisticated */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary" className="mb-6 text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Trusted by 10,000+ Professionals
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
            >
              Build{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Production-Ready
              </span>
              <br />
              Websites in Minutes
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Enterprise-grade AI that generates clean, scalable, and maintainable code. 
              Trusted by Fortune 500 companies and leading development agencies worldwide.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button
                size="lg"
                className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500 group"
                onClick={() => window.location.href = '/auth'}
              >
                <Rocket className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-6 bg-transparent hover:bg-primary/5 border-2 hover:border-primary transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </motion.div>

            <LiveMetrics />
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl backdrop-blur-sm border border-primary/20 flex items-center justify-center"
          variants={floatingVariants}
          animate="animate"
        >
          <Code2 className="w-8 h-8 text-primary" />
        </motion.div>

        <motion.div
          className="absolute top-40 right-10 w-20 h-20 bg-accent/10 dark:bg-accent/20 rounded-2xl backdrop-blur-sm border border-accent/20 flex items-center justify-center"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        >
          <Zap className="w-10 h-10 text-accent" />
        </motion.div>

        <motion.div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-secondary/10 dark:bg-secondary/20 rounded-full backdrop-blur-sm border border-secondary/20 flex items-center justify-center"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 4 }}
        >
          <Sparkles className="w-6 h-6 text-secondary" />
        </motion.div>
      </section>

      {/* Professional Features Section */}
      <section id="features" className="py-32 px-4 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge variant="secondary" className="mb-4">
              <Award className="w-3 h-3 mr-1" />
              Enterprise Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Professional-Grade Development
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for professionals who demand excellence. Every feature is designed 
              to meet enterprise standards and accelerate your development workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 bg-card/50 dark:bg-card/80 backdrop-blur-sm border-2 hover:border-primary/30 group-hover:bg-card/80 dark:group-hover:bg-card/90">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs font-bold">
                        {feature.metrics}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge variant="secondary" className="mb-4">
              <Target className="w-3 h-3 mr-1" />
              Solutions
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built for Every Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a solo developer or leading an enterprise team, 
              ArcBuilder adapts to your workflow and scales with your needs.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full text-center hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card/50 to-card/80 dark:from-card/80 dark:to-card/90 backdrop-blur-sm border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <solution.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-4">{solution.title}</CardTitle>
                    <CardDescription className="text-base">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {solution.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-4 bg-muted/30 dark:bg-muted/10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <Badge variant="secondary" className="mb-4">
              <MessageCircle className="w-3 h-3 mr-1" />
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-muted-foreground">
              See what top developers and agencies are saying about ArcBuilder
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center bg-card/50 dark:bg-card/80 backdrop-blur-sm border-2">
                <CardContent className="pt-8 pb-8">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-2xl md:text-3xl font-light text-foreground mb-8 leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </blockquote>
                  <div className="flex items-center justify-center">
                    <Avatar className="w-16 h-16 mr-4">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-lg font-bold">
                        {testimonials[activeTestimonial].avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold text-lg">{testimonials[activeTestimonial].author}</div>
                      <div className="text-muted-foreground">{testimonials[activeTestimonial].role}</div>
                      <div className="text-sm text-primary font-medium">{testimonials[activeTestimonial].company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              Ready to Ship
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-8">
              Stop Coding.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Start Shipping.
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have transformed their development workflow. 
              Your next breakthrough is just one conversation away.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                size="lg"
                className="text-xl px-12 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                <Rocket className="w-6 h-6 mr-3" />
                Start Building Now
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>

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
                  <span>Enterprise ready</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="py-20 px-4 bg-muted/50 dark:bg-muted/20 border-t border-border/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ArcBuilder
                </span>
              </motion.div>
              <p className="text-muted-foreground text-lg mb-6 max-w-md leading-relaxed">
                Professional AI-powered website generation for developers who demand excellence. 
                Built with 20 years of industry expertise.
              </p>
              <div className="flex space-x-4">
                {[Github, Users, Star, MessageCircle].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-12 h-12 bg-muted/50 hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all duration-300"
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
              © 2024 ArcBuilder. All rights reserved. Crafted with ❤️ for developers worldwide.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-600 dark:text-green-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}