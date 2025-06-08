"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Save, 
  Edit, 
  X, 
  CheckCircle, 
  Loader2, 
  Camera, 
  Upload 
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Header';
import { User as UserType } from '../types';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserType>>({});
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setFormData(data.user);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      router.push('/login');
    } finally {
      setUserLoading(false);
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid File',
          description: 'Please upload an image file.',
          variant: 'destructive',
        });
        return;
      }
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: 'File Too Large',
          description: 'Image size must be under 2MB.',
          variant: 'destructive',
        });
        return;
      }

      // Preview locally
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formDataUpload = new FormData();
      formDataUpload.append('avatar', file);
      try {
        const uploadResponse = await fetch('/api/upload/avatar', {
          method: 'POST',
          body: formDataUpload,
        });
        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json();
          setFormData(prev => ({ ...prev, avatar: url }));
          toast({
            title: 'Avatar Uploaded',
            description: 'Your avatar has been uploaded successfully.',
            variant: 'default',
          });
        } else {
          const error = await uploadResponse.json();
          toast({
            title: 'Upload Error',
            description: error.message || 'Failed to upload avatar.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        toast({
          title: 'Upload Error',
          description: 'An unexpected error occurred while uploading.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    console.log('Sending PUT to:', `/api/users/${user._id}`, 'Data:', formData); // Debug
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const responseData = await response.text();
      console.log('Response:', response.status, responseData); // Debug
      if (response.ok) {
        const updatedUser = JSON.parse(responseData);
        setUser(updatedUser);
        setFormData(updatedUser);
        setIsEditing(false);
        setAvatarPreview(null);
        toast({
          title: 'Profile Updated',
          description: 'Your profile has been successfully updated.',
          variant: 'default',
        });
      } else {
        try {
          const error = JSON.parse(responseData);
          toast({
            title: 'Error',
            description: error.message || 'Failed to update profile.',
            variant: 'destructive',
          });
        } catch {
          toast({
            title: 'Error',
            description: 'Invalid response from server.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user || {});
    setIsEditing(false);
    setAvatarPreview(null);
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

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header user={user} onLogout={handleLogout} />
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl">
            {/* Cover Image */}
            <div className="relative h-32 sm:h-48 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Profile Header */}
            <CardHeader className="relative pb-0 -mt-16 sm:-mt-20">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white dark:border-gray-800 shadow-lg">
                    <AvatarImage 
                      src={avatarPreview || formData.avatar || ''} 
                      alt={`${user.name}'s profile`} 
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl sm:text-4xl font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full p-2 bg-white dark:bg-gray-800 shadow-md"
                      onClick={() => fileInputRef.current?.click()}
                      aria-label="Change avatar"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </h1>
                    {user.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" aria-label="Verified" />
                    )}
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 capitalize">
                    {user.userType}
                  </p>
                  {user.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {user.location}
                    </p>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              <div className="flex justify-end mb-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={saving}>
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </>
                      )}
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <Label htmlFor="bio" className="flex items-center gap-2 text-sm font-medium">
                    <Code className="h-4 w-4" />
                    Bio
                  </Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      name="bio"
                      value={formData.bio || ''}
                      onChange={handleInputChange}
                      className="mt-2"
                      rows={4}
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      {user.bio || 'No bio provided.'}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Name */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="mt-2"
                        required
                      />
                    ) : (
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{user.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="mt-2"
                        required
                        disabled
                      />
                    ) : (
                      <p className="mt-2 text-gray-600 dark:text-gray-300">{user.email}</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location" className="flex items-center gap-2 text-sm font-medium">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        name="location"
                        value={formData.location || ''}
                        onChange={handleInputChange}
                        className="mt-2"
                        placeholder="e.g., San Francisco, CA"
                      />
                    ) : (
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {user.location || 'Not specified.'}
                      </p>
                    )}
                  </div>

                  {/* Conditional Fields */}
                  {user.userType === 'hirer' ? (
                    <>
                      {/* Company */}
                      <div>
                        <Label htmlFor="company" className="flex items-center gap-2 text-sm font-medium">
                          <Briefcase className="h-4 w-4" />
                          Company
                        </Label>
                        {isEditing ? (
                          <Input
                            id="company"
                            name="company"
                            value={formData.company || ''}
                            onChange={handleInputChange}
                            className="mt-2"
                            placeholder="e.g., TechCorp"
                          />
                        ) : (
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {user.company || 'Not specified.'}
                          </p>
                        )}
                      </div>

                      {/* Position */}
                      <div>
                        <Label htmlFor="position" className="flex items-center gap-2 text-sm font-medium">
                          <Briefcase className="h-4 w-4" />
                          Position
                        </Label>
                        {isEditing ? (
                          <Input
                            id="position"
                            name="position"
                            value={formData.position || ''}
                            onChange={handleInputChange}
                            className="mt-2"
                            placeholder="e.g., Software Engineer"
                          />
                        ) : (
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {user.position || 'Not specified.'}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Education */}
                      <div>
                        <Label htmlFor="education" className="flex items-center gap-2 text-sm font-medium">
                          <GraduationCap className="h-4 w-4" />
                          Education
                        </Label>
                        {isEditing ? (
                          <Input
                            id="education"
                            name="education"
                            value={formData.education || ''}
                            onChange={handleInputChange}
                            className="mt-2"
                            placeholder="e.g., B.S. Computer Science"
                          />
                        ) : (
                          <p className="mt-2 text-gray-600 dark:text-gray-300">
                            {user.education || 'Not specified.'}
                          </p>
                        )}
                      </div>

                      {/* Skills */}
                      <div>
                        <Label htmlFor="skills" className="flex items-center gap-2 text-sm font-medium">
                          <Code className="h-4 w-4" />
                          Skills
                        </Label>
                        {isEditing ? (
                          <Input
                            id="skills"
                            name="skills"
                            value={formData.skills?.join(', ') || ''}
                            onChange={handleSkillsChange}
                            className="mt-2"
                            placeholder="e.g., React, Node.js, Python"
                          />
                        ) : (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {user.skills?.length ? (
                              user.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary">
                                  {skill}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-gray-600 dark:text-gray-300">No skills listed.</p>
                            )}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}