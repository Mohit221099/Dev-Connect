import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

// Mock upload function (replace with S3/Cloudinary in production)
const uploadToStorage = async (file: File) => {
  // Simulate upload
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `https://mock-storage.com/avatars/${Date.now()}-${file.name}`;
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('avatar') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 });
    }

    const url = await uploadToStorage(file);
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}