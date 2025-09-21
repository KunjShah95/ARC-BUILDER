"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Code2,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Globe,
  Heart,
  ArrowRight,
  Star,
  Award,
  Shield,
  Zap,
  Users,
  BookOpen,
  Headphones,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "#features" },
      { name: "Pricing", href: "#pricing" },
      { name: "Templates", href: "/templates" },
      { name: "Integrations", href: "/integrations" },
      { name: "API", href: "/api" },
      { name: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Status", href: "/status" },
      { name: "Security", href: "/security" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Enterprise", href: "/enterprise" },
      { name: "Agencies", href: "/agencies" },
      { name: "Startups", href: "/startups" },
      { name: "E-commerce", href: "/ecommerce" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Landing Pages", href: "/landing" },
    ],
  },
]

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Email", href: "mailto:hello@arcbuilder.ai", icon: Mail },
]

const trustIndicators = [
  { icon: Shield, text: "SOC 2 Compliant", color: "text-success" },
  { icon: Award, text: "ISO 27001 Certified", color: "text-primary" },
  { icon: Users, text: "GDPR Ready", color: "text-accent" },
  { icon: Zap, text: "99.9% Uptime", color: "text-warning" },
]

export function PremiumFooter() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-background-secondary border-t border-border-secondary">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-10 dark:opacity-5" />
        <motion.div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--accent)) 0%, transparent 50%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container-custom">
        {/* Newsletter Section */}
        <motion.div
          className="py-16 border-b border-border-secondary"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 glass glass-strong px-6 py-3">
              <Star className="w-4 h-4 mr-2" />
              <span className="font-semibold">Stay Updated</span>
            </Badge>
            <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
              Get the latest updates and{" "}
              <span className="text-gradient">premium resources</span>
            </h3>
            <p className="text-xl text-foreground-secondary mb-10 max-w-2xl mx-auto">
              Join 25,000+ developers who receive our weekly newsletter with tips, 
              tutorials, and exclusive access to new features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <div className="relative flex-1 w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-2xl glass glass-strong border-2 border-border-secondary focus:border-primary/50 text-base placeholder:text-foreground-tertiary transition-all duration-300 outline-none"
                />
              </div>
              <Button size="lg" className="btn-primary px-8 py-4 rounded-2xl font-bold whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-foreground-tertiary">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                <span>No spam, ever</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span>Weekly insights</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-xl">
                  <Code2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-black text-gradient">
                    ArcBuilder
                  </span>
                  <div className="text-sm text-foreground-tertiary font-medium tracking-wider uppercase">
                    Enterprise AI
                  </div>
                </div>
              </div>
              
              <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
                The world's most advanced AI website builder. Trusted by 50,000+ developers 
                and Fortune 500 companies to ship production-ready applications in seconds.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {trustIndicators.map((indicator, index) => (
                  <motion.div
                    key={indicator.text}
                    className="flex items-center gap-3 glass glass-strong p-4 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-current/20 to-current/10 flex items-center justify-center ${indicator.color}`}>
                      <indicator.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-foreground-secondary">
                      {indicator.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-foreground-secondary">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>San Francisco, CA & Remote</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>hello@arcbuilder.ai</span>
                </div>
              </div>
            </motion.div>

            {/* Footer Links */}
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1, duration: 0.8 }}
              >
                <h4 className="text-lg font-bold text-foreground mb-6">
                  {section.title}
                </h4>
                <ul className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (sectionIndex * 0.1) + (linkIndex * 0.05), duration: 0.5 }}
                    >
                      <a
                        href={link.href}
                        className="text-foreground-secondary hover:text-primary transition-colors duration-300 flex items-center group"
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="py-8 border-t border-border-secondary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-foreground-secondary">
              <div className="flex items-center gap-2">
                <span>© 2025 ArcBuilder. All rights reserved.</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                <span>in San Francisco</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 glass glass-strong rounded-xl flex items-center justify-center text-foreground-secondary hover:text-primary hover:scale-110 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}