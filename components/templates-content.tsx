"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Search,
  Filter,
  Star,
  Eye,
  Download,
  Code2,
  ExternalLink,
  Heart,
  Play,
  ShoppingCart,
  Briefcase,
  BookOpen,
  Camera,
  Users,
  Utensils,
  Plane,
  Music,
  Gamepad2,
  Building,
  Smartphone,
  Globe,
  Database,
  Zap,
  TrendingUp,
  Award,
  Clock,
  CheckCircle
} from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

interface Template {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  preview: string
  rating: number
  downloads: number
  views: number
  price: "free" | "premium"
  featured: boolean
  new: boolean
  author: string
  lastUpdated: string
}

const templates: Template[] = [
  {
    id: "1",
    name: "Modern E-commerce Store",
    description: "Full-featured online store with cart, payments, and inventory management",
    category: "E-commerce",
    tags: ["React", "Next.js", "Stripe", "Tailwind"],
    preview: "/modern-ecommerce-dashboard.png",
    rating: 4.9,
    downloads: 12400,
    views: 45200,
    price: "premium",
    featured: true,
    new: false,
    author: "Sarah Chen",
    lastUpdated: "2024-01-15"
  },
  {
    id: "2", 
    name: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics dashboard with charts, metrics, and user management",
    category: "Business",
    tags: ["Vue.js", "Chart.js", "Firebase", "Material"],
    preview: "/saas-analytics-dashboard.png",
    rating: 4.8,
    downloads: 8900,
    views: 32100,
    price: "premium",
    featured: true,
    new: true,
    author: "Alex Rodriguez",
    lastUpdated: "2024-01-20"
  },
  {
    id: "3",
    name: "Creative Portfolio",
    description: "Stunning portfolio template for designers and creatives",
    category: "Portfolio",
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    preview: "/placeholder.jpg",
    rating: 4.7,
    downloads: 15600,
    views: 28900,
    price: "free",
    featured: false,
    new: false,
    author: "Maya Patel",
    lastUpdated: "2024-01-10"
  },
  {
    id: "4",
    name: "Mobile Banking App",
    description: "Secure mobile banking interface with biometric authentication",
    category: "Mobile",
    tags: ["React Native", "TypeScript", "Redux", "Expo"],
    preview: "/social-media-mobile-app.jpg",
    rating: 4.9,
    downloads: 6700,
    views: 19800,
    price: "premium",
    featured: true,
    new: true,
    author: "James Wilson",
    lastUpdated: "2024-01-22"
  },
  {
    id: "5",
    name: "Restaurant Landing Page",
    description: "Beautiful restaurant website with menu, reservations, and online ordering",
    category: "Business",
    tags: ["React", "Framer Motion", "Tailwind", "Headless CMS"],
    preview: "/placeholder.jpg",
    rating: 4.6,
    downloads: 9200,
    views: 22400,
    price: "free",
    featured: false,
    new: false,
    author: "Lisa Chang",
    lastUpdated: "2024-01-08"
  },
  {
    id: "6",
    name: "Learning Management System",
    description: "Complete LMS with courses, progress tracking, and assessments",
    category: "Education",
    tags: ["Angular", "Node.js", "MongoDB", "Socket.io"],
    preview: "/placeholder.jpg",
    rating: 4.8,
    downloads: 5400,
    views: 16700,
    price: "premium",
    featured: false,
    new: true,
    author: "David Kim",
    lastUpdated: "2024-01-18"
  }
]

const categories = [
  { name: "All", icon: Globe, count: templates.length },
  { name: "E-commerce", icon: ShoppingCart, count: templates.filter(t => t.category === "E-commerce").length },
  { name: "Business", icon: Briefcase, count: templates.filter(t => t.category === "Business").length },
  { name: "Portfolio", icon: Camera, count: templates.filter(t => t.category === "Portfolio").length },
  { name: "Mobile", icon: Smartphone, count: templates.filter(t => t.category === "Mobile").length },
  { name: "Education", icon: BookOpen, count: templates.filter(t => t.category === "Education").length },
]

const filterOptions = [
  { name: "All", value: "all" },
  { name: "Free", value: "free" },
  { name: "Premium", value: "premium" },
  { name: "Featured", value: "featured" },
  { name: "New", value: "new" },
]

export function TemplatesContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    )
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
    
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "free" && template.price === "free") ||
                         (selectedFilter === "premium" && template.price === "premium") ||
                         (selectedFilter === "featured" && template.featured) ||
                         (selectedFilter === "new" && template.new)
    
    return matchesSearch && matchesCategory && matchesFilter
  })

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "downloads":
        return b.downloads - a.downloads
      case "newest":
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      case "featured":
        return Number(b.featured) - Number(a.featured)
      default:
        return 0
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
          Premium Templates
        </h1>
        <p className="text-lg lg:text-xl text-foreground-secondary max-w-3xl mx-auto">
          Kickstart your next project with professionally designed templates. 
          From e-commerce stores to SaaS dashboards, we've got you covered.
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm text-foreground-secondary">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Production Ready</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Modern Stack</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-blue-500" />
            <span>Premium Quality</span>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Search Bar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-secondary" />
            <input
              type="text"
              placeholder="Search templates, technologies, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-muted rounded-2xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-lg"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-muted rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105",
                selectedCategory === category.name
                  ? "bg-gradient-primary text-white shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-foreground-secondary hover:text-foreground"
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="w-4 h-4" />
              <span className="font-medium">{category.name}</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Results Count */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <p className="text-foreground-secondary">
          Showing <span className="font-semibold text-foreground">{sortedTemplates.length}</span> template{sortedTemplates.length !== 1 ? 's' : ''}
          {selectedCategory !== "All" && (
            <span> in <span className="font-semibold text-foreground">{selectedCategory}</span></span>
          )}
        </p>
      </motion.div>

      {/* Templates Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sortedTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              layout
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                {/* Template Preview */}
                <div className="relative aspect-video bg-gradient-to-br from-muted to-muted-secondary overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <Button size="sm" variant="secondary" className="backdrop-blur-sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" className="bg-gradient-primary text-white">
                      <Play className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    {template.featured && (
                      <Badge className="bg-gradient-primary text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    {template.new && (
                      <Badge variant="secondary" className="bg-green-500 text-white">
                        New
                      </Badge>
                    )}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge 
                      className={cn(
                        template.price === "free" 
                          ? "bg-green-500 text-white" 
                          : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      )}
                    >
                      {template.price === "free" ? "Free" : "Premium"}
                    </Badge>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(template.id)}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <Heart className={cn(
                      "w-5 h-5 transition-colors",
                      favorites.includes(template.id) 
                        ? "text-red-500 fill-red-500" 
                        : "text-gray-600"
                    )} />
                  </button>
                </div>

                {/* Template Info */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {template.name}
                    </h3>
                    <p className="text-foreground-secondary mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {template.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {template.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.tags.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-foreground-secondary">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{template.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{template.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{template.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Author and Date */}
                  <div className="flex items-center justify-between text-sm text-foreground-secondary">
                    <span>by {template.author}</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(template.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 pt-2">
                    <Button variant="outline" className="flex-1">
                      <Code2 className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                    <Button className="flex-1 bg-gradient-primary text-white">
                      <Download className="w-4 h-4 mr-2" />
                      {template.price === "free" ? "Download" : "Get Template"}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div
        className="mt-16 text-center glass p-8 rounded-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Can't find what you're looking for?
        </h3>
        <p className="text-foreground-secondary mb-6 max-w-2xl mx-auto">
          Our team can create custom templates tailored to your specific needs. 
          Get a fully customized solution that perfectly matches your vision.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button className="bg-gradient-primary text-white shadow-lg hover:shadow-xl">
            <ExternalLink className="w-4 h-4 mr-2" />
            Request Custom Template
          </Button>
          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Join Community
          </Button>
        </div>
      </motion.div>
    </div>
  )
}