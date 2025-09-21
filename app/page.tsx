"use client";

import { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Code2, 
  Zap, 
  Sparkles, 
  Rocket, 
  Github, 
  Database, 
  Cloud,
  Monitor,
  Smartphone,
  Palette,
  Users,
  Star,
  CheckCircle2,
  Play,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particles-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const CodeAnimation = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const codeLines = [
    "const website = await ArcBuilder.generate({",
    '  brief: "Modern e-commerce platform",',
    '  style: "glassmorphism",',
    '  framework: "Next.js 14",',
    '  features: ["auth", "payments", "analytics"]',
    "});",
    "",
    "// ✨ Production-ready in seconds",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % codeLines.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 font-mono text-sm overflow-hidden max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-2">ArcBuilder Generator</span>
      </div>
      {codeLines.map((line, index) => (
        <div
          key={index}
          className={`${
            index <= currentLine ? "text-blue-300" : "text-gray-600"
          } transition-colors duration-300`}
        >
          <span className="text-gray-500 mr-2">{index + 1}</span>
          {line}
          {index === currentLine && (
            <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <Card className="bento-card group cursor-pointer">
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
  </Card>
);

const IntegrationIcon = ({ icon: Icon, name, connected }: any) => (
  <div
    className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
      connected
        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
        : "border-gray-200 dark:border-gray-700 hover:border-blue-400"
    }`}
  >
    <Icon className={`w-8 h-8 mx-auto mb-2 ${connected ? "text-green-600" : "text-gray-600"}`} />
    <p className="text-sm text-center font-medium">{name}</p>
    {connected && (
      <div className="flex items-center justify-center mt-2">
        <CheckCircle2 className="w-4 h-4 text-green-600" />
      </div>
    )}
  </div>
);

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass backdrop-blur-md border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">ArcBuilder</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('demo')} 
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection('integrations')} 
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Integrations
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                Pricing
              </button>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button size="sm">
                Get Started
              </Button>
              <button
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <div className="flex flex-col gap-4 pt-4">
                <button onClick={() => scrollToSection('features')} className="text-left">Features</button>
                <button onClick={() => scrollToSection('demo')} className="text-left">Demo</button>
                <button onClick={() => scrollToSection('integrations')} className="text-left">Integrations</button>
                <button onClick={() => scrollToSection('pricing')} className="text-left">Pricing</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10" />
        <ParticleSystem />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Badge className="mb-6 px-4 py-2" variant="secondary">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Website Generation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Ideas Into
              <br />
              <span className="gradient-text">Production Apps</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              ArcBuilder uses sophisticated AI to generate enterprise-grade React applications 
              from simple briefs. FAANG-level code quality, zero configuration required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-4 group">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>4.9/5 Developer Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10K+ Apps Generated</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Sub-second Generation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="demo" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              <Code2 className="w-4 h-4 mr-2" />
              Live Demo
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See ArcBuilder In Action
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch as your ideas transform into production-ready code in real-time
            </p>
          </div>

          <CodeAnimation />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              <Sparkles className="w-4 h-4 mr-2" />
              Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale modern web applications
            </p>
          </div>

          <div className="bento-grid">
            <FeatureCard
              icon={Rocket}
              title="Lightning Fast Generation"
              description="Generate complete React applications in seconds with our advanced AI engine. No more waiting hours for boilerplate setup."
              delay={0}
            />
            <FeatureCard
              icon={Monitor}
              title="Responsive Design System"
              description="Every generated app includes a complete design system with dark mode, mobile-first responsive layouts, and accessibility features."
              delay={0.1}
            />
            <FeatureCard
              icon={Database}
              title="Full-Stack Integration"
              description="Seamlessly integrate with databases, authentication providers, and third-party APIs. Production-ready from day one."
              delay={0.2}
            />
            <FeatureCard
              icon={Cloud}
              title="Deploy Anywhere"
              description="Optimized for Vercel, Netlify, AWS, and other modern hosting platforms. One-click deployment included."
              delay={0.3}
            />
            <FeatureCard
              icon={Palette}
              title="Customizable Themes"
              description="Professional design systems with customizable color schemes, typography, and component libraries."
              delay={0.4}
            />
            <FeatureCard
              icon={Smartphone}
              title="Mobile-First Approach"
              description="Every generated app is optimized for mobile devices with touch-friendly interfaces and progressive web app features."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="outline">
              <Code2 className="w-4 h-4 mr-2" />
              Integrations
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Connect Everything
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Pre-built integrations with the tools you already love
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            <IntegrationIcon icon={Github} name="GitHub" connected={true} />
            <IntegrationIcon icon={Database} name="Supabase" connected={true} />
            <IntegrationIcon icon={Cloud} name="Vercel" connected={true} />
            <IntegrationIcon icon={Code2} name="TypeScript" connected={true} />
            <IntegrationIcon icon={Palette} name="Tailwind" connected={true} />
            <IntegrationIcon icon={Zap} name="Next.js" connected={true} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already building faster with ArcBuilder
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4 group">
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">ArcBuilder</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Support</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Documentation</a>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 ArcBuilder. All rights reserved. Built with Next.js 14 and ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
