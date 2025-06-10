"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Users, Briefcase, GraduationCap, MessageCircle, UserPlus } from 'lucide-react';
import { User } from '../types';

interface StudentProfile {
  id: string;
  name: string;
  headline: string;
  location: string;
  skills: string[];
  experience: { title: string; company: string; duration: string }[];
  education: { degree: string; institution: string; year: string }[];
  avatar: string;
}

interface TalentsPageProps {
  user: User | null;
  onLogout: () => void;
}

export default function TalentsPage({ user, onLogout }: TalentsPageProps) {
  const router = useRouter();
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // Start with false
  const [error, setError] = useState<string | null>(null);
  const [redirecting, setRedirecting] = useState(false);

  // Check user authentication and type
  useEffect(() => {
    // If no user provided, don't do anything - let parent handle auth
    if (!user) {
      console.log('No user provided to TalentsPage');
      return;
    }

    // If user is not a hirer, redirect them
    if (user.userType !== 'hirer') {
      console.log('User is not a hirer, redirecting...', user.userType);
      setRedirecting(true);
      
      // Use a small delay to show the redirect message
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

      return () => clearTimeout(timer);
    }

    // Only fetch data if user is a hirer
    if (user.userType === 'hirer') {
      fetchStudents();
    }
  }, [user, router]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, fetch from API: const response = await fetch('/api/students');
      const mockStudents: StudentProfile[] = [
        {
          id: '1',
          name: 'Alice Johnson',
          headline: 'Frontend Developer | React & TypeScript',
          location: 'San Francisco, CA',
          skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML'],
          experience: [
            { title: 'Frontend Developer', company: 'TechCorp', duration: '2023 - Present' },
            { title: 'Junior Developer', company: 'StartUp Inc.', duration: '2021 - 2023' },
          ],
          education: [
            { degree: 'B.S. in Computer Science', institution: 'Stanford University', year: '2021' },
          ],
          avatar: '',
        },
        {
          id: '2',
          name: 'Bob Smith',
          headline: 'Backend Developer | Node.js & MongoDB',
          location: 'New York, NY',
          skills: ['Node.js', 'MongoDB', 'Express', 'Python', 'AWS'],
          experience: [
            { title: 'Backend Developer', company: 'DataSys', duration: '2022 - Present' },
          ],
          education: [
            { degree: 'M.S. in Software Engineering', institution: 'NYU', year: '2022' },
          ],
          avatar: '',
        },
        {
          id: '3',
          name: 'Clara Davis',
          headline: 'Full Stack Developer | Java & Angular',
          location: 'Austin, TX',
          skills: ['Java', 'Angular', 'Spring Boot', 'MySQL', 'Docker'],
          experience: [
            { title: 'Full Stack Developer', company: 'InnoTech', duration: '2023 - Present' },
            { title: 'Software Engineer Intern', company: 'BigCorp', duration: '2022 - 2023' },
          ],
          education: [
            { degree: 'B.S. in Computer Engineering', institution: 'UT Austin', year: '2022' },
          ],
          avatar: '',
        },
      ];

      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to load talent profiles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Filter students based on search query
  useEffect(() => {
    const filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredStudents(filtered);
  }, [searchQuery, students]);

  const handleConnect = (studentId: string) => {
    // In a real app, this would send a connection request (e.g., via API)
    alert(`Connection request sent to student with ID: ${studentId}`);
  };

  const handleViewProfile = (studentId: string) => {
    // Navigate to the student's profile page
    router.push(`/dashboard/profile/${studentId}`);
  };

  const handleRetry = () => {
    if (user && user.userType === 'hirer') {
      fetchStudents();
    }
  };

  // Show loading state when no user is provided (let parent component handle auth)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header user={user} onLogout={onLogout} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Authenticating...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show unauthorized message if user is not a hirer
  if (user.userType !== 'hirer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header user={user} onLogout={onLogout} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Access Restricted
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This section is only available for hirers. {redirecting ? 'Redirecting to your dashboard...' : 'You will be redirected to your dashboard.'}
            </p>
            {redirecting ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            ) : (
              <Button onClick={() => router.push('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
                Go to Dashboard
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Header user={user} onLogout={onLogout} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading talent profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header user={user} onLogout={onLogout} />
      <div className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Page Title and Search Bar */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Users className="h-8 w-8 text-blue-600" />
                  Talent Search
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Discover top talent for your company
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name, skills, location, or headline..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <div className="flex items-center justify-between">
                <span className="block sm:inline">{error}</span>
                <div className="flex gap-2">
                  <button 
                    onClick={handleRetry}
                    className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                  >
                    Retry
                  </button>
                  <button 
                    onClick={() => setError(null)} 
                    className="text-red-700 hover:text-red-900"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Student Profiles List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={student.avatar} alt={`${student.name}'s profile`} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                        {student.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{student.headline}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{student.location}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Skills
                    </h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {student.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" /> Experience
                    </h4>
                    <div className="mt-2 space-y-2">
                      {student.experience.map((exp, index) => (
                        <div key={index}>
                          <p className="text-sm font-medium">{exp.title}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{exp.company}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{exp.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Education
                    </h4>
                    <div className="mt-2 space-y-2">
                      {student.education.map((edu, index) => (
                        <div key={index}>
                          <p className="text-sm font-medium">{edu.degree}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConnect(student.id)}
                      className="flex-1"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleViewProfile(student.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredStudents.length === 0 && !loading && !error && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No talent found
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Try adjusting your search criteria to find more candidates.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}