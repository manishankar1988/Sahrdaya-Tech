import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    name: { type: String, default: 'Guest' },
    message: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    description: { type: String, required: true },
    githubUrl: { type: String, required: true },
    technologies: { type: String },
    department: String,
    year: { type: String, default: new Date().getFullYear().toString() },
    mentor: String,
    approved: { type: Boolean, default: true },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
  },
  { timestamps: true },
);

export default mongoose.model('Project', projectSchema);
