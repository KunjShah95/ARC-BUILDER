'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Twitter, 
  Github, 
  Linkedin, 
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart
} from 'lucide-react'

const productLinks = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Integrations', href: '/integrations' },
  { name: 'Templates', href: '/templates' },
  { name: 'API Reference', href: '/api-reference' }
]

const resourcesLinks = [
  { name: 'Documentation', href: '/documentation' },
  { name: 'Examples', href: '/examples' },
  { name: 'Community', href: '/community' },
  { name: 'Blog', href: '/blog' },
  { name: 'Changelog', href: '/changelog' }
]

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Support', href: '/support' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' }
]

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/arcbuilder',
    icon: Twitter
  },
  {
    name: 'GitHub',
    href: 'https://github.com/arcbuilder',
    icon: Github
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/arcbuilder',
    icon: Linkedin
  },
  {
    name: 'Email',
    href: 'mailto:hello@arcbuilder.com',
    icon: Mail
  }
]

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      {/* Newsletter Section */}
      <div className="border-b bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">
                Stay Updated with ArcBuilder
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Get the latest updates, feature announcements, and tips delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Logo */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  ArcBuilder
                </span>
              </div>
              
              <p className="text-muted-foreground mb-6 max-w-sm">
                Empowering creators to build beautiful websites with the power of AI. 
                No coding required, unlimited possibilities.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <a href="mailto:hello@arcbuilder.com" className="hover:text-primary transition-colors">
                    hello@arcbuilder.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Product Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Resources Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-3">
                {resourcesLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social & Theme Toggle */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-foreground mb-4">Connect</h4>
              
              {/* Social Links */}
              <div className="flex gap-3 mb-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span className="sr-only">{social.name}</span>
                    </motion.a>
                  )
                })}
              </div>

              {/* Theme Toggle */}
              <div className="space-y-3">
                <div className="text-sm text-muted-foreground">Theme</div>
                <ThemeToggle />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-1 text-sm text-muted-foreground"
            >
              <span>© {currentYear} ArcBuilder Inc. All rights reserved.</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 text-sm"
            >
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in San Francisco</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}