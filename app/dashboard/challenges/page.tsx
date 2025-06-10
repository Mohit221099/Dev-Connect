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
  TrendingUp,
  Plus,
  Check,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import { Challenge, User } from '../types';

interface ChallengeFormData {
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Algorithm' | 'Database' | 'DevOps';
  duration: string;
  prize: string;
  tags: string[];
  deadline: string;
  problemStatement: string;
  testCases: { input: string; output: string }[];
  company: string;
}

interface Submission {
  id: string;
  challengeId: string;
  user: string;
  code: string;
  status: 'Accepted' | 'Wrong Answer' | 'Pending';
  submittedAt: string;
}

export default function ChallengesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCodingModalOpen, setIsCodingModalOpen] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [code, setCode] = useState<string>('');
  const [challengeFormData, setChallengeFormData] = useState<ChallengeFormData>({
    title: '',
    description: '',
    difficulty: 'Easy',
    category: 'Frontend',
    duration: '',
    prize: '',
    tags: [],
    deadline: '',
    problemStatement: '',
    testCases: [{ input: '', output: '' }],
    company: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ChallengeFormData>>({});
  const [submissionResults, setSubmissionResults] = useState<{ input: string; output: string; expected: string; passed: boolean }[]>([]);
  const [streak, setStreak] = useState(0);

  // Load challenges and submissions from localStorage on mount
  useEffect(() => {
    fetchUserData();
    let initialChallenges: Challenge[] = [];
    let initialSubmissions: Submission[] = [];

    try {
      const storedChallenges = localStorage.getItem('challenges');
      const storedSubmissions = localStorage.getItem('submissions');

      if (storedChallenges) {
        const parsedChallenges = JSON.parse(storedChallenges);
        if (Array.isArray(parsedChallenges)) {
          initialChallenges = parsedChallenges;
        }
      }

      if (storedSubmissions) {
        const parsedSubmissions = JSON.parse(storedSubmissions);
        if (Array.isArray(parsedSubmissions)) {
          initialSubmissions = parsedSubmissions;
        }
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Fallback: Initialize as empty arrays if localStorage fails
      initialChallenges = [];
      initialSubmissions = [];
    }

    // Set initial state with loaded data
    setChallenges(initialChallenges);
    setFilteredChallenges(initialChallenges);
    setSubmissions(initialSubmissions);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Persist challenges and submissions to localStorage whenever they change
  useEffect(() => {
    try {
      // Save challenges to localStorage to ensure they persist across refreshes
      // This ensures challenges are permanently available for both hirers and students
      localStorage.setItem('challenges', JSON.stringify(challenges));
      localStorage.setItem('submissions', JSON.stringify(submissions));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [challenges, submissions]);

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
        challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (challenge.company && challenge.company.toLowerCase().includes(searchQuery.toLowerCase()))
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
        ? { ...challenge, isEnrolled: true, participants: challenge.participants + 1, progress: challenge.progress || 0 }
        : challenge
    ));
    setStreak(prev => prev + 1);
  };

  const openCodingEnvironment = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCode('');
    setSubmissionResults([]);
    setIsCodingModalOpen(true);
  };

  const submitSolution = () => {
    if (!selectedChallenge) return;

    const results: { input: string; output: string; expected: string; passed: boolean }[] = [];
    let allPassed = true;

    // Simulate test case evaluation (in a real app, this would involve running the code)
    selectedChallenge.testCases.forEach(testCase => {
      const simulatedOutput = code.includes('pass') ? testCase.output : 'fail'; // Simplified simulation
      const passed = simulatedOutput === testCase.output;
      if (!passed) allPassed = false;
      results.push({
        input: testCase.input,
        output: simulatedOutput,
        expected: testCase.output,
        passed,
      });
    });

    setSubmissionResults(results);

    const newSubmission: Submission = {
      id: `${Date.now()}`,
      challengeId: selectedChallenge.id,
      user: user!.username,
      code,
      status: allPassed ? 'Accepted' : 'Wrong Answer',
      submittedAt: new Date().toISOString(),
    };

    setSubmissions(prev => [...prev, newSubmission]);

    if (allPassed) {
      setChallenges(prev => prev.map(challenge => 
        challenge.id === selectedChallenge.id 
          ? { ...challenge, progress: 100 }
          : challenge
      ));
      setStreak(prev => prev + 1);
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ChallengeFormData> = {};
    if (!challengeFormData.title.trim()) errors.title = 'Title is required';
    if (!challengeFormData.description.trim()) errors.description = 'Description is required';
    if (!challengeFormData.duration.trim()) errors.duration = 'Duration is required';
    if (!challengeFormData.prize.trim()) errors.prize = 'Prize is required';
    if (challengeFormData.tags.length === 0) errors.tags = ['At least one tag is required'];
    if (!challengeFormData.deadline) errors.deadline = 'Deadline is required';
    if (!challengeFormData.problemStatement.trim()) errors.problemStatement = 'Problem statement is required';
    if (challengeFormData.testCases.length === 0 || challengeFormData.testCases.some(tc => !tc.input || !tc.output)) {
      errors.testCases = [{ input: '', output: '' }]; // Change to an array of objects
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateChallenge = () => {
    if (!validateForm()) return;

    const newChallenge: Challenge = {
      id: `${Date.now()}`,
      title: challengeFormData.title.trim(),
      description: challengeFormData.description.trim(),
      difficulty: challengeFormData.difficulty,
      category: challengeFormData.category,
      duration: challengeFormData.duration,
      participants: 0,
      prize: challengeFormData.prize,
      tags: challengeFormData.tags,
      deadline: challengeFormData.deadline,
      status: new Date(challengeFormData.deadline) > new Date() ? 'Upcoming' : 'Active',
      company: user!.username,
      problemStatement: challengeFormData.problemStatement,
      testCases: challengeFormData.testCases,
      isEnrolled: false,
    };

    setChallenges(prev => [...prev, newChallenge]);
    setChallengeFormData({
      title: '',
      description: '',
      difficulty: 'Easy',
      category: 'Frontend',
      duration: '',
      prize: '',
      tags: [],
      deadline: '',
      problemStatement: '',
      testCases: [{ input: '', output: '' }],
      company: '',
    });
    setFormErrors({});
    setIsCreateModalOpen(false);
  };

  const handleTechInput = (value: string) => {
    const techArray = value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setChallengeFormData(prev => ({ ...prev, tags: techArray }));
    setFormErrors(prev => ({ ...prev, tags: undefined }));
  };

  const addTestCase = () => {
    setChallengeFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: '', output: '' }],
    }));
  };

  const updateTestCase = (index: number, field: 'input' | 'output', value: string) => {
    setChallengeFormData(prev => {
      const newTestCases = [...prev.testCases];
      newTestCases[index] = { ...newTestCases[index], [field]: value };
      return { ...prev, testCases: newTestCases };
    });
  };

  const removeTestCase = (index: number) => {
    setChallengeFormData(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index),
    }));
  };

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/');
  };

  const renderLeaderboard = () => {
    const completedChallenges = challenges.filter(c => c.status === 'Completed');
    const leaderboardData = completedChallenges.map(challenge => ({
      challenge: challenge.title,
      participants: challenge.participants,
      winner: `User_${Math.floor(Math.random() * 100)}`, // Simulated winner
    }));

    return (
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          {leaderboardData.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">No completed challenges yet.</p>
          ) : (
            <div className="space-y-4">
              {leaderboardData.map((entry, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{entry.challenge}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Winner: {entry.winner} | {entry.participants} participants
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
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
              <div className="flex gap-2">
                {user.userType === 'hirer' && (
                  <Button 
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Post a Challenge
                  </Button>
                )}
                <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
                  <Zap className="h-4 w-4 mr-2" />
                  Find Challenges
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Active Challenges</p>
                      <p className="text-2xl font-bold text-green-600">{challenges.filter(c => c.status === 'Active').length}</p>
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
                      <p className="text-2xl font-bold text-blue-600">{challenges.filter(c => c.isEnrolled).length}</p>
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
                      <p className="text-2xl font-bold text-purple-600">{challenges.filter(c => c.status === 'Completed').length}</p>
                    </div>
                    <Award className="h-8 w-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Streak</p>
                      <p className="text-2xl font-bold text-orange-600">{streak} days</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {renderLeaderboard()}

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
                                onClick={() => openCodingEnvironment(challenge)}
                              >
                                <Code className="h-4 w-4 mr-2" />
                                {challenge.status === 'Completed' ? 'View Results' : 'Continue Challenge'}
                              </Button>
                            ) : (
                              <Button 
                                className="w-full"
                                onClick={() => {
                                  enrollInChallenge(challenge.id);
                                  openCodingEnvironment(challenge);
                                }}
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
                    {user.userType === 'hirer' 
                      ? 'Start by posting a new challenge to find top talent.'
                      : 'Check back later for new challenges posted by hirers.'}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Post a New Challenge</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Challenge Title</Label>
                  <Input
                    id="title"
                    value={challengeFormData.title}
                    onChange={(e) => setChallengeFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter challenge title"
                    className={formErrors.title ? 'border-red-500' : ''}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs">{formErrors.title}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={challengeFormData.description}
                    onChange={(e) => setChallengeFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the challenge"
                    rows={4}
                    className={formErrors.description ? 'border-red-500' : ''}
                  />
                  {formErrors.description && <p className="text-red-500 text-xs">{formErrors.description}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="problemStatement">Problem Statement</Label>
                  <Textarea
                    id="problemStatement"
                    value={challengeFormData.problemStatement}
                    onChange={(e) => setChallengeFormData(prev => ({ ...prev, problemStatement: e.target.value }))}
                    placeholder="Detailed problem statement"
                    rows={4}
                    className={formErrors.problemStatement ? 'border-red-500' : ''}
                  />
                  {formErrors.problemStatement && <p className="text-red-500 text-xs">{formErrors.problemStatement}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={challengeFormData.difficulty}
                    onValueChange={(value) => setChallengeFormData(prev => ({ ...prev, difficulty: value as 'Easy' | 'Medium' | 'Hard' }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={challengeFormData.category}
                    onValueChange={(value) => setChallengeFormData(prev => ({ ...prev, category: value as ChallengeFormData['category'] }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Full Stack">Full Stack</SelectItem>
                      <SelectItem value="Algorithm">Algorithm</SelectItem>
                      <SelectItem value="Database">Database</SelectItem>
                      <SelectItem value="DevOps">DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={challengeFormData.duration}
                    onChange={(e) => setChallengeFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 5 days"
                    className={formErrors.duration ? 'border-red-500' : ''}
                  />
                  {formErrors.duration && <p className="text-red-500 text-xs">{formErrors.duration}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prize">Prize</Label>
                  <Input
                    id="prize"
                    value={challengeFormData.prize}
                    onChange={(e) => setChallengeFormData(prev => ({ ...prev, prize: e.target.value }))}
                    placeholder="e.g., $200 + Certificate"
                    className={formErrors.prize ? 'border-red-500' : ''}
                  />
                  {formErrors.prize && <p className="text-red-500 text-xs">{formErrors.prize}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    placeholder="e.g., React, Node.js, MongoDB"
                    onChange={(e) => handleTechInput(e.target.value)}
                    className={formErrors.tags ? 'border-red-500' : ''}
                  />
                  {formErrors.tags && <p className="text-red-500 text-xs">{formErrors.tags}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={challengeFormData.deadline}
                    onChange={(e) => setChallengeFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className={formErrors.deadline ? 'border-red-500' : ''}
                  />
                  {formErrors.deadline && <p className="text-red-500 text-xs">{formErrors.deadline}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Test Cases</Label>
                  {challengeFormData.testCases.map((testCase, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        placeholder="Input"
                        value={testCase.input}
                        onChange={(e) => updateTestCase(index, 'input', e.target.value)}
                        className="flex-1"
                      />
                      <Input
                        placeholder="Output"
                        value={testCase.output}
                        onChange={(e) => updateTestCase(index, 'output', e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="destructive" size="sm" onClick={() => removeTestCase(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addTestCase}>
                    Add Test Case
                  </Button>
                  {formErrors.testCases && <p className="text-red-500 text-xs">{formErrors.testCases}</p>}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                  setIsCreateModalOpen(false);
                  setFormErrors({});
                }}>
                  Cancel
                </Button>
                <Button onClick={handleCreateChallenge}>
                  Post Challenge
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCodingModalOpen} onOpenChange={setIsCodingModalOpen}>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>{selectedChallenge?.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Problem Statement</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedChallenge?.problemStatement}</p>
                </div>
                <div className="space-y-2">
                  <Label>Test Cases</Label>
                  {selectedChallenge?.testCases.map((testCase, index) => (
                    <div key={index} className="border p-2 rounded">
                      <p className="text-sm"><strong>Input:</strong> {testCase.input}</p>
                      <p className="text-sm"><strong>Output:</strong> {testCase.output}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Your Solution</Label>
                  <Textarea
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Write your code here..."
                    rows={10}
                    className="font-mono"
                  />
                </div>
                {submissionResults.length > 0 && (
                  <div className="space-y-2">
                    <Label>Submission Results</Label>
                    {submissionResults.map((result, index) => (
                      <div key={index} className="border p-2 rounded flex items-center gap-2">
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm"><strong>Input:</strong> {result.input}</p>
                          <p className="text-sm"><strong>Output:</strong> {result.output}</p>
                          <p className="text-sm"><strong>Expected:</strong> {result.expected}</p>
                          <p className="text-sm"><strong>Status:</strong> {result.passed ? 'Passed' : 'Failed'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Submission History</Label>
                  {submissions
                    .filter(sub => sub.challengeId === selectedChallenge?.id)
                    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
                    .slice(0, 5)
                    .map((submission, index) => (
                      <div key={index} className="border p-2 rounded flex items-center gap-2">
                        {submission.status === 'Accepted' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm"><strong>Status:</strong> {submission.status}</p>
                          <p className="text-sm"><strong>Submitted:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCodingModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={submitSolution}>
                  Submit Solution
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}