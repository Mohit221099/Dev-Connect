"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  ArrowRight, Code, Users, Trophy, Rocket, Star, GitBranch, CheckCircle, 
  Play, ChevronRight, Globe, Shield, Zap, TrendingUp, Sparkles, Code2, 
  Terminal, Server, Database, Facebook, Twitter, Instagram, Linkedin, Mail 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomePage() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = ["Student", "Developer", "Freelancer", "Graduate"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Smart Portfolio Builder",
      description: "Create stunning portfolios with AI-powered project analysis and automatic skill detection.",
      color: "from-blue-600 to-indigo-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Intelligent Matching",
      description: "Advanced algorithms connect the right talent with the perfect opportunities.",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Live Coding Challenges",
      description: "Real-time collaborative coding environments with instant feedback and scoring.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Career Acceleration",
      description: "Personalized learning paths and mentorship programs to fast-track your career.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const stats = [
    { number: "50K+", label: "Active Developers", icon: <Users className="h-6 w-6" /> },
    { number: "1.2K+", label: "Partner Companies", icon: <Globe className="h-6 w-6" /> },
    { number: "15K+", label: "Projects Deployed", icon: <Rocket className="h-6 w-6" /> },
    { number: "98%", label: "Success Rate", icon: <TrendingUp className="h-6 w-6" /> },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      quote: "DevConnect helped me land my dream job at Google. The platform's challenges really prepared me for technical interviews.",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO at TechStart",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "We've hired 15+ developers through DevConnect. The quality of talent and the screening process is exceptional.",
      gradient: "from-purple-600 to-pink-600",
    },
    {
      name: "Emily Johnson",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "From bootcamp graduate to senior developer in 18 months. DevConnect's mentorship program was game-changing.",
      gradient: "from-green-500 to-teal-600",
    },
  ];

  const whyChooseUs = [
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Proven Success",
      description: "Trusted by 50,000+ developers and 1,200+ companies with a 98% success rate.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "AI-Driven Innovation",
      description: "Leverage cutting-edge AI to match talent and opportunities with precision.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Platform",
      description: "Enterprise-grade security to protect your data and privacy.",
    },
  ];

  const featuredProjects = [
    {
      title: "AI-Powered Chatbot",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop",
      description: "A scalable chatbot solution built by DevConnect developers, now serving millions of users.",
      skills: ["Python", "TensorFlow", "AWS"],
    },
    {
      title: "E-Commerce Platform",
      company: "ShopEasy",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=300&h=200&fit=crop",
      description: "A fully responsive e-commerce platform with advanced payment integrations.",
      skills: ["React", "Node.js", "Stripe"],
    },
    {
      title: "Health Monitoring App",
      company: "MediTech",
      image: "https://images.unsplash.com/photo-1576091160550-2173fd1be5af?w=300&h=200&fit=crop",
      description: "A mobile app for real-time health monitoring, developed by top talent on DevConnect.",
      skills: ["Flutter", "Firebase", "IoT"],
    },
  ];

  const techStack = [
    { name: "React", icon: <Code className="h-6 w-6" /> },
    { name: "Node.js", icon: <Server className="h-6 w-6" /> },
    { name: "Python", icon: <Terminal className="h-6 w-6" /> },
    { name: "Java", icon: <Code2 className="h-6 w-6" /> },
    { name: "AWS", icon: <Database className="h-6 w-6" /> },
    { name: "Docker", icon: <Server className="h-6 w-6" /> },
  ];

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const roleVariants = {
    enter: { y: 20, opacity: 0 },
    center: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-x-hidden">
      {/* Animated Particles Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/70 backdrop-blur-2xl dark:bg-slate-900/70 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Code className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  DevConnect
                </span>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Professional Network</div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              {['Features', 'How It Works', 'Success Stories', 'Pricing'].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="relative text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-all duration-300 font-medium group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all duration-200" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-medium"
                asChild
              >
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200/50 dark:border-blue-700/50 mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2 animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                Trusted by 50,000+ developers worldwide
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
                Where Elite Talent
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Meets Innovation
              </span>
            </h1>

            <div className="text-2xl sm:text-3xl md:text-4xl text-slate-600 dark:text-slate-300 mb-6 font-light flex items-center justify-center h-12">
              <span>The future belongs to </span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentRole}
                  variants={roleVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="mx-2 font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                >
                  {roles[currentRole]}
                </motion.span>
              </AnimatePresence>
              <span className="inline-block w-1 h-8 bg-blue-600 animate-pulse"></span>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join the most advanced platform connecting exceptional developers with visionary companies. 
              Showcase your skills, solve real challenges, and accelerate your career with AI-powered matching.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 sm:px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                asChild
              >
                <Link href="/register">
                  Start Your Journey
                  <Rocket className="ml-3 h-5 w-5 group-hover:animate-bounce" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group px-8 sm:px-10 py-4 text-lg font-semibold border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300 hover:shadow-xl"
                asChild
              >
                <Link href="#demo">
                  <Play className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerChildren}
              className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-70"
            >
              <motion.div variants={fadeInUp} className="text-sm font-medium text-slate-500">
                Trusted by teams at:
              </motion.div>
              {['Google', 'Microsoft', 'Meta', 'Netflix', 'Spotify'].map((company, index) => (
                <motion.div
                  key={company}
                  variants={fadeInUp}
                  className="text-base sm:text-lg font-semibold text-slate-400 hover:text-slate-600 transition-all duration-300 cursor-pointer transform hover:scale-110"
                >
                  {company}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-y border-slate-200/60 dark:border-slate-700/60">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                  <div className="text-white">{stat.icon}</div>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2 group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-white to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Why Choose DevConnect?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              We’re more than a platform—we’re a partner in your success, offering unparalleled tools and opportunities.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          >
            {whyChooseUs.map((reason, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 border-0 bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">{reason.icon}</div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors duration-300">
                      {reason.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 dark:bg-purple-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 mb-6 backdrop-blur-sm">
              <Zap className="h-4 w-4 text-purple-600 mr-2" />
              <span className="text-sm font-semibold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                Powerful Features
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              From intelligent project showcasing to AI-powered candidate matching, 
              we provide cutting-edge tools that transform how talent connects with opportunity.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 border-0 bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <CardHeader className="pb-4 relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Button variant="ghost" className="group/btn mt-4 p-0 h-auto font-semibold text-blue-600 hover:text-blue-700">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Technologies We Support
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Work with the tools you love. We support a wide range of technologies to help you build and grow.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg group-hover:shadow-blue-500/20 transition-all duration-500">
                  <div className="text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <span className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white">{tech.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-purple-200">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              See how DevConnect developers are building the future with innovative solutions.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          >
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="group hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 border-0 bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div className="relative mb-6">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="rounded-lg object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{project.company}</p>
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="group/btn w-full font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 sm:py-24 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 sm:mb-20"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands who have transformed their careers through DevConnect.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
              >
                <Card className="group h-full bg-gradient-to-br from-white/90 to-blue-50/50 dark:from-slate-800/90 dark:to-slate-700/50 backdrop-blur-xl border-0 shadow-lg hover:shadow-blue-500/10 transition-all duration-700 overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={60}
                          height={60}
                          className="rounded-full mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r ${testimonial.gradient} rounded-full border-2 border-white flex items-center justify-center`}>
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-slate-700 dark:text-slate-300 text-base sm:text-lg italic leading-relaxed mb-4">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-current hover:scale-125 transition-transform duration-200"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center text-white"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform Your Career?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Join the elite network of developers and companies shaping the future of technology. 
              Your next breakthrough is just one click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="group bg-white text-blue-600 hover:bg-gray-50 px-8 sm:px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-white/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                asChild
              >
                <Link href="/register?type=student">
                  Join as Developer
                  <GitBranch className="ml-3 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 sm:px-10 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                asChild
              >
                <Link href="/register?type=hirer">
                  Hire Top Talent
                  <Users className="ml-3 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-7 w-7 text-white" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold">DevConnect</span>
                  <div className="text-sm text-slate-400 font-medium">Professional Network</div>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed text-base sm:text-lg">
                The world's most advanced platform for connecting exceptional developers 
                with innovative companies. Built by developers, for developers.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "https://facebook.com" },
                  { Icon: Twitter, href: "https://twitter.com" },
                  { Icon: Instagram, href: "https://instagram.com" },
                  { Icon: Linkedin, href: "https://linkedin.com" },
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-all duration-300 cursor-pointer group"
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg sm:text-xl">For Developers</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/projects" className="hover:text-white transition-colors text-base sm:text-lg">Browse Projects</Link></li>
                <li><Link href="/challenges" className="hover:text-white transition-colors text-base sm:text-lg">Coding Challenges</Link></li>
                <li><Link href="/portfolio" className="hover:text-white transition-colors text-base sm:text-lg">Create Portfolio</Link></li>
                <li><Link href="/mentorship" className="hover:text-white transition-colors text-base sm:text-lg">Find Mentors</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg sm:text-xl">For Companies</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/talent" className="hover:text-white transition-colors text-base sm:text-lg">Find Talent</Link></li>
                <li><Link href="/post-challenge" className="hover:text-white transition-colors text-base sm:text-lg">Post Challenges</Link></li>
                <li><Link href="/hiring" className="hover:text-white transition-colors text-base sm:text-lg">Hiring Solutions</Link></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors text-base sm:text-lg">Enterprise</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-6 text-lg sm:text-xl">Company</h4>
              <ul className="space-y-3 text-slate-300">
                <li><Link href="/about" className="hover:text-white transition-colors text-base sm:text-lg">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors text-base sm:text-lg">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors text-base sm:text-lg">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors text-base sm:text-lg">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <p className="text-slate-400 text-base sm:text-lg">© {new Date().getFullYear()} DevConnect. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              <Badge variant="outline" className="border-green-500 text-green-400 px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                All systems operational
              </Badge>
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors text-base sm:text-lg">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors text-base sm:text-lg">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors text-base sm:text-lg">
                <Mail className="h-5 w-5 inline-block mr-2" />
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
          100% {
            transform: translateY(0);
            opacity: 0.2;
          }
        }
        .animate-float {
          animation: float infinite;
        }
      `}</style>
    </div>
  );
}