import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Login API Called ===');
    
    // Connect to database
    await connectDB();
    console.log('Database connected successfully');

    const body = await request.json();
    const { email, password, userType } = body;

    console.log('Login request data:', { 
      email, 
      userType, 
      hasPassword: !!password 
    });

    // Validate required fields
    if (!email || !password || !userType) {
      console.log('Missing required fields:', { 
        email: !!email, 
        password: !!password, 
        userType: !!userType 
      });
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate userType
    if (!['student', 'hirer'].includes(userType)) {
      console.log('Invalid userType:', userType);
      return NextResponse.json(
        { message: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Find user by email and userType
    const searchEmail = email.toLowerCase().trim();
    console.log('Searching for user with:', { email: searchEmail, userType });
    
    // First, let's check if user exists with just email
    const userByEmail = await User.findOne({ email: searchEmail });
    console.log('User found by email only:', {
      found: !!userByEmail,
      email: userByEmail?.email,
      userType: userByEmail?.userType,
      requestedUserType: userType
    });
    
    const user = await User.findOne({ 
      email: searchEmail,
      userType: userType
    });

    console.log('User search result:', {
      found: !!user,
      email: user?.email,
      userType: user?.userType,
      hasPassword: !!user?.password
    });

    if (!user) {
      console.log('User not found with credentials:', { email: searchEmail, userType });
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    console.log('Verifying password...');
    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      console.log('Invalid password for user:', user.email);
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    console.log('Password verified successfully');

    // Generate token
    const token = generateToken(user._id.toString(), user.userType);
    console.log('Token generated successfully');

    // Return success response (without password)
    const userResponse = {
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
    };

    console.log('Login successful for user:', user.email);

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse,
      token,
    });

  } catch (error) {
    console.error('Login API error:', error);
    
    // Log more detailed error information
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