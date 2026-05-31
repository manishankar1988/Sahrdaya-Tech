import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    focus: { type: String, required: true },
    stats: { type: String, required: true },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        year: String,
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Department', departmentSchema);
