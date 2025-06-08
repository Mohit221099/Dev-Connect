"use client";

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Code, Bell, Search, Users, LogOut } from 'lucide-react';
import Link from 'next/link';
import { User } from './types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 dark:border-gray-700/60 sticky top-0 z-50 shadow-sm">
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
              <div className="text-sm text-slate-500 dark:text-slate-400">Professional Network</div>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className={`font-medium transition-colors ${pathname === '/dashboard' 
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'}`}
            >
              Dashboard
            </Link>
            <Link 
              href="/dashboard/projects" 
              className={`font-medium transition-colors ${pathname === '/dashboard/projects' 
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'}`}
            >
              Projects
            </Link>
            <Link 
              href="/dashboard/challenges" 
              className={`font-medium transition-colors ${pathname === '/dashboard/challenges' 
                ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'}`}
            >
              Challenges
            </Link>
            {user.userType === 'student' ? (
              <Link 
                href="/dashboard/discover" 
                className={`font-medium transition-colors ${pathname === '/dashboard/discover' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-white'}`}
              >
                Discover
              </Link>
            ) : (
              <Link 
                href="/dashboard/talent" 
                className={`font-medium transition-colors ${pathname === '/dashboard/talent' 
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1' 
                  : 'text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white'}`}
              >
                Talent
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-400 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
            <Link href="/dashboard/profile" className="group">
              <Avatar className="h-10 w-10 border-2 border-blue-200 group-hover:border-blue-400 transition-colors">
                <AvatarImage src={user.avatar || ''} alt={`${user.name}'s profile`} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}