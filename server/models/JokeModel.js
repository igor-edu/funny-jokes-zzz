import mongoose from 'mongoose';

const JokeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  votesUp: { type: [String], default: [] },
  votesDown: { type: [String], default: [] },
  likes: { type: [String], default: [] },
});

export default mongoose.model('Joke', JokeSchema);
