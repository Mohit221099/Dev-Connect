import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token (for Node.js runtime - API routes)
export function generateToken(userId: string, userType: string): string {
  return jwt.sign(
    { userId, userType },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token (for Node.js runtime - API routes)
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

// Generate JWT token for Edge Runtime
export async function generateTokenEdge(userId: string, userType: string): Promise<string> {
  return await new SignJWT({ userId, userType })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(JWT_SECRET_KEY);
}

// Verify JWT token for Edge Runtime
export async function verifyTokenEdge(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}