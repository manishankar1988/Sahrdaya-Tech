import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    source: { type: String, default: 'Technology feed' },
    category: { type: String, default: 'Tech' },
    summary: { type: String, required: true },
    url: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('News', newsSchema);
