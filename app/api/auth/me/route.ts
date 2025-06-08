import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

function getTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie
  const cookie = request.cookies.get('auth-token');
  return cookie?.value || null;
}

function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; userType: string };
    return decoded;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('=== Auth Me API Called ===');
    
    await connectDB();
    console.log('Database connected');

    // Get token from request
    const token = getTokenFromRequest(request);
    console.log('Token found:', !!token);

    if (!token) {
      console.log('No token provided');
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = verifyToken(token);
    console.log('Token verification result:', !!payload);
    
    if (!payload) {
      console.log('Invalid token');
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    console.log('Token payload:', { userId: payload.userId, userType: payload.userType });

    // Find user
    const user = await User.findById(payload.userId).select('-password');
    console.log('User found:', !!user);
    
    if (!user) {
      console.log('User not found for ID:', payload.userId);
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Returning user data for:', user.email);
    
    return NextResponse.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        bio: user.bio || null,
        company: user.company || null,
        position: user.position || null,
        education: user.education || null,
        github: user.github || null,
        linkedin: user.linkedin || null,
        website: user.website || null,
        skills: user.skills || [],
        location: user.location || null,
        verified: user.verified || false,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error('Auth me error:', error);
    
    // Log detailed error info
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}