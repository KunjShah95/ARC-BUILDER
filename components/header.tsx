'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../components/ui/navigation-menu'
import { 
  Menu, 
  X, 
  ChevronDown,
  Zap,
  FileText,
  Users,
  Building,
  ArrowRight,
  Play,
  BookOpen,
  MessageSquare,
  Briefcase,
  HelpCircle,
  Shield,
  Scale
} from 'lucide-react'
import { cn } from '@/lib/utils'

const productItems = [
  {
    title: 'Features',
    href: '/features',
    description: 'Discover powerful AI-driven website building capabilities',
    icon: Zap
  },
  {
    title: 'Pricing',
    href: '/pricing',
    description: 'Simple, transparent pricing for every need',
    icon: FileText
  },
  {
    title: 'Integrations',
    href: '/integrations',
    description: 'Connect with your favorite tools and services',
    icon: Users
  },
  {
    title: 'Templates',
    href: '/templates',
    description: 'Professional templates for every industry',
    icon: Building
  },
  {
    title: 'API Reference',
    href: '/api-reference',
    description: 'Complete API documentation and SDKs',
    icon: FileText
  }
]

const resourcesItems = [
  {
    title: 'Documentation',
    href: '/documentation',
    description: 'Comprehensive guides and tutorials',
    icon: BookOpen
  },
  {
    title: 'Examples',
    href: '/examples',
    description: 'Real-world examples and demos',
    icon: Play
  },
  {
    title: 'Community',
    href: '/community',
    description: 'Connect with other builders',
    icon: MessageSquare
  },
  {
    title: 'Blog',
    href: '/blog',
    description: 'Latest updates and insights',
    icon: FileText
  },
  {
    title: 'Changelog',
    href: '/changelog',
    description: 'Product updates and improvements',
    icon: FileText
  }
]

const companyItems = [
  {
    title: 'About',
    href: '/about',
    description: 'Learn about our mission and team',
    icon: Building
  },
  {
    title: 'Careers',
    href: '/careers',
    description: 'Join our growing team',
    icon: Briefcase
  },
  {
    title: 'Support',
    href: '/support',
    description: 'Get help when you need it',
    icon: HelpCircle
  },
  {
    title: 'Privacy',
    href: '/privacy',
    description: 'How we protect your data',
    icon: Shield
  },
  {
    title: 'Terms',
    href: '/terms',
    description: 'Terms of service and policies',
    icon: Scale
  }
]

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

interface DropdownItemProps {
  item: {
    title: string
    href: string
    description: string
    icon: any
  }
  onClick?: () => void
}

const DropdownItem: React.FC<DropdownItemProps> = ({ item, onClick }) => {
  const Icon = item.icon
  
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="group block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 bg-primary/10 rounded-md group-hover:bg-primary/20 transition-colors">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="text-sm font-medium leading-none">{item.title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground mt-1">
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  )
}

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
      isScrolled 
        ? "bg-background/80 backdrop-blur-lg border-b shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                ArcBuilder
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Product Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Product
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="grid gap-2">
                        {productItems.map((item) => (
                          <DropdownItem key={item.href} item={item} />
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="grid gap-2">
                        {resourcesItems.map((item) => (
                          <DropdownItem key={item.href} item={item} />
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <div className="grid gap-2">
                        {companyItems.map((item) => (
                          <DropdownItem key={item.href} item={item} />
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <NavLink href="/auth">Sign In</NavLink>
            <Button asChild>
              <Link href="/chat">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background border-t"
          >
            <div className="px-4 pt-2 pb-6 space-y-6">
              {/* Product Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Product
                </h3>
                <div className="space-y-1">
                  {productItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Resources Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Resources
                </h3>
                <div className="space-y-1">
                  {resourcesItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Company Section */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Company
                </h3>
                <div className="space-y-1">
                  {companyItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                      >
                        <Icon className="w-4 h-4 text-primary" />
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-muted-foreground">{item.description}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="pt-4 border-t">
                <div className="space-y-3">
                  <Link
                    href="/auth"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-center border border-border rounded-md hover:bg-muted transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/chat"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}