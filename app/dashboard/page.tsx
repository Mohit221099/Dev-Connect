"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Code, Users, Trophy, TrendingUp, Eye, Heart, Star, GitBranch,
  Plus, Search, Filter, Calendar, MapPin, Building, GraduationCap,
  Award, Target, Clock, CheckCircle, Settings, LogOut, Bell,
  MoreHorizontal, ExternalLink, Download, Share2, Bookmark,
  Zap, Activity, Briefcase, MessageSquare, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  userType: 'student' | 'hirer';
  bio?: string;
  company?: string;
  position?: string;
  education?: string;
  skills?: string[];
  location?: string;
  verified: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Enhanced sample data for charts
  const projectData = [
    { name: 'Jan', projects: 4, contributions: 12, views: 1200 },
    { name: 'Feb', projects: 6, contributions: 18, views: 1800 },
    { name: 'Mar', projects: 8, contributions: 24, views: 2400 },
    { name: 'Apr', projects: 12, contributions: 30, views: 3200 },
    { name: 'May', projects: 10, contributions: 28, views: 2800 },
    { name: 'Jun', projects: 15, contributions: 35, views: 4200 },
  ];

  const skillData = [
    { name: 'JavaScript', value: 92, color: '#f59e0b', trend: '+5%' },
    { name: 'React', value: 88, color: '#3b82f6', trend: '+8%' },
    { name: 'Node.js', value: 85, color: '#10b981', trend: '+3%' },
    { name: 'Python', value: 78, color: '#8b5cf6', trend: '+12%' },
    { name: 'TypeScript', value: 82, color: '#ef4444', trend: '+7%' },
  ];

  const recentProjects = [
    { 
      id: 1, 
      title: 'E-commerce Platform', 
      tech: ['React', 'Node.js', 'MongoDB'], 
      status: 'Completed', 
      likes: 24, 
      views: 342,
      lastUpdated: '2 days ago',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop'
    },
    { 
      id: 2, 
      title: 'AI Task Management', 
      tech: ['Vue.js', 'Express', 'AI/ML'], 
      status: 'In Progress', 
      likes: 18, 
      views: 256,
      lastUpdated: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=200&fit=crop'
    },
    { 
      id: 3, 
      title: 'Portfolio Website', 
      tech: ['Next.js', 'Tailwind'], 
      status: 'Completed', 
      likes: 32, 
      views: 489,
      lastUpdated: '1 week ago',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Header */}
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-slate-700/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DevConnect
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400">Professional Network</div>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/dashboard" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">
                Dashboard
              </Link>
              <Link href="/projects" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
                Projects
              </Link>
              <Link href="/challenges" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
                Challenges
              </Link>
              {user.userType === 'student' ? (
                <Link href="/discover" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
                  Discover
                </Link>
              ) : (
                <Link href="/talent" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium">
                  Find Talent
                </Link>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </Button>
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-blue-200">
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Enhanced Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center mb-2">
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white mr-3">
                  Welcome back, {user.name}!
                </h1>
                <div className="text-2xl">👋</div>
              </div>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                {user.userType === 'student' 
                  ? "Ready to showcase your latest innovations?" 
                  : "Let's discover exceptional talent today."}
              </p>
              <div className="flex items-center mt-3 space-x-4">
                <Badge variant="outline" className="border-green-500 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Online
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-600">
                  <Star className="w-3 h-3 mr-1" />
                  Pro Member
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                {user.userType === 'student' ? 'New Project' : 'Post Challenge'}
              </Button>
              <Button variant="outline" className="border-slate-300">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </div>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {user.userType === 'student' ? (
              <>
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Projects</p>
                        <p className="text-3xl font-bold">12</p>
                        <p className="text-blue-200 text-xs mt-1">+2 this month</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Code className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Profile Views</p>
                        <p className="text-3xl font-bold">2.8K</p>
                        <p className="text-purple-200 text-xs mt-1">+15% this week</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Total Likes</p>
                        <p className="text-3xl font-bold">486</p>
                        <p className="text-green-200 text-xs mt-1">+23 today</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm font-medium">Challenges Won</p>
                        <p className="text-3xl font-bold">8</p>
                        <p className="text-orange-200 text-xs mt-1">Top 5% globally</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Trophy className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-indigo-100 text-sm font-medium">Active Challenges</p>
                        <p className="text-3xl font-bold">5</p>
                        <p className="text-indigo-200 text-xs mt-1">2 ending soon</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-teal-100 text-sm font-medium">Applications</p>
                        <p className="text-3xl font-bold">127</p>
                        <p className="text-teal-200 text-xs mt-1">+18 this week</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-pink-100 text-sm font-medium">Hired</p>
                        <p className="text-3xl font-bold">23</p>
                        <p className="text-pink-200 text-xs mt-1">95% success rate</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <CheckCircle className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-cyan-100 text-sm font-medium">Submissions</p>
                        <p className="text-3xl font-bold">342</p>
                        <p className="text-cyan-200 text-xs mt-1">Avg. 4.8/5 rating</p>
                      </div>
                      <div className="bg-white/20 p-3 rounded-xl">
                        <Star className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-8">
            {user.userType === 'student' ? (
              <>
                {/* Enhanced Projects Activity Chart */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-xl">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                          </div>
                          Activity Overview
                        </CardTitle>
                        <CardDescription className="mt-2">Your development activity over the last 6 months</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={projectData}>
                        <defs>
                          <linearGradient id="colorProjects" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                          }} 
                        />
                        <Area type="monotone" dataKey="projects" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProjects)" strokeWidth={3} />
                        <Area type="monotone" dataKey="views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Enhanced Recent Projects */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3 text-xl">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                            <Code className="h-5 w-5 text-purple-600" />
                          </div>
                          Recent Projects
                        </CardTitle>
                        <CardDescription className="mt-2">Your latest project contributions and updates</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {recentProjects.map((project) => (
                        <div key={project.id} className="group p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 border border-slate-200 dark:border-slate-600">
                          <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {project.title.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                  </h3>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">Updated {project.lastUpdated}</p>
                                </div>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {project.tech.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="text-xs font-medium">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                                  <div className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    {project.likes}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {project.views}
                                  </div>
                                </div>
                                <Badge
                                  variant={project.status === 'Completed' ? 'default' : 'secondary'}
                                  className={project.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}
                                >
                                  {project.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                {/* Hirer Analytics */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      Hiring Analytics
                    </CardTitle>
                    <CardDescription className="mt-2">Your hiring performance and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={projectData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: 'none', 
                            borderRadius: '12px', 
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)' 
                          }} 
                        />
                        <Line type="monotone" dataKey="projects" stroke="#8b5cf6" strokeWidth={4} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Recent Applications */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                      Recent Applications
                    </CardTitle>
                    <CardDescription className="mt-2">Latest candidate applications and submissions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Alex Johnson', position: 'Senior Frontend Developer', skills: ['React', 'TypeScript', 'Next.js'], applied: '2 hours ago', rating: 4.9 },
                        { name: 'Sarah Chen', position: 'Full Stack Developer', skills: ['Node.js', 'MongoDB', 'React'], applied: '5 hours ago', rating: 4.8 },
                        { name: 'Mike Wilson', position: 'Backend Developer', skills: ['Python', 'Django', 'PostgreSQL'], applied: '1 day ago', rating: 4.7 },
                      ].map((applicant, index) => (
                        <div key={index} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                                {applicant.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-slate-900 dark:text-white">{applicant.name}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-300">{applicant.position}</p>
                              <div className="flex gap-2 mt-2">
                                {applicant.skills.map((skill) => (
                                  <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{applicant.rating}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{applicant.applied}</p>
                            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                              Review
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Profile Completion */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Profile Strength
                </CardTitle>
                <CardDescription>Optimize your profile for better visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium">Overall Score</span>
                      <span className="text-2xl font-bold text-blue-600">85%</span>
                    </div>
                    <Progress value={85} className="h-3 bg-slate-200" />
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Profile Picture</span>
                      <Badge variant="outline" className="ml-auto text-xs">Complete</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Basic Information</span>
                      <Badge variant="outline" className="ml-auto text-xs">Complete</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span>Skills & Portfolio</span>
                      <Badge variant="secondary" className="ml-auto text-xs">75%</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-yellow-500" />
                      <span>Work Experience</span>
                      <Badge variant="secondary" className="ml-auto text-xs">60%</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    <Zap className="h-4 w-4 mr-2" />
                    Boost Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {user.userType === 'student' && (
              <>
                {/* Enhanced Skills Chart */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Code className="h-5 w-5 text-purple-600" />
                      Skill Proficiency
                    </CardTitle>
                    <CardDescription>Your current skill levels and growth</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {skillData.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between items-center text-sm mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600 dark:text-slate-300">{skill.value}%</span>
                              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                                {skill.trend}
                              </Badge>
                            </div>
                          </div>
                          <Progress value={skill.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-6">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Skills
                    </Button>
                  </CardContent>
                </Card>

                {/* Enhanced Upcoming Challenges */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                      Trending Challenges
                    </CardTitle>
                    <CardDescription>Hot challenges ending soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: 'React Performance Challenge', deadline: '3 days left', difficulty: 'Medium', prize: '$500', participants: 234 },
                        { title: 'AI Algorithm Contest', deadline: '1 week left', difficulty: 'Hard', prize: '$1000', participants: 156 },
                        { title: 'UI/UX Design Sprint', deadline: '2 weeks left', difficulty: 'Easy', prize: '$300', participants: 89 },
                      ].map((challenge, index) => (
                        <div key={index} className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200 cursor-pointer">
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-sm">{challenge.title}</h4>
                            <Badge
                              variant="outline"
                              className={`text-xs ${
                                challenge.difficulty === 'Easy' ? 'border-green-500 text-green-700' :
                                challenge.difficulty === 'Medium' ? 'border-yellow-500 text-yellow-700' :
                                'border-red-500 text-red-700'
                              }`}
                            >
                              {challenge.difficulty}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                            <span>{challenge.deadline}</span>
                            <span className="font-semibold text-green-600">{challenge.prize}</span>
                          </div>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-slate-500">{challenge.participants} participants</span>
                            <Button size="sm" variant="outline" className="text-xs">
                              Join Challenge
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Challenges
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}

            {user.userType === 'hirer' && (
              <>
                {/* Top Candidates */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      Top Candidates
                    </CardTitle>
                    <CardDescription>Highly rated developers in your area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'Emma Davis', skills: ['React', 'Node.js'], rating: 4.9, location: 'San Francisco' },
                        { name: 'James Lee', skills: ['Python', 'AI/ML'], rating: 4.8, location: 'New York' },
                        { name: 'Lisa Zhang', skills: ['Vue.js', 'PHP'], rating: 4.7, location: 'Seattle' },
                      ].map((candidate, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all duration-200">
                          <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{candidate.name}</h4>
                            <p className="text-xs text-slate-500 mb-2">{candidate.location}</p>
                            <div className="flex gap-1">
                              {candidate.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              <span className="text-xs font-medium">{candidate.rating}</span>
                            </div>
                            <Button size="sm" variant="outline" className="text-xs">
                              View Profile
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Browse All Talent
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-800/80">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Streamline your hiring process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                        <Plus className="h-4 w-4 mr-3" />
                        Post New Challenge
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Search className="h-4 w-4 mr-3" />
                        Search Candidates
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Calendar className="h-4 w-4 mr-3" />
                        Schedule Interviews
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Award className="h-4 w-4 mr-3" />
                        Review Submissions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}