"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import {
  FolderOpen,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Code2,
  Download,
  Github,
  Trash2,
  Calendar,
  Globe,
  Zap,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react"

const mockProjects = [
  {
    id: "1",
    name: "TaskFlow Landing Page",
    description: "Modern SaaS landing page with pricing and testimonials",
    type: "Landing Page",
    status: "deployed",
    createdAt: "2024-01-15",
    lastModified: "2024-01-20",
    deployUrl: "https://taskflow-landing.vercel.app",
    githubUrl: "https://github.com/user/taskflow-landing",
    framework: "Next.js",
    styling: "Tailwind CSS",
    components: "shadcn/ui",
    views: 1250,
    starred: true,
    thumbnail: "/modern-saas-landing-page.jpg",
  },
  {
    id: "2",
    name: "E-commerce Dashboard",
    description: "Admin dashboard for online store management",
    type: "Dashboard",
    status: "draft",
    createdAt: "2024-01-18",
    lastModified: "2024-01-22",
    deployUrl: null,
    githubUrl: "https://github.com/user/ecommerce-dashboard",
    framework: "Next.js",
    styling: "Tailwind CSS",
    components: "shadcn/ui",
    views: 0,
    starred: false,
    thumbnail: "/ecommerce-admin-dashboard.png",
  },
  {
    id: "3",
    name: "Portfolio Website",
    description: "Personal portfolio with project showcase",
    type: "Portfolio",
    status: "deployed",
    createdAt: "2024-01-10",
    lastModified: "2024-01-15",
    deployUrl: "https://john-portfolio.vercel.app",
    githubUrl: "https://github.com/user/portfolio",
    framework: "Next.js",
    styling: "Tailwind CSS",
    components: "shadcn/ui",
    views: 850,
    starred: true,
    thumbnail: "/modern-portfolio-website.png",
  },
  {
    id: "4",
    name: "Blog Platform",
    description: "Content management system with markdown support",
    type: "Blog",
    status: "deployed",
    createdAt: "2024-01-12",
    lastModified: "2024-01-18",
    deployUrl: "https://my-blog-platform.vercel.app",
    githubUrl: "https://github.com/user/blog-platform",
    framework: "Next.js",
    styling: "Tailwind CSS",
    components: "shadcn/ui",
    views: 2100,
    starred: false,
    thumbnail: "/modern-blog-platform.png",
  },
  {
    id: "5",
    name: "Restaurant Website",
    description: "Restaurant website with menu and reservations",
    type: "Business",
    status: "deployed",
    createdAt: "2024-01-08",
    lastModified: "2024-01-14",
    deployUrl: "https://bella-restaurant.vercel.app",
    githubUrl: "https://github.com/user/restaurant-site",
    framework: "Next.js",
    styling: "Tailwind CSS",
    components: "shadcn/ui",
    views: 650,
    starred: false,
    thumbnail: "/elegant-restaurant-website.png",
  },
  {
    id: "6",
    name: "Crypto Tracker",
    description: "Cryptocurrency price tracking dashboard",
    type: "Dashboard",
    status: "deployed",
    createdAt: "2024-01-20",
    lastModified: "2024-01-25",
    deployUrl: "https://crypto-tracker-app.vercel.app",
    githubUrl: "https://github.com/user/crypto-tracker",
    framework: "Next.js",
    styling: "Tailwind CSS",
    components: "shadcn/ui",
    views: 1800,
    starred: true,
    thumbnail: "/cryptocurrency-dashboard.png",
  },
]

const stats = {
  totalProjects: mockProjects.length,
  deployedProjects: mockProjects.filter((p) => p.status === "deployed").length,
  totalViews: mockProjects.reduce((sum, p) => sum + p.views, 0),
  starredProjects: mockProjects.filter((p) => p.starred).length,
}

export default function DashboardPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [projects, setProjects] = useState(mockProjects)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simple authentication check
  useEffect(() => {
    const checkAuth = () => {
      // For demo purposes, we'll allow access without authentication
      // In production, you would check for a valid session
      setIsAuthenticated(true)
    }
    checkAuth()
  }, [])

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "deployed" && project.status === "deployed") ||
      (selectedFilter === "draft" && project.status === "draft") ||
      (selectedFilter === "starred" && project.starred)

    return matchesSearch && matchesFilter
  })

  const toggleStar = (projectId: string) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, starred: !p.starred } : p)))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FolderOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Projects</h1>
                <p className="text-gray-600 dark:text-gray-300">Manage your generated websites</p>
              </div>
            </div>

            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => router.push('/generator')}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Projects</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProjects}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Deployed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.deployedProjects}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Starred</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.starredProjects}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                      <Filter className="w-4 h-4" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedFilter("all")}>All Projects</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("deployed")}>Deployed</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("draft")}>Drafts</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFilter("starred")}>Starred</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Projects Grid/List */}
        <AnimatePresence mode="wait">
          {viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative">
                      <img
                        src={project.thumbnail || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => toggleStar(project.id)}
                        >
                          <Star className={`w-4 h-4 ${project.starred ? "fill-yellow-400 text-yellow-400" : ""}`} />
                        </Button>
                        <Badge variant={project.status === "deployed" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">{project.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {project.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(project.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {project.views} views
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {project.deployUrl && (
                            <Button size="sm" variant="outline" asChild>
                              <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                                <Eye className="w-3 h-3 mr-1" />
                                View
                              </a>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-3 h-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Code2 className="w-4 h-4 mr-2" />
                              Edit Code
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Zap className="w-4 h-4 mr-2" />
                              Redeploy
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <img
                          src={project.thumbnail || "/placeholder.svg"}
                          alt={project.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                                {project.name}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <Badge variant="outline">{project.type}</Badge>
                                <Badge variant={project.status === "deployed" ? "default" : "secondary"}>
                                  {project.status}
                                </Badge>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(project.createdAt).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Activity className="w-3 h-3" />
                                  {project.views} views
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="ghost" onClick={() => toggleStar(project.id)}>
                                <Star
                                  className={`w-4 h-4 ${project.starred ? "fill-yellow-400 text-yellow-400" : ""}`}
                                />
                              </Button>

                              {project.deployUrl && (
                                <Button size="sm" variant="outline" asChild>
                                  <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </a>
                                </Button>
                              )}

                              <Button size="sm" variant="outline" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-3 h-3 mr-1" />
                                  Code
                                </a>
                              </Button>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="ghost">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Code2 className="w-4 h-4 mr-2" />
                                    Edit Code
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Zap className="w-4 h-4 mr-2" />
                                    Redeploy
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? "Try adjusting your search terms" : "Create your first project to get started"}
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => router.push('/generator')}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
