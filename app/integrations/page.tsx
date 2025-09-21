"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  Database,
  Zap,
  Settings,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Key,
  Shield,
  Webhook,
} from "lucide-react"

const integrations = [
  {
    id: "github",
    name: "GitHub",
    description: "Sync your generated websites to GitHub repositories",
    icon: Github,
    status: "connected",
    features: ["Auto-commit generated code", "Create new repositories", "Branch management", "Pull request automation"],
    config: {
      username: "your-username",
      defaultBranch: "main",
      autoCommit: true,
      createPR: false,
    },
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Add authentication and database to your websites",
    icon: Database,
    status: "disconnected",
    features: ["User authentication", "Real-time database", "Storage buckets", "Edge functions"],
    config: {
      projectUrl: "",
      anonKey: "",
      serviceKey: "",
      enableAuth: true,
      enableRLS: true,
    },
  },
  {
    id: "vercel",
    name: "Vercel",
    description: "Deploy your websites instantly to Vercel",
    icon: Zap,
    status: "connected",
    features: ["Instant deployments", "Custom domains", "Analytics", "Edge functions"],
    config: {
      teamId: "personal",
      autoDeployment: true,
      productionBranch: "main",
      enableAnalytics: true,
    },
  },
]

export default function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState("github")
  const [configs, setConfigs] = useState(
    integrations.reduce(
      (acc, integration) => ({
        ...acc,
        [integration.id]: integration.config,
      }),
      {},
    ),
  )

  const updateConfig = (integrationId: string, key: string, value: any) => {
    setConfigs((prev) => ({
      ...prev,
      [integrationId]: {
        ...prev[integrationId],
        [key]: value,
      },
    }))
  }

  const connectIntegration = async (integrationId: string) => {
    // Simulate connection process
    console.log(`Connecting to ${integrationId}...`)

    if (integrationId === "github") {
      // Redirect to GitHub OAuth
      window.open("https://github.com/login/oauth/authorize?client_id=your_client_id&scope=repo", "_blank")
    } else if (integrationId === "supabase") {
      // Validate Supabase credentials
      const config = configs[integrationId]
      if (!config.projectUrl || !config.anonKey) {
        alert("Please provide Supabase project URL and anon key")
        return
      }
    }
  }

  const selectedIntegrationData = integrations.find((i) => i.id === selectedIntegration)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Integrations</h1>
              <p className="text-gray-600 dark:text-gray-300">Connect your favorite tools and services</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Integration List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Available Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {integrations.map((integration) => (
                  <motion.button
                    key={integration.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedIntegration(integration.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedIntegration === integration.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <integration.icon className="w-5 h-5" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{integration.name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant={integration.status === "connected" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {integration.status === "connected" ? (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            ) : (
                              <AlertCircle className="w-3 h-3 mr-1" />
                            )}
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Integration Details */}
          <div className="lg:col-span-3">
            {selectedIntegrationData && (
              <motion.div
                key={selectedIntegration}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Integration Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <selectedIntegrationData.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            {selectedIntegrationData.name}
                            <Badge variant={selectedIntegrationData.status === "connected" ? "default" : "secondary"}>
                              {selectedIntegrationData.status === "connected" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <AlertCircle className="w-3 h-3 mr-1" />
                              )}
                              {selectedIntegrationData.status}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{selectedIntegrationData.description}</CardDescription>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {selectedIntegrationData.status === "connected" ? (
                          <Button variant="outline">Disconnect</Button>
                        ) : (
                          <Button onClick={() => connectIntegration(selectedIntegration)}>Connect</Button>
                        )}
                        <Button variant="outline" size="icon">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Features */}
                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>What you can do with this integration</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedIntegrationData.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Configuration */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configuration
                    </CardTitle>
                    <CardDescription>
                      {selectedIntegrationData.status === "connected"
                        ? "Manage your integration settings"
                        : "Configure your integration before connecting"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                      </TabsList>

                      <TabsContent value="general" className="space-y-4 mt-6">
                        {selectedIntegration === "github" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="username">GitHub Username</Label>
                              <Input
                                id="username"
                                value={configs.github?.username || ""}
                                onChange={(e) => updateConfig("github", "username", e.target.value)}
                                placeholder="your-username"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="defaultBranch">Default Branch</Label>
                              <Input
                                id="defaultBranch"
                                value={configs.github?.defaultBranch || ""}
                                onChange={(e) => updateConfig("github", "defaultBranch", e.target.value)}
                                placeholder="main"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Auto-commit generated code</Label>
                                <p className="text-sm text-gray-500">Automatically commit when generating websites</p>
                              </div>
                              <Switch
                                checked={configs.github?.autoCommit || false}
                                onCheckedChange={(checked) => updateConfig("github", "autoCommit", checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Create pull requests</Label>
                                <p className="text-sm text-gray-500">Create PR instead of direct commits</p>
                              </div>
                              <Switch
                                checked={configs.github?.createPR || false}
                                onCheckedChange={(checked) => updateConfig("github", "createPR", checked)}
                              />
                            </div>
                          </>
                        )}

                        {selectedIntegration === "supabase" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="projectUrl">Project URL</Label>
                              <Input
                                id="projectUrl"
                                value={configs.supabase?.projectUrl || ""}
                                onChange={(e) => updateConfig("supabase", "projectUrl", e.target.value)}
                                placeholder="https://your-project.supabase.co"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="anonKey">Anon Key</Label>
                              <Input
                                id="anonKey"
                                type="password"
                                value={configs.supabase?.anonKey || ""}
                                onChange={(e) => updateConfig("supabase", "anonKey", e.target.value)}
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="serviceKey">Service Role Key</Label>
                              <Input
                                id="serviceKey"
                                type="password"
                                value={configs.supabase?.serviceKey || ""}
                                onChange={(e) => updateConfig("supabase", "serviceKey", e.target.value)}
                                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Enable Authentication</Label>
                                <p className="text-sm text-gray-500">Add auth to generated websites</p>
                              </div>
                              <Switch
                                checked={configs.supabase?.enableAuth || false}
                                onCheckedChange={(checked) => updateConfig("supabase", "enableAuth", checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Enable Row Level Security</Label>
                                <p className="text-sm text-gray-500">Secure database access</p>
                              </div>
                              <Switch
                                checked={configs.supabase?.enableRLS || false}
                                onCheckedChange={(checked) => updateConfig("supabase", "enableRLS", checked)}
                              />
                            </div>
                          </>
                        )}

                        {selectedIntegration === "vercel" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="teamId">Team ID</Label>
                              <Input
                                id="teamId"
                                value={configs.vercel?.teamId || ""}
                                onChange={(e) => updateConfig("vercel", "teamId", e.target.value)}
                                placeholder="personal"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="productionBranch">Production Branch</Label>
                              <Input
                                id="productionBranch"
                                value={configs.vercel?.productionBranch || ""}
                                onChange={(e) => updateConfig("vercel", "productionBranch", e.target.value)}
                                placeholder="main"
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Auto-deployment</Label>
                                <p className="text-sm text-gray-500">Deploy automatically on code changes</p>
                              </div>
                              <Switch
                                checked={configs.vercel?.autoDeployment || false}
                                onCheckedChange={(checked) => updateConfig("vercel", "autoDeployment", checked)}
                              />
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Enable Analytics</Label>
                                <p className="text-sm text-gray-500">Track website performance</p>
                              </div>
                              <Switch
                                checked={configs.vercel?.enableAnalytics || false}
                                onCheckedChange={(checked) => updateConfig("vercel", "enableAnalytics", checked)}
                              />
                            </div>
                          </>
                        )}
                      </TabsContent>

                      <TabsContent value="security" className="space-y-4 mt-6">
                        <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <Shield className="w-5 h-5 text-yellow-600" />
                          <div>
                            <p className="font-medium text-yellow-800 dark:text-yellow-200">Security Settings</p>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                              Manage API keys and access permissions
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Key className="w-4 h-4 mr-2" />
                            Regenerate API Keys
                          </Button>

                          <Button variant="outline" className="w-full justify-start bg-transparent">
                            <Shield className="w-4 h-4 mr-2" />
                            Review Permissions
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="webhooks" className="space-y-4 mt-6">
                        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <Webhook className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium text-blue-800 dark:text-blue-200">Webhook Configuration</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">
                              Set up webhooks for real-time updates
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="webhookUrl">Webhook URL</Label>
                          <Input id="webhookUrl" placeholder="https://your-app.com/api/webhooks" />
                        </div>

                        <Button className="w-full">
                          <Webhook className="w-4 h-4 mr-2" />
                          Test Webhook
                        </Button>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-end gap-2 mt-6 pt-6 border-t">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save Configuration</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
