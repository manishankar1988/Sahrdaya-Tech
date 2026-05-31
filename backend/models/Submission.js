import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authorName: { type: String, required: true },
    authorEmail: { type: String, required: true },
    category: { type: String, default: 'Student Article' },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    reviewedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model('Submission', submissionSchema);
