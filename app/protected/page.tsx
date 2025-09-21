import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code2, Database, Github, Settings, User, LogOut } from "lucide-react"
import Link from "next/link"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, {profile?.full_name || data.user.email}!
              </h1>
              <p className="text-muted-foreground">
                Your ArcBuilder dashboard is ready. Start building amazing websites.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <form action="/auth/signout" method="post">
                <Button variant="ghost" type="submit">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/generator">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle>Generate Website</CardTitle>
                  <CardDescription>Create a new website from your prompt</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-primary">
                    <span className="text-sm font-medium">Start building</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Database className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle>My Projects</CardTitle>
                  <CardDescription>View and manage your generated websites</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-accent">
                    <span className="text-sm font-medium">View projects</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/integrations">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                    <Github className="w-6 h-6 text-green-500" />
                  </div>
                  <CardTitle>Integrations</CardTitle>
                  <CardDescription>Connect GitHub, Supabase, and more</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-green-500">
                    <span className="text-sm font-medium">Setup integrations</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{data.user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      Active
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <p className="text-foreground">{new Date(data.user.created_at).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Sign In</label>
                  <p className="text-foreground">
                    {data.user.last_sign_in_at ? new Date(data.user.last_sign_in_at).toLocaleDateString() : "Never"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
