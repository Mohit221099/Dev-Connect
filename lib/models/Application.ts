import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  studentId: mongoose.Types.ObjectId;
  hirerId: mongoose.Types.ObjectId;
  jobTitle: string;
  company: string;
  coverLetter: string;
  resume?: string;
  status: 'pending' | 'reviewed' | 'interviewed' | 'hired' | 'rejected';
  appliedAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  hirerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  coverLetter: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  resume: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interviewed', 'hired', 'rejected'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

ApplicationSchema.index({ studentId: 1 });
ApplicationSchema.index({ hirerId: 1 });
ApplicationSchema.index({ status: 1 });

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);