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
  Trophy, 
  Clock, 
  Users, 
  Code, 
  Star, 
  Search, 
  Filter,
  Calendar,
  Award,
  Target,
  Zap,
  BookOpen,
  GitBranch,
  Play,
  CheckCircle,
  XCircle,
  Timer,
  Flame,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import { Challenge, User } from '../types';

export default function ChallengesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Build a Real-time Chat Application',
        description: 'Create a full-stack chat application using React, Node.js, and Socket.io with user authentication and message persistence.',
        difficulty: 'Hard',
        category: 'Full Stack',
        duration: '7 days',
        participants: 234,
        prize: '$500 + Internship Opportunity',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        deadline: '2025-06-20',
        status: 'Active',
        progress: 45,
        isEnrolled: true,
        company: 'TechCorp'
      },
      {
        id: '2',
        title: 'Algorithm Optimization Challenge',
        description: 'Solve complex algorithmic problems focusing on time and space complexity optimization.',
        difficulty: 'Hard',
        category: 'Algorithm',
        duration: '3 days',
        participants: 156,
        prize: '$300 + Certificate',
        tags: ['Algorithms', 'Data Structures', 'Python', 'C++'],
        deadline: '2025-06-15',
        status: 'Active',
        company: 'CodeMasters'
      },
      {
        id: '3',
        title: 'Responsive Landing Page Design',
        description: 'Design and develop a modern, responsive landing page for a startup company.',
        difficulty: 'Medium',
        category: 'Frontend',
        duration: '5 days',
        participants: 89,
        prize: '$200 + Portfolio Review',
        tags: ['HTML', 'CSS', 'JavaScript', 'Figma'],
        deadline: '2025-06-18',
        status: 'Active',
        progress: 20,
        isEnrolled: true
      },
      {
        id: '4',
        title: 'API Development Sprint',
        description: 'Build a RESTful API with authentication, rate limiting, and comprehensive documentation.',
        difficulty: 'Medium',
        category: 'Backend',
        duration: '4 days',
        participants: 67,
        prize: '$250 + Code Review',
        tags: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
        deadline: '2025-06-25',
        status: 'Upcoming'
      },
      {
        id: '5',
        title: 'DevOps Pipeline Challenge',
        description: 'Set up a complete CI/CD pipeline with automated testing and deployment.',
        difficulty: 'Hard',
        category: 'DevOps',
        duration: '6 days',
        participants: 45,
        prize: '$400 + Job Interview',
        tags: ['Docker', 'Jenkins', 'AWS', 'Kubernetes'],
        deadline: '2025-07-01',
        status: 'Upcoming',
        company: 'CloudTech'
      },
      {
        id: '6',
        title: 'Database Design Competition',
        description: 'Design an efficient database schema for a complex e-commerce platform.',
        difficulty: 'Medium',
        category: 'Database',
        duration: '3 days',
        participants: 78,
        prize: '$150 + Mentorship',
        tags: ['SQL', 'PostgreSQL', 'Database Design', 'Performance'],
        deadline: '2025-06-12',
        status: 'Completed'
      }
    ];

    setTimeout(() => {
      setChallenges(mockChallenges);
      setFilteredChallenges(mockChallenges);
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
    let filtered = challenges;

    if (searchQuery) {
      filtered = filtered.filter(challenge =>
        challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(challenge => challenge.difficulty === selectedDifficulty);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(challenge => challenge.category === selectedCategory);
    }

    if (activeTab !== 'all') {
      if (activeTab === 'enrolled') {
        filtered = filtered.filter(challenge => challenge.isEnrolled);
      } else {
        filtered = filtered.filter(challenge => challenge.status === activeTab.charAt(0).toUpperCase() + activeTab.slice(1));
      }
    }

    setFilteredChallenges(filtered);
  }, [challenges, searchQuery, selectedDifficulty, selectedCategory, activeTab]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Play className="h-4 w-4 text-green-500" />;
      case 'Completed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'Upcoming': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <Timer className="h-4 w-4 text-gray-500" />;
    }
  };

  const enrollInChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { ...challenge, isEnrolled: true, participants: challenge.participants + 1 }
        : challenge
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
          <p className="text-gray-600 dark:text-gray-300">Loading challenges...</p>
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
                  <Trophy className="h-8 w-8 text-yellow-500" />
                  {user.userType === 'hirer' ? 'Manage Challenges' : 'Coding Challenges'}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {user.userType === 'hirer'
                    ? 'Create and manage coding challenges to find top talent'
                    : 'Test your skills, compete with peers, and win exciting prizes'}
                </p>
              </div>
              {user.userType === 'hirer' ? (
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                  <Target className="h-4 w-4 mr-2" />
                  Create Challenge
                </Button>
              ) : (
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Find Challenges
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Active Challenges</p>
                      <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                    <Flame className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Enrolled</p>
                      <p className="text-2xl font-bold text-blue-600">3</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Completed</p>
                      <p className="text-2xl font-bold text-purple-600">8</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Rank</p>
                      <p className="text-2xl font-bold text-orange-600">#24</p>
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
                    placeholder="Search challenges, technologies, or companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Full Stack">Full Stack</SelectItem>
                      <SelectItem value="Algorithm">Algorithm</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All Challenges</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="enrolled">My Challenges</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredChallenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getDifficultyColor(challenge.difficulty)}>
                                {challenge.difficulty}
                              </Badge>
                              <Badge variant="outline">{challenge.category}</Badge>
                              {getStatusIcon(challenge.status)}
                            </div>
                            <CardTitle className="text-lg mb-2">{challenge.title}</CardTitle>
                            {challenge.company && (
                              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                                Sponsored by {challenge.company}
                              </p>
                            )}
                          </div>
                          {challenge.isEnrolled && (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                              Enrolled
                            </Badge>
                          )}
                        </div>
                        <CardDescription className="text-sm leading-relaxed">
                          {challenge.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {challenge.isEnrolled && challenge.progress !== undefined && (
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{challenge.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${challenge.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span>{challenge.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span>{challenge.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span>Due {new Date(challenge.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="font-medium text-green-600">{challenge.prize}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {challenge.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="pt-2">
                            {challenge.isEnrolled ? (
                              <Button 
                                className="w-full" 
                                variant="outline"
                                disabled={challenge.status === 'Completed'}
                              >
                                <Code className="h-4 w-4 mr-2" />
                                {challenge.status === 'Completed' ? 'View Results' : 'Continue Challenge'}
                              </Button>
                            ) : (
                              <Button 
                                className="w-full"
                                onClick={() => enrollInChallenge(challenge.id)}
                                disabled={challenge.status === 'Completed'}
                              >
                                <Zap className="h-4 w-4 mr-2" />
                                {challenge.status === 'Upcoming' ? 'Register Now' : 'Join Challenge'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {filteredChallenges.length === 0 && (
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No challenges found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Try adjusting your search criteria or check back later for new challenges.
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