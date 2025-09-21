"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search, Code2, User, Settings, LogOut, Bell, ChevronDown, Sparkles, Zap, Users, Star, Command } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItem {
  label: string
  href: string
  icon?: any
  badge?: string
  description?: string
}

const navigationItems: NavItem[] = [
  { label: "Builder", href: "/builder", icon: Code2, description: "Create amazing apps" },
  { label: "Templates", href: "/templates", icon: Sparkles, badge: "New", description: "Pre-built solutions" },
  { label: "Dashboard", href: "/dashboard", icon: Settings, description: "Manage projects" },
  { label: "Community", href: "/community", icon: Users, description: "Connect & learn" },
  { label: "Pricing", href: "/pricing", icon: Star, description: "Simple pricing" },
]

const quickActions = [
  { label: "New Project", shortcut: "⌘N", action: "create" },
  { label: "Search Templates", shortcut: "⌘K", action: "search" },
  { label: "View Dashboard", shortcut: "⌘D", action: "dashboard" },
]

export function PremiumNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Code2 className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 blur-md"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span className="font-bold text-xl text-foreground">ARC Builder</span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className="relative group h-auto px-4 py-2 hover:bg-accent/50"
                    >
                      <div className="flex items-center space-x-2">
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-gradient-primary text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      
                      {/* Hover Tooltip */}
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 pointer-events-none z-50"
                        initial={{ opacity: 0, y: -10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border text-sm whitespace-nowrap">
                          {item.description}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-popover border-l border-t rotate-45" />
                        </div>
                      </motion.div>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-foreground-secondary hover:text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <div className="flex items-center space-x-1 ml-4">
                  <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">⌘</kbd>
                  <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">K</kbd>
                </div>
              </motion.button>

              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-background" />
              </Button>

              <ThemeToggle />

              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isUserMenuOpen && "rotate-180"
                  )} />
                </Button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      className="absolute right-0 top-full mt-2 w-64 bg-popover text-popover-foreground rounded-xl shadow-xl border z-50"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="p-4 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-foreground-secondary">john@example.com</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        <Button variant="ghost" className="w-full justify-start">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link href={item.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-3"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          {item.icon && <item.icon className="w-5 h-5" />}
                          <div className="flex-1 text-left">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{item.label}</span>
                              {item.badge && (
                                <span className="px-2 py-0.5 bg-gradient-primary text-white text-xs rounded-full">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-foreground-secondary">{item.description}</p>
                          </div>
                        </div>
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Command Palette / Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)} />
            
            <motion.div
              className="relative w-full max-w-2xl bg-popover text-popover-foreground rounded-2xl shadow-2xl border overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center px-4 py-3 border-b">
                <Search className="w-5 h-5 text-foreground-secondary mr-3" />
                <input
                  type="text"
                  placeholder="Search for templates, features, or commands..."
                  className="flex-1 bg-transparent border-none outline-none text-lg placeholder-foreground-secondary"
                  autoFocus
                />
                <div className="flex items-center space-x-1 ml-4">
                  <kbd className="px-2 py-1 bg-muted border rounded text-sm">ESC</kbd>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-foreground-secondary font-medium">Quick Actions</div>
                  {quickActions.map((action, index) => (
                    <Button
                      key={action.action}
                      variant="ghost"
                      className="w-full justify-between h-auto py-3 px-3"
                    >
                      <div className="flex items-center space-x-3">
                        <Command className="w-4 h-4" />
                        <span>{action.label}</span>
                      </div>
                      <kbd className="px-2 py-1 bg-muted border rounded text-xs">{action.shortcut}</kbd>
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}