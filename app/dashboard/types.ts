export interface User {
    _id: string;
    name: string;
    email: string;
    username: string; // Added to reconcile with ChallengesPage.tsx and ProjectsPage.tsx
    userType: 'student' | 'hirer' | 'developer'; // Unified user types
    bio?: string;
    company?: string;
    position?: string;
    education?: string;
    skills?: string[];
    location?: string;
    verified: boolean;
    avatar?: string;
  }
  
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
    status: 'Active' | 'Upcoming' | 'Completed';
    company?: string;
    problemStatement: string;
    testCases: { input: string; output: string }[];
    isEnrolled: boolean; // Made required to align with ChallengesPage.tsx logic
    progress?: number;
  }
  
  export interface ChallengeFormData {
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
  
  export interface Submission {
    id: string;
    challengeId: string;
    user: string;
    code: string;
    status: 'Accepted' | 'Wrong Answer' | 'Pending';
    submittedAt: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    tech: string[];
    status: 'Planned' | 'In Progress' | 'Completed';
    contributors: number;
    lastUpdated: string;
    likes: number;
    views: number;
    progress: number; // Made required as it's used in UI (progress bar)
    isContributor: boolean; // Made required to align with ProjectsPage.tsx logic
    owner: string; // Made required as every project has an owner
    category: 'Web Development' | 'AI/ML' | 'Data Visualization' | 'Mobile Development' | 'DevOps';
    visibility: 'public' | 'private';
    contributionCount: number;
    stars: number;
    isStarred: boolean;
    coverImage: string | null; // Refined to string | null for clarity
    isArchived: boolean;
  }
  
  export interface Contribution {
    id: string;
    date: string;
    count: number;
    projectId: string;
    type: 'created' | 'joined' | 'updated';
    user: string;
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
    isApplied: boolean; // Made required to align with expected usage
  }