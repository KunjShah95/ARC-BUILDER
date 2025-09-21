"use client"

import { useState, useEffect, memo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Code2,
  Github,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Zap,
  Shield,
  Layers,
  Database,
  Rocket,
  Target,
  CheckCircle,
  Users,
  Star,
  Play,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ParticleSystem } from "@/components/particle-system"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
}

const glowEffect = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(34, 197, 94, 0.3)",
      "0 0 40px rgba(34, 197, 94, 0.5)",
      "0 0 20px rgba(34, 197, 94, 0.3)",
    ],
    transition: { duration: 2, repeat: Number.POSITIVE_INFINITY },
  },
}

// Memoized components for better performance
const FeatureCard = memo(({ feature, index }: { feature: any; index: number }) => (
  <motion.div variants={fadeInUp}>
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
            {feature.features.map((feat: string, i: number) => (
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
))

FeatureCard.displayName = "FeatureCard"

const TestimonialCard = memo(({ testimonial, index }: { testimonial: any; index: number }) => (
  <motion.div
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
))

TestimonialCard.displayName = "TestimonialCard"

function ArcBuilderLanding() {
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
              { name: "Generator", href: "/generator" },
              { name: "Dashboard", href: "/dashboard" },
              { name: "Integrations", href: "/integrations" },
              { name: "Pricing", href: "#pricing" },
            ].map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors relative group py-2"
                >
                  {item.name}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Github className="w-4 h-4 mr-2" />
              Star on GitHub
            </Button>
            <ThemeToggle />
            <Link href="/generator">
              <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

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
            {[
              { name: "Features", href: "#features" },
              { name: "Generator", href: "/generator" },
              { name: "Dashboard", href: "/dashboard" },
              { name: "Integrations", href: "/integrations" },
              { name: "Pricing", href: "#pricing" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.header>

      {/* Hero Section */}
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
              Transform your ideas into production-ready React applications with AI-powered scaffolding.
              <br />
              <span className="text-primary font-medium">From brief to deployment in minutes.</span>
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link href="/generator">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-accent hover:shadow-2xl"
                >
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent hover:bg-muted/50">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
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
              <FeatureCard key={index} feature={feature} index={index} />
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
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 bg-gradient-to-b from-background to-muted/20">
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
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Plan</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Start free and scale as you grow. No hidden fees, no surprises. Cancel anytime.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                description: "Perfect for trying out ArcBuilder",
                features: [
                  "5 website generations per month",
                  "Basic templates",
                  "Community support",
                  "Standard integrations",
                  "Basic analytics",
                ],
                cta: "Get Started Free",
                popular: false,
                color: "from-gray-500 to-gray-600",
              },
              {
                name: "Pro",
                price: "$29",
                period: "per month",
                description: "For developers and small teams",
                features: [
                  "Unlimited website generations",
                  "Premium templates & components",
                  "Priority support",
                  "Advanced integrations",
                  "Custom domains",
                  "Team collaboration",
                  "Advanced analytics",
                  "API access",
                ],
                cta: "Start Pro Trial",
                popular: true,
                color: "from-primary to-accent",
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "contact us",
                description: "For large teams and organizations",
                features: [
                  "Everything in Pro",
                  "White-label solution",
                  "Dedicated support",
                  "Custom integrations",
                  "SSO & advanced security",
                  "On-premise deployment",
                  "Custom SLA",
                  "Training & onboarding",
                ],
                cta: "Contact Sales",
                popular: false,
                color: "from-purple-500 to-pink-500",
              },
            ].map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={`h-full relative overflow-hidden transition-all duration-500 ${
                      plan.popular
                        ? "border-2 border-primary/50 shadow-2xl shadow-primary/10 scale-105"
                        : "hover:shadow-xl"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-accent text-white text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className={`pt-8 ${plan.popular ? "pt-12" : ""}`}>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                        <p className="text-muted-foreground mb-6">{plan.description}</p>
                        <div className="mb-6">
                          <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-muted-foreground ml-2">/{plan.period}</span>
                    </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <ul className="space-y-4">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-gradient-to-r from-primary to-accent hover:shadow-lg"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        {plan.cta}
                      </Button>
                  </CardContent>
                </Card>
              </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
                },
                {
                  question: "What happens to my generated websites?",
                  answer: "Your websites remain yours forever. You can download, modify, and deploy them anywhere.",
                },
                {
                  question: "Do you offer refunds?",
                  answer: "We offer a 30-day money-back guarantee for all paid plans. No questions asked.",
                },
                {
                  question: "Is there a free trial?",
                  answer: "Yes! Start with our free plan and upgrade when you're ready. No credit card required.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-left"
                >
                  <h4 className="font-semibold text-foreground mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
          </motion.div>
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
                links: [
                  { name: "Features", href: "#features" },
                  { name: "Generator", href: "/generator" },
                  { name: "Dashboard", href: "/dashboard" },
                  { name: "Integrations", href: "/integrations" },
                  { name: "Pricing", href: "#pricing" },
                ],
              },
              {
                title: "Resources",
                links: [
                  { name: "Documentation", href: "#" },
                  { name: "Examples", href: "#" },
                  { name: "Community", href: "#" },
                  { name: "Blog", href: "#" },
                  { name: "Changelog", href: "#" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "About", href: "#" },
                  { name: "Careers", href: "#" },
                  { name: "Support", href: "#" },
                  { name: "Privacy", href: "#" },
                  { name: "Terms", href: "#" },
                ],
              },
            ].map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-foreground mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <Link href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                        {link.name}
                      </Link>
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

export default memo(ArcBuilderLanding)
