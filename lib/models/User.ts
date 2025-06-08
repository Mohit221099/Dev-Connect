import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  userType: 'student' | 'hirer';
  profileImage?: string;
  bio?: string;
  skills?: string[];
  location?: string;
  experience?: string;
  education?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  company?: string;
  position?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(email: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  userType: {
    type: String,
    enum: {
      values: ['student', 'hirer'],
      message: 'User type must be either student or hirer'
    },
    required: [true, 'User type is required'],
  },
  profileImage: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
    default: ''
  },
  skills: [{
    type: String,
    trim: true,
  }],
  location: {
    type: String,
    trim: true,
    default: ''
  },
  experience: {
    type: String,
    trim: true,
    default: ''
  },
  education: {
    type: String,
    trim: true,
    default: ''
  },
  website: {
    type: String,
    trim: true,
    default: ''
  },
  github: {
    type: String,
    trim: true,
    default: ''
  },
  linkedin: {
    type: String,
    trim: true,
    default: ''
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  position: {
    type: String,
    trim: true,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
UserSchema.index({ email: 1 });
UserSchema.index({ userType: 1 });
UserSchema.index({ email: 1, userType: 1 });
UserSchema.index({ skills: 1 });

// Compound index for login queries
UserSchema.index({ email: 1, userType: 1 }, { unique: false });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);