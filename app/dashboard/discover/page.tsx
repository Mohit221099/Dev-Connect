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
  Briefcase, 
  MapPin, 
  Users, 
  Search, 
  Calendar, 
  Star, 
  Code, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  Clock, 
  DollarSign,
  UserCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import { Job, User } from '../types';

export default function DiscoverPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('jobs');
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    const mockJobs: Job[] = [
      {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp',
        description: 'Lead the development of modern web applications using React and TypeScript.',
        skills: ['React', 'TypeScript', 'Tailwind'],
        location: 'Remote',
        type: 'Full-time',
        salary: '$120K - $150K',
        postedDate: '2025-06-07',
        applicants: 45,
        isApplied: false
      },
      {
        id: '2',
        title: 'Backend Engineer',
        company: 'DataTech',
        description: 'Build scalable APIs and microservices with Node.js and PostgreSQL.',
        skills: ['Node.js', 'PostgreSQL', 'AWS'],
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$130K - $160K',
        postedDate: '2025-06-05',
        applicants: 32,
        isApplied: true
      },
      {
        id: '3',
        title: 'Machine Learning Intern',
        company: 'AIStartup',
        description: 'Work on cutting-edge AI models and data pipelines.',
        skills: ['Python', 'TensorFlow', 'AI/ML'],
        location: 'New York, NY',
        type: 'Internship',
        salary: '$30/hr',
        postedDate: '2025-06-08',
        applicants: 67,
        isApplied: false
      },
      {
        id: '4',
        title: 'DevOps Engineer',
        company: 'CloudTech',
        description: 'Manage CI/CD pipelines and cloud infrastructure with Kubernetes.',
        skills: ['Docker', 'Kubernetes', 'AWS'],
        location: 'Remote',
        type: 'Contract',
        salary: '$100/hr',
        postedDate: '2025-06-06',
        applicants: 28,
        isApplied: false
      },
      {
        id: '5',
        title: 'Full Stack Developer',
        company: 'InnovateCo',
        description: 'Develop end-to-end features for a SaaS platform.',
        skills: ['React', 'Node.js', 'MongoDB'],
        location: 'Austin, TX',
        type: 'Full-time',
        salary: '$110K - $140K',
        postedDate: '2025-06-04',
        applicants: 53,
        isApplied: true
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
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
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedType, selectedLocation, activeTab]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Part-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'Contract': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'Internship': return 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const applyToJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, isApplied: true, applicants: job.applicants + 1 }
        : job
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
          <p className="text-gray-600 dark:text-gray-300">Loading opportunities...</p>
        </div>
      </div>
    );
  }

  if (!user || user.userType !== 'student') {
    router.push('/dashboard');
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
                  <Briefcase className="h-8 w-8 text-purple-500" />
                  Discover Opportunities
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Explore jobs, connect with developers, and find your next big opportunity
                </p>
              </div>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                <Zap className="h-4 w-4 mr-2" />
                Find Jobs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Open Positions</p>
                      <p className="text-2xl font-bold text-green-600">128</p>
                    </div>
                    <Briefcase className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Applications</p>
                      <p className="text-2xl font-bold text-blue-600">12</p>
                    </div>
                    <UserCheck className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Connections</p>
                      <p className="text-2xl font-bold text-purple-600">45</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Profile Views</p>
                      <p className="text-2xl font-bold text-orange-600">1.5K</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
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
                    placeholder="Search jobs, companies, or skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="San Francisco, CA">San Francisco, CA</SelectItem>
                      <SelectItem value="New York, NY">New York, NY</SelectItem>
                      <SelectItem value="Austin, TX">Austin, TX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
              <TabsTrigger value="developers">Developers</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {activeTab === 'jobs' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredJobs.map((job, index) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getTypeColor(job.type)}>
                                  {job.type}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="text-sm text-gray-600">Featured</span>
                                </div>
                              </div>
                              <CardTitle className="text-lg mb-2">{job.title}</CardTitle>
                              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                {job.company}
                              </p>
                            </div>
                            {job.isApplied && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                                Applied
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="text-sm leading-relaxed">
                            {job.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-600" />
                                <span>{job.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-gray-600" />
                                <span>{job.salary}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-gray-600" /></div>
                                <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-600" />
                                <span>{job.applicants} applicants</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {job.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="pt-2">
                              {job.isApplied ? (
                                <Button 
                                  className="w-full" 
                                  variant="outline"
                                  disabled={true}
                                >
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Application Submitted
                                </Button>
                              ) : (
                                <Button 
                                  className="w-full"
                                  onClick={() => applyToJob(job.id)}
                                >
                                  <Briefcase className="h-4 w-4 mr-2" />
                                  Apply Now
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {activeTab === 'developers' && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Trending Developers
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with top developers in your field. Coming soon!
                  </p>
                </div>
              )}

              {activeTab === 'recommended' && (
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Recommended Content
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Personalized challenges and projects based on your skills. Coming soon.
                  </p>
                </div>
              )}

              {activeTab === 'jobs' && filteredJobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or check back later for new opportunities.
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