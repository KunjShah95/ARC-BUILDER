"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Code2, 
  Calendar,
  Users,
  Star,
  TrendingUp,
  Activity,
  Clock,
  Globe,
  Smartphone,
  Database,
  Zap,
  Target,
  Rocket,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit3,
  Trash2,
  Share,
  Download,
  Settings,
  BarChart3,
  PieChart,
  LineChart
} from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "completed"
  type: "web" | "mobile" | "api" | "database"
  lastUpdated: string
  collaborators: number
  progress: number
  views: number
  stars: number
}

const projects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform",
    description: "Modern shopping experience with AI recommendations",
    status: "active",
    type: "web",
    lastUpdated: "2 hours ago",
    collaborators: 5,
    progress: 75,
    views: 1240,
    stars: 23
  },
  {
    id: "2", 
    name: "Mobile Banking App",
    description: "Secure financial transactions with biometric auth",
    status: "active",
    type: "mobile",
    lastUpdated: "5 hours ago",
    collaborators: 8,
    progress: 60,
    views: 890,
    stars: 31
  },
  {
    id: "3",
    name: "Analytics Dashboard",
    description: "Real-time data visualization and reporting",
    status: "completed",
    type: "web",
    lastUpdated: "1 day ago",
    collaborators: 3,
    progress: 100,
    views: 2100,
    stars: 45
  },
  {
    id: "4",
    name: "Inventory API",
    description: "RESTful API for warehouse management",
    status: "paused",
    type: "api",
    lastUpdated: "3 days ago",
    collaborators: 2,
    progress: 40,
    views: 340,
    stars: 12
  }
]

const stats = [
  {
    label: "Total Projects",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Rocket,
    color: "blue"
  },
  {
    label: "Active Users",
    value: "12.5K",
    change: "+8%", 
    trend: "up",
    icon: Users,
    color: "green"
  },
  {
    label: "Revenue",
    value: "$45.2K",
    change: "+23%",
    trend: "up",
    icon: TrendingUp,
    color: "purple"
  },
  {
    label: "Success Rate",
    value: "94.8%",
    change: "+2%",
    trend: "up",
    icon: Target,
    color: "orange"
  }
]

export function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const getStatusIcon = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "paused":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />
      default:
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getTypeIcon = (type: Project["type"]) => {
    switch (type) {
      case "web":
        return <Globe className="w-4 h-4" />
      case "mobile":
        return <Smartphone className="w-4 h-4" />
      case "api":
        return <Code2 className="w-4 h-4" />
      case "database":
        return <Database className="w-4 h-4" />
      default:
        return <Code2 className="w-4 h-4" />
    }
  }

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || project.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <motion.div
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-lg text-foreground-secondary">
            Here's what's happening with your projects today.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </Button>
          <Button className="flex items-center space-x-2 bg-gradient-primary text-white shadow-lg hover:shadow-xl">
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  stat.color === "blue" && "bg-blue-500/10 text-blue-500",
                  stat.color === "green" && "bg-green-500/10 text-green-500", 
                  stat.color === "purple" && "bg-purple-500/10 text-purple-500",
                  stat.color === "orange" && "bg-orange-500/10 text-orange-500"
                )}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-sm font-medium px-2 py-1 rounded-full",
                  stat.trend === "up" ? "text-green-600 bg-green-100 dark:bg-green-900/20" : "text-red-600 bg-red-100 dark:bg-red-900/20"
                )}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-sm text-foreground-secondary">{stat.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Create Web App", icon: Globe, color: "blue" },
              { label: "Mobile Project", icon: Smartphone, color: "green" },
              { label: "API Service", icon: Code2, color: "purple" },
              { label: "Analytics", icon: BarChart3, color: "orange" }
            ].map((action, index) => (
              <motion.button
                key={action.label}
                className={cn(
                  "p-4 rounded-2xl border-2 border-dashed transition-all duration-300 hover:border-solid hover:shadow-lg hover:-translate-y-1",
                  action.color === "blue" && "border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20",
                  action.color === "green" && "border-green-300 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-950/20",
                  action.color === "purple" && "border-purple-300 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20",
                  action.color === "orange" && "border-orange-300 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <action.icon className={cn(
                  "w-8 h-8 mx-auto mb-2",
                  action.color === "blue" && "text-blue-500",
                  action.color === "green" && "text-green-500",
                  action.color === "purple" && "text-purple-500",
                  action.color === "orange" && "text-orange-500"
                )} />
                <p className="text-sm font-medium text-foreground">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Projects Section */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        {/* Projects Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-foreground">Your Projects</h2>
          
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-secondary" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Filter */}
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 bg-muted rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      {getTypeIcon(project.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-foreground-secondary capitalize">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground-secondary">Progress</span>
                    <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Project Stats */}
                <div className="flex items-center justify-between text-sm text-foreground-secondary mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.collaborators}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stars}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.lastUpdated}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-primary text-white">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: "Deployed", project: "E-commerce Platform", time: "2 hours ago", type: "success" },
              { action: "Updated", project: "Mobile Banking App", time: "5 hours ago", type: "info" },
              { action: "Completed", project: "Analytics Dashboard", time: "1 day ago", type: "success" },
              { action: "Paused", project: "Inventory API", time: "3 days ago", type: "warning" }
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  activity.type === "success" && "bg-green-500",
                  activity.type === "info" && "bg-blue-500",
                  activity.type === "warning" && "bg-yellow-500"
                )} />
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.action}</span> {activity.project}
                  </p>
                </div>
                <span className="text-sm text-foreground-secondary">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  )
}