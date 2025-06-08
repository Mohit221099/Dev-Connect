import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  challengeId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  projectUrl: string;
  description: string;
  technologies: string[];
  submittedAt: Date;
  score?: number;
  feedback?: string;
  status: 'pending' | 'reviewed' | 'selected' | 'rejected';
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
}

const SubmissionSchema = new Schema<ISubmission>({
  challengeId: {
    type: Schema.Types.ObjectId,
    ref: 'Challenge',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectUrl: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  feedback: {
    type: String,
    maxlength: 500,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'selected', 'rejected'],
    default: 'pending',
  },
  reviewedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  reviewedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

SubmissionSchema.index({ challengeId: 1 });
SubmissionSchema.index({ userId: 1 });
SubmissionSchema.index({ status: 1 });

export default mongoose.models.Submission || mongoose.model<ISubmission>('Submission', SubmissionSchema);