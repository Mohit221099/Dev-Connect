"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Code, 
  Clock, 
  Users, 
  Star, 
  Search, 
  Calendar,
  GitBranch,
  Play,
  CheckCircle,
  Timer,
  TrendingUp,
  Plus,
  Heart,
  Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import { Project, User } from '../types';

export default function ProjectsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    const mockProjects: Project[] = [
      {
        id: '1',
        title: 'E-commerce Platform',
        description: 'A full-stack e-commerce platform with payment integration and user authentication.',
        tech: ['React', 'Node.js', 'MongoDB'],
        status: 'Completed',
        contributors: 5,
        lastUpdated: '2025-06-07',
        likes: 24,
        views: 342,
        progress: 100,
        isContributor: true,
        owner: 'TechCorp'
      },
      {
        id: '2',
        title: 'AI Task Management',
        description: 'A task management app with AI-driven prioritization and team collaboration.',
        tech: ['Vue.js', 'Express', 'AI/ML'],
        status: 'In Progress',
        contributors: 3,
        lastUpdated: '2025-06-09',
        likes: 18,
        views: 256,
        progress: 65,
        isContributor: false
      },
      {
        id: '3',
        title: 'Portfolio Website',
        description: 'A modern, responsive portfolio website showcasing developer projects.',
        tech: ['Next.js', 'Tailwind'],
        status: 'Completed',
        contributors: 2,
        lastUpdated: '2025-06-01',
        likes: 32,
        views: 489,
        progress: 100,
        isContributor: true
      },
      {
        id: '4',
        title: 'Real-time Chat App',
        description: 'A chat application with real-time messaging and group features.',
        tech: ['React', 'Socket.io', 'Node.js'],
        status: 'Planned',
        contributors: 1,
        lastUpdated: '2025-06-08',
        likes: 12,
        views: 150,
        progress: 10
      },
      {
        id: '5',
        title: 'Data Visualization Dashboard',
        description: 'An interactive dashboard for visualizing complex datasets.',
        tech: ['D3.js', 'React', 'PostgreSQL'],
        status: 'In Progress',
        contributors: 4,
        lastUpdated: '2025-06-05',
        likes: 28,
        views: 412,
        progress: 80,
        isContributor: false,
        owner: 'DataTech'
      }
    ];

    setTimeout(() => {
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      setLoading(false);
    }, 1000);
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
      setUserLoading(false);
    }
  };

  useEffect(() => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    if (selectedTech !== 'all') {
      filtered = filtered.filter(project => project.tech.includes(selectedTech));
    }

    if (activeTab !== 'all') {
      if (activeTab === 'myprojects') {
        filtered = filtered.filter(project => project.isContributor);
      } else {
        filtered = filtered.filter(project => project.status === activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
      }
    }

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedStatus, selectedTech, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'Planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress': return <Play className="h-4 w-4 text-yellow-500" />;
      case 'Completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Planned': return <Timer className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const joinProject = (projectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isContributor: true, contributors: project.contributors + 1 }
        : project
    ));
  };

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Code className="h-8 w-8 text-blue-500" />
                  {user.userType === 'hirer' ? 'Manage Projects' : 'Projects'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {user.userType === 'hirer'
                    ? 'Oversee and collaborate on innovative projects'
                    : 'Showcase your skills and collaborate on exciting projects'}
                </p>
              </div>
              {user.userType === 'hirer' ? (
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Find Projects
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Active Projects</p>
                      <p className="text-2xl font-bold text-green-600">10</p>
                    </div>
                    <GitBranch className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Contributing</p>
                      <p className="text-2xl font-bold text-blue-600">4</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
                      <p className="text-2xl font-bold text-purple-600">6</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Views</p>
                      <p className="text-2xl font-bold text-orange-600">1.2K</p>
                    </div>
                    <Eye className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects, technologies, or owners..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Technology" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Technologies</SelectItem>
                      <SelectItem value="React">React</SelectItem>
                      <SelectItem value="Node.js">Node.js</SelectItem>
                      <SelectItem value="Vue.js">Vue.js</SelectItem>
                      <SelectItem value="Next.js">Next.js</SelectItem>
                      <SelectItem value="Tailwind">Tailwind</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="in progress">In Progress</TabsTrigger>
              <TabsTrigger value="myprojects">My Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                              {getStatusIcon(project.status)}
                            </div>
                            <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                            {project.owner && (
                              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                Owned by {project.owner}
                              </p>
                            )}
                          </div>
                          {project.isContributor && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              Contributor
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {project.isContributor && project.progress !== undefined && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>Updated {new Date(project.lastUpdated).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{project.contributors} contributors</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Heart className="h-4 w-4 text-gray-500" />
                              <span>{project.likes} likes</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-gray-500" />
                              <span>{project.views} views</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>

                          <div className="pt-2">
                            {project.isContributor ? (
                              <Button 
                                className="w-full" 
                                variant="outline"
                                disabled={project.status === 'Completed'}
                              >
                                <Code className="h-4 w-4 mr-2" />
                                {project.status === 'Completed' ? 'View Project' : 'Contribute'}
                              </Button>
                            ) : (
                              <Button 
                                className="w-full"
                                onClick={() => joinProject(project.id)}
                                disabled={project.status === 'Completed'}
                              >
                                <GitBranch className="h-4 w-4 mr-2" />
                                Join Project
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or check back later for new projects.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}