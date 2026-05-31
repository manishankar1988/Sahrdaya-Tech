import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model('Achievement', achievementSchema);
