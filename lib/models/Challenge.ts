import mongoose, { Document, Schema } from 'mongoose';

export interface IChallenge extends Document {
  title: string;
  description: string;
  hirerId: mongoose.Types.ObjectId;
  company: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  requirements: string[];
  timeLimit: number; // in hours
  prize?: string;
  deadline: Date;
  maxParticipants?: number;
  participants: mongoose.Types.ObjectId[];
  submissions: mongoose.Types.ObjectId[];
  status: 'active' | 'closed' | 'draft';
  featured: boolean;
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ChallengeSchema = new Schema<IChallenge>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  hirerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  requirements: [{
    type: String,
    trim: true,
  }],
  timeLimit: {
    type: Number,
    required: true,
    min: 1,
    max: 168, // max 1 week
  },
  prize: {
    type: String,
    trim: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  maxParticipants: {
    type: Number,
    min: 1,
  },
  participants: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  submissions: [{
    type: Schema.Types.ObjectId,
    ref: 'Submission',
  }],
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'draft',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  skills: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

ChallengeSchema.index({ hirerId: 1 });
ChallengeSchema.index({ status: 1 });
ChallengeSchema.index({ difficulty: 1 });
ChallengeSchema.index({ category: 1 });
ChallengeSchema.index({ deadline: 1 });

export default mongoose.models.Challenge || mongoose.model<IChallenge>('Challenge', ChallengeSchema);