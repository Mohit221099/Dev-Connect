import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User'; // Ensure the path is correct based on your project structure
// Ensure that the User model exists at the specified path

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const session = await getServerSession() as { user: { id: string; name?: string | null; email?: string | null; image?: string | null } };

    if (!session || !session.user || session.user.id !== params.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    const allowedFields = [
      'name', 'bio', 'location', 'company', 'position', 'education', 'skills', 'avatar'
    ];
    const updates = Object.keys(data)
      .filter(key => allowedFields.includes(key))
      .reduce((obj: any, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    const user = await User.findByIdAndUpdate(
      params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}