export interface Challenge {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    category: 'Frontend' | 'Backend' | 'Full Stack' | 'Algorithm' | 'Database' | 'DevOps';
    duration: string;
    participants: number;
    prize: string;
    tags: string[];
    deadline: string;
    status: 'Active' | 'Completed' | 'Upcoming';
    progress?: number;
    isEnrolled?: boolean;
    company?: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    status: 'In Progress' | 'Completed' | 'Planned';
    contributors: number;
    lastUpdated: string;
    likes: number;
    views: number;
    progress?: number;
    isContributor?: boolean;
    owner?: string;
  }
  
  export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    skills: string[];
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    salary: string;
    postedDate: string;
    applicants: number;
    isApplied?: boolean;
  }
  
  export interface User {
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
    avatar?: string;
  }