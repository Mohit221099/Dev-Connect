"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code, Users, Trophy, Rocket, Star, GitBranch, CheckCircle, Play, ChevronRight, Globe, Shield, Zap, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Student", "Developer", "Freelancer", "Graduate"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Smart Portfolio Builder",
      description: "Create stunning portfolios with AI-powered project analysis and automatic skill detection",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Intelligent Matching",
      description: "Advanced algorithms connect the right talent with the perfect opportunities",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Live Coding Challenges",
      description: "Real-time collaborative coding environments with instant feedback and scoring",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Career Acceleration",
      description: "Personalized learning paths and mentorship programs to fast-track your career",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Developers", icon: <Users className="h-6 w-6" /> },
    { number: "1.2K+", label: "Partner Companies", icon: <Globe className="h-6 w-6" /> },
    { number: "15K+", label: "Projects Deployed", icon: <Rocket className="h-6 w-6" /> },
    { number: "98%", label: "Success Rate", icon: <TrendingUp className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "DevConnect helped me land my dream job at Google. The platform's challenges really prepared me for technical interviews."
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO at TechStart",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "We've hired 15+ developers through DevConnect. The quality of talent and the screening process is exceptional."
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "From bootcamp graduate to senior developer in 18 months. DevConnect's mentorship program was game-changing."
    }
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
              <Link href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 font-medium">
                How it Works
              </Link>
              <Link href="#testimonials" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 font-medium">
                Success Stories
              </Link>
              <Link href="#pricing" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-200 font-medium">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="font-medium" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium" asChild>
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-6 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700 mb-8">
              <Star className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Trusted by 50,000+ developers worldwide</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                Where Elite Talent
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Meets Innovation
              </span>
            </h1>
            
            <div className="text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-6 font-light">
              The future belongs to{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {roles[currentRole]}
              </span>
              <span className="inline-block w-1 h-8 bg-blue-600 ml-1 animate-pulse"></span>
            </div>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the most advanced platform connecting exceptional developers with visionary companies. 
              Showcase your skills, solve real challenges, and accelerate your career with AI-powered matching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
                <Link href="/register">
                  Start Your Journey
                  <Rocket className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-10 py-4 text-lg font-semibold border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200" asChild>
                <Link href="#demo">
                  <Play className="mr-3 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-sm font-medium text-slate-500">Trusted by teams at:</div>
              {['Google', 'Microsoft', 'Meta', 'Netflix', 'Spotify'].map((company) => (
                <div key={company} className="text-lg font-semibold text-slate-400">{company}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-y border-slate-200/60 dark:border-slate-700/60">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-700 mb-6">
                <Zap className="h-4 w-4 text-purple-600 mr-2" />
                <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Powerful Features</span>
              </div>
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                From intelligent project showcasing to AI-powered candidate matching, 
                we provide cutting-edge tools that transform how talent connects with opportunity.
              </p>
            </motion.div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-200`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Button variant="ghost" className="mt-4 p-0 h-auto font-semibold text-blue-600 hover:text-blue-700">
                      Learn more <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Join thousands who have transformed their careers through DevConnect
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex text-yellow-400 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
              Join the elite network of developers and companies shaping the future of technology. 
              Your next breakthrough is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
                <Link href="/register?type=student">
                  Join as Developer
                  <GitBranch className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 text-lg font-semibold transition-all duration-300" asChild>
                <Link href="/register?type=hirer">
                  Hire Top Talent
                  <Users className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">DevConnect</span>
                  <div className="text-sm text-slate-400">Professional Network</div>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                The world's most advanced platform for connecting exceptional developers 
                with innovative companies. Built by developers, for developers.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Users className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-slate-700 transition-colors cursor-pointer">
                  <Code className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">For Developers</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/projects" className="hover:text-white transition-colors">Browse Projects</Link></li>
                <li><Link href="/challenges" className="hover:text-white transition-colors">Coding Challenges</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors">Create Portfolio</Link></li>
                <li><Link href="/mentorship" className="hover:text-white transition-colors">Find Mentors</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">For Companies</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/talent" className="hover:text-white transition-colors">Find Talent</Link></li>
                <li><Link href="/post-challenge" className="hover:text-white transition-colors">Post Challenges</Link></li>
                <li><Link href="/hiring" className="hover:text-white transition-colors">Hiring Solutions</Link></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400">&copy; 2024 DevConnect. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Badge variant="outline" className="border-green-500 text-green-400">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                All systems operational
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}