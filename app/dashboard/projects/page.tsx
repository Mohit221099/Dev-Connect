"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, 
  Clock, 
  Users, 
  Star, 
  Search, 
  GitBranch, 
  Play, 
  CheckCircle, 
  Timer, 
  Eye, 
  Heart, 
  Plus,
  SortAsc,
  SortDesc,
  Tag,
  Activity,
  Upload,
  Lock,
  Globe,
  Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../Header';

interface User {
  userType: 'hirer' | 'contributor';
  username: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'Planned' | 'In Progress' | 'Completed';
  contributors: number;
  lastUpdated: string;
  likes: number;
  views: number;
  stars: number;
  progress: number;
  isContributor: boolean;
  isStarred: boolean;
  owner: string;
  category: string;
  visibility: 'public' | 'private';
  coverImage?: string;
  contributionCount: number;
  isArchived: boolean;
}

interface ProjectFormData {
  title: string;
  description: string;
  tech: string[];
  status: 'Planned' | 'In Progress' | 'Completed';
  category: string;
  visibility: 'public' | 'private';
  coverImage?: string;
}

interface Contribution {
  id: string;
  date: string;
  count: number;
  projectId: string;
  type: 'created' | 'joined' | 'updated';
  user: string;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedTech, setSelectedTech] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('updated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projectFormData, setProjectFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    tech: [],
    status: 'Planned',
    category: '',
    visibility: 'public',
  });
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<ProjectFormData>>({});

  useEffect(() => {
    fetchUserData();
    const storedProjects = localStorage.getItem('projects');
    const storedContributions = localStorage.getItem('contributions');
    const initialProjects: Project[] = storedProjects ? JSON.parse(storedProjects) : [
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
        stars: 15,
        progress: 100,
        isContributor: true,
        isStarred: false,
        owner: 'TechCorp',
        category: 'Web Development',
        visibility: 'public',
        contributionCount: 12,
        isArchived: false,
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
        stars: 8,
        progress: 65,
        isContributor: false,
        isStarred: false,
        category: 'AI/ML',
        visibility: 'public',
        contributionCount: 8,
        isArchived: false,
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
        stars: 20,
        progress: 100,
        isContributor: true,
        isStarred: true,
        category: 'Web Development',
        visibility: 'public',
        contributionCount: 5,
        isArchived: false,
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
        stars: 5,
        progress: 10,
        isContributor: false,
        isStarred: false,
        category: 'Web Development',
        visibility: 'private',
        contributionCount: 2,
        isArchived: false,
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
        stars: 12,
        progress: 80,
        isContributor: false,
        isStarred: false,
        owner: 'DataTech',
        category: 'Data Visualization',
        visibility: 'public',
        contributionCount: 10,
        isArchived: false,
      },
    ];

    const initialContributions: Contribution[] = storedContributions ? JSON.parse(storedContributions) : [];
    setProjects(initialProjects);
    setFilteredProjects(initialProjects);
    setContributions(initialContributions);

    // Generate mock contributions if none exist
    if (!storedContributions) {
      const mockContributions: Contribution[] = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const projectIds = initialProjects.map(p => p.id);
        const count = Math.floor(Math.random() * 5);
        if (count > 0) {
          mockContributions.push({
            id: `${Date.now()}-${i}`,
            date: dateString,
            count,
            projectId: projectIds[Math.floor(Math.random() * projectIds.length)],
            type: ['created', 'joined', 'updated'][Math.floor(Math.random() * 3)] as 'created' | 'joined' | 'updated',
            user: 'Current User',
          });
        }
      }
      setContributions(mockContributions);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
    localStorage.setItem('contributions', JSON.stringify(contributions));
  }, [projects, contributions]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user as User);
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
    let filtered = [...projects];

    filtered = filtered.filter(project => 
      !project.isArchived && (project.visibility === 'public' || project.owner === user?.username || project.isContributor)
    );

    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())) ||
        project.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    if (selectedTech !== 'all') {
      filtered = filtered.filter(project => project.tech.includes(selectedTech));
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (activeTab !== 'all') {
      if (activeTab === 'myprojects') {
        filtered = filtered.filter(project => project.isContributor);
      } else if (activeTab === 'starred') {
        filtered = filtered.filter(project => project.isStarred);
      } else if (activeTab === 'archived') {
        filtered = projects.filter(project => project.isArchived);
      } else {
        filtered = filtered.filter(project => 
          project.status === activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
        );
      }
    }

    filtered.sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'updated':
          return multiplier * (new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        case 'stars':
          return multiplier * (b.stars - a.stars);
        case 'likes':
          return multiplier * (b.likes - a.likes);
        case 'views':
          return multiplier * (b.views - a.views);
        case 'contributions':
          return multiplier * ((b.contributionCount || 0) - (a.contributionCount || 0));
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedStatus, selectedTech, selectedCategory, activeTab, sortBy, sortOrder, user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Planned': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
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
        ? { ...project, isContributor: true, contributors: project.contributors + 1, contributionCount: (project.contributionCount || 0) + 1 }
        : project
    ));
    setContributions(prev => [...prev, {
      id: `${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      count: 1,
      projectId,
      type: 'joined',
      user: user?.username || 'Current User',
    }]);
  };

  const toggleStar = (projectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isStarred: !project.isStarred, stars: project.isStarred ? project.stars - 1 : project.stars + 1 }
        : project
    ));
  };

  const toggleArchive = (projectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, isArchived: !project.isArchived }
        : project
    ));
  };

  const validateForm = (): boolean => {
    const errors: Partial<ProjectFormData> = {};
    if (!projectFormData.title) errors.title = 'Title is required';
    if (!projectFormData.description) errors.description = 'Description is required';
    if (!projectFormData.category) errors.category = 'Category is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateProject = () => {
    if (!validateForm()) return;

    const newProject: Project = {
      id: `${Date.now()}`,
      title: projectFormData.title,
      description: projectFormData.description,
      tech: projectFormData.tech,
      status: projectFormData.status,
      category: projectFormData.category,
      visibility: projectFormData.visibility,
      contributors: 1,
      lastUpdated: new Date().toISOString().split('T')[0],
      likes: 0,
      views: 0,
      stars: 0,
      progress: projectFormData.status === 'Completed' ? 100 : projectFormData.status === 'In Progress' ? 50 : 0,
      isContributor: true,
      isStarred: false,
      owner: user!.username,
      coverImage: projectFormData.coverImage,
      contributionCount: 1,
      isArchived: false,
    };

    setProjects(prev => [...prev, newProject]);
    setContributions(prev => [...prev, {
      id: `${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      count: 1,
      projectId: newProject.id,
      type: 'created',
      user: user!.username,
    }]);
    setProjectFormData({
      title: '',
      description: '',
      tech: [],
      status: 'Planned',
      category: '',
      visibility: 'public',
    });
    setCoverImagePreview(null);
    setFormErrors({});
    setIsCreateModalOpen(false);
  };

  const handleTechInput = (value: string) => {
    const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setProjectFormData(prev => ({ ...prev, tech: techArray }));
  };

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setFormErrors(prev => ({ ...prev, coverImage: 'Image size must be under 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectFormData(prev => ({ ...prev, coverImage: reader.result as string }));
        setCoverImagePreview(reader.result as string);
        setFormErrors(prev => ({ ...prev, coverImage: undefined }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (count <= 2) return 'bg-green-200 dark:bg-green-700';
    if (count <= 5) return 'bg-green-400 dark:bg-green-600';
    if (count <= 8) return 'bg-green-600 dark:bg-green-500';
    return 'bg-green-800 dark:bg-green-400';
  };

  const renderContributionGraph = () => {
    const weeks = 52;
    const days = 7;
    const today = new Date();
    const graph = [];

    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < days; d++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (weeks - w - 1) * 7 - (days - d - 1));
        const dateString = date.toISOString().split('T')[0];
        const contribution = contributions.find(c => c.date === dateString);
        week.push({
          date: dateString,
          count: contribution?.count || 0,
          contributions: contribution ? contributions.filter(c => c.date === dateString) : [],
        });
      }
      graph.push(week);
    }

    return (
      <div className="flex gap-1 overflow-x-auto p-2 bg-white dark:bg-gray-900 rounded-lg shadow">
        {graph.map((week, wIndex) => (
          <div key={wIndex} className="flex flex-col gap-1">
            {week.map((day, dIndex) => (
              <div
                key={`${wIndex}-${dIndex}`}
                className={`w-4 h-4 rounded-sm ${getContributionColor(day.count)} cursor-pointer transition-transform hover:scale-125`}
                title={`${day.date}: ${day.count} contributions\n${day.contributions.map(c => `${c.type} on ${projects.find(p => p.id === c.projectId)?.title || 'Unknown'}`).join('\n')}`}
              />
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderContributionTimeline = () => {
    const sortedContributions = [...contributions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ).slice(0, 10);

    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Contributions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedContributions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-300">No recent contributions</p>
            ) : (
              sortedContributions.map(contribution => (
                <div key={contribution.id} className="flex items-center gap-4">
                  <Activity className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">
                      {contribution.user} {contribution.type} project{' '}
                      <span className="text-blue-600 dark:text-blue-400">
                        {projects.find(p => p.id === contribution.projectId)?.title || 'Unknown'}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(contribution.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Code className="h-8 w-8 text-blue-600" />
                  {user.userType === 'hirer' ? 'Manage Projects' : 'Projects'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {user.userType === 'hirer'
                    ? 'Create and manage innovative projects'
                    : 'Discover and contribute to exciting projects'}
                </p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? <SortAsc className="h-4 w-4 mr-2" /> : <SortDesc className="h-4 w-4 mr-2" />}
                  {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Active Projects</p>
                      <p className="text-2xl font-bold text-blue-600">{projects.filter(p => !p.isArchived).length}</p>
                    </div>
                    <GitBranch className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Contributions</p>
                      <p className="text-2xl font-bold text-green-600">{contributions.reduce((sum, c) => sum + c.count, 0)}</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-yellow-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Starred</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {projects.filter(p => p.isStarred).length}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total Stars</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {projects.reduce((sum, p) => sum + p.stars, 0)}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {renderContributionTimeline()}

          <Card>
            <CardHeader>
              <CardTitle>Contribution Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {renderContributionGraph()}
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span>Less</span>
                <div className="flex gap-1">
                  {[0, 2, 5, 8, 10].map(count => (
                    <div key={count} className={`w-4 h-4 rounded-sm ${getContributionColor(count)}`} />
                  ))}
                </div>
                <span>More</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search projects, technologies, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
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
                      <SelectItem value="MongoDB">MongoDB</SelectItem>
                      <SelectItem value="Express">Express</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Socket.io">Socket.io</SelectItem>
                      <SelectItem value="D3.js">D3.js</SelectItem>
                      <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Data Visualization">Data Visualization</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="updated">Last Updated</SelectItem>
                      <SelectItem value="stars">Stars</SelectItem>
                      <SelectItem value="likes">Likes</SelectItem>
                      <SelectItem value="views">Views</SelectItem>
                      <SelectItem value="contributions">Contributions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="in progress">In Progress</TabsTrigger>
              <TabsTrigger value="myprojects">My Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="starred">Starred</TabsTrigger>
              <TabsTrigger value="archived">Archived</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                        <CardHeader>
                          {project.coverImage && (
                            <img
                              src={project.coverImage}
                              alt={project.title}
                              className="w-full h-40 object-cover rounded-t-lg"
                            />
                          )}
                          <div className="flex items-start justify-between pt-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getStatusColor(project.status)}>
                                  {project.status}
                                </Badge>
                                {getStatusIcon(project.status)}
                                <Badge variant="outline" className="ml-2">
                                  <Tag className="h-3 w-3 mr-1" />
                                  {project.category}
                                </Badge>
                                <Badge variant="outline" className="ml-2">
                                  {project.visibility === 'public' ? (
                                    <Globe className="h-3 w-3 mr-1" />
                                  ) : (
                                    <Lock className="h-3 w-3 mr-1" />
                                  )}
                                  {project.visibility}
                                </Badge>
                                {project.isArchived && (
                                  <Badge variant="outline" className="ml-2">
                                    <Archive className="h-3 w-3 mr-1" />
                                    Archived
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
                                {project.title}
                              </CardTitle>
                              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                Owned by {project.owner}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              {project.isContributor && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  Contributor
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleStar(project.id)}
                                className="hover:bg-yellow-100 dark:hover:bg-yellow-900"
                              >
                                <Star
                                  className={`h-4 w-4 ${project.isStarred ? 'text-yellow-500 fill-yellow-500' : 'text-gray-500'}`}
                                />
                                <span className="ml-1">{project.stars}</span>
                              </Button>
                            </div>
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
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                  <div
                                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
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
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-gray-500" />
                                <span>{project.stars} stars</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-gray-500" />
                                <span>{project.contributionCount} contributions</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant="secondary"
                                  className="text-xs bg-gray-100 dark:bg-gray-800"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>

                            <div className="pt-2 flex gap-2">
                              {project.isContributor ? (
                                <Button
                                  className="flex-1"
                                  variant="outline"
                                  disabled={project.status === 'Completed' || project.isArchived}
                                  onClick={() => router.push(`/projects/${project.id}`)}
                                >
                                  <Code className="h-4 w-4 mr-2" />
                                  {project.status === 'Completed' ? 'View Project' : 'Contribute'}
                                </Button>
                              ) : (
                                <Button
                                  className="flex-1"
                                  onClick={() => joinProject(project.id)}
                                  disabled={project.status === 'Completed' || project.isArchived}
                                  variant="default"
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <GitBranch className="h-4 w-4 mr-2" />
                                  Join Project
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => router.push(`/projects/${project.id}`)}
                              >
                                View Details
                              </Button>
                              {project.owner === user.username && (
                                <Button
                                  variant="outline"
                                  className="flex-1"
                                  onClick={() => toggleArchive(project.id)}
                                >
                                  <Archive className="h-4 w-4 mr-2" />
                                  {project.isArchived ? 'Unarchive' : 'Archive'}
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <GitBranch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or create a new project.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={projectFormData.title}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter project title"
                    className={formErrors.title ? 'border-red-500' : ''}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs">{formErrors.title}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectFormData.description}
                    onChange={(e) => setProjectFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project"
                    rows={4}
                    className={formErrors.description ? 'border-red-500' : ''}
                  />
                  {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tech">Technologies (comma-separated)</Label>
                  <Input
                    id="tech"
                    placeholder="e.g., React, Node.js, MongoDB"
                    onChange={(e) => handleTechInput(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={projectFormData.status}
                    onValueChange={(value) => setProjectFormData(prev => ({ ...prev, status: value as 'Planned' | 'In Progress' | 'Completed' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Planned">Planned</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={projectFormData.category}
                    onValueChange={(value) => setProjectFormData(prev => ({ ...prev, category: value }))}
                    className={formErrors.category ? 'border-red-500' : ''}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web Development">Web Development</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Data Visualization">Data Visualization</SelectItem>
                      <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.category && <p className="text-red-500 text-xs">{formErrors.category}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={projectFormData.visibility}
                    onValueChange={(value) => setProjectFormData(prev => ({ ...prev, visibility: value as 'public' | 'private' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImage}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('coverImage')?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                    {coverImagePreview && (
                      <img src={coverImagePreview} alt="Preview" className="h-16 w-16 object-cover rounded" />
                    )}
                  </div>
                  {formErrors.coverImage && <p className="text-red-500 text-xs">{formErrors.coverImage}</p>}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsCreateModalOpen(false);
                  setCoverImagePreview(null);
                  setFormErrors({});
                }}>
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateProject}
                >
                  Create Project
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}