import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  userId: mongoose.Types.ObjectId;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  images: string[];
  featured: boolean;
  likes: mongoose.Types.ObjectId[];
  views: number;
  stars: number;
  forks: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'in-progress' | 'completed' | 'archived';
  collaborators: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  images: [{
    type: String,
    trim: true,
  }],
  featured: {
    type: Boolean,
    default: false,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  views: {
    type: Number,
    default: 0,
  },
  stars: {
    type: Number,
    default: 0,
  },
  forks: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'archived'],
    default: 'in-progress',
  },
  collaborators: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

ProjectSchema.index({ userId: 1 });
ProjectSchema.index({ technologies: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ createdAt: -1 });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);