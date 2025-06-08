import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword, generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Registration API Called ===');
    
    await connectDB();
    console.log('Database connected successfully');

    const body = await request.json();
    const { email, password, name, userType, bio, company, position, education, github } = body;

    console.log('Registration request data:', { 
      email, 
      name, 
      userType, 
      hasPassword: !!password 
    });

    // Validate required fields
    if (!email || !password || !name || !userType) {
      console.log('Missing required fields:', { 
        email: !!email, 
        password: !!password, 
        name: !!name, 
        userType: !!userType 
      });
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
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

    // Check if user already exists
    const searchEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: searchEmail });
    
    console.log('Existing user check:', {
      email: searchEmail,
      exists: !!existingUser,
      existingUserType: existingUser?.userType
    });
    
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    console.log('Hashing password...');
    const hashedPassword = await hashPassword(password);
    console.log('Password hashed successfully');

    // Create user data
    const userData: any = {
      email: searchEmail,
      password: hashedPassword,
      name: name.trim(),
      userType,
      bio: bio?.trim() || '',
    };

    // Add role-specific fields
    if (userType === 'hirer') {
      userData.company = company?.trim() || '';
      userData.position = position?.trim() || '';
    } else {
      userData.education = education?.trim() || '';
      userData.github = github?.trim() || '';
    }

    console.log('Creating user with data:', {
      email: userData.email,
      name: userData.name,
      userType: userData.userType,
      hasPassword: !!userData.password
    });

    // Create user
    const user = await User.create(userData);
    console.log('User created successfully with ID:', user._id);

    // Generate token
    const token = generateToken(user._id.toString(), user.userType);
    console.log('Token generated successfully');

    // Return success response (without password)
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      userType: user.userType,
      bio: user.bio,
      company: user.company || null,
      position: user.position || null,
      education: user.education || null,
      github: user.github || null,
      verified: user.verified,
      createdAt: user.createdAt,
    };

    console.log('Registration successful for user:', user.email);

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse,
      token,
    }, { status: 201 });

  } catch (error) {
    console.error('Registration API error:', error);
    
    // Handle mongoose validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json(
        { message: 'Validation error: ' + error.message },
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors
    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return NextResponse.json(
        { message: 'User already exists with this email' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}