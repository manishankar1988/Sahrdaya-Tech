import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    channel: { type: String, required: true },
    topic: { type: String, default: 'Tech update' },
    embedUrl: { type: String, required: true },
    url: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export default mongoose.model('Video', videoSchema);
