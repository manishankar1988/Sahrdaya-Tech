import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, default: 'India' },
    type: { type: String, enum: ['placement', 'internship'], required: true },
    duration: String,
    stipend: String,
    skills: [{ type: String }],
    applyUrl: { type: String, required: true },
    source: { type: String, default: 'LinkedIn' },
    postedAt: { type: Date, default: Date.now },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model('Opportunity', opportunitySchema);
