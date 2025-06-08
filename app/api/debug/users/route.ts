// Create this file at: app/api/debug/users/route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (email) {
      // Search for specific user
      const user = await User.findOne({ email: email.toLowerCase() });
      return NextResponse.json({
        found: !!user,
        user: user ? {
          _id: user._id,
          email: user.email,
          name: user.name,
          userType: user.userType,
          hasPassword: !!user.password,
          passwordLength: user.password?.length || 0,
          verified: user.verified,
          createdAt: user.createdAt
        } : null
      });
    } else {
      // Get all users (limited info)
      const users = await User.find({}).limit(10).select('email name userType verified createdAt');
      return NextResponse.json({
        count: users.length,
        users: users.map(u => ({
          _id: u._id,
          email: u.email,
          name: u.name,
          userType: u.userType,
          verified: u.verified,
          createdAt: u.createdAt
        }))
      });
    }
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

// Test password verification
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json({ 
        found: false, 
        message: 'User not found' 
      });
    }
    
    // Import bcrypt directly for testing
    const bcrypt = require('bcryptjs');
    const isValid = await bcrypt.compare(password, user.password);
    
    return NextResponse.json({
      found: true,
      userType: user.userType,
      passwordValid: isValid,
      storedPasswordLength: user.password.length,
      inputPasswordLength: password.length
    });
    
  } catch (error) {
    console.error('Debug password test error:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}