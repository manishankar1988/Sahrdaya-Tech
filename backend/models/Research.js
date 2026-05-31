import mongoose from 'mongoose';

const researchSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    area: { type: String, required: true },
    mentor: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model('Research', researchSchema);
