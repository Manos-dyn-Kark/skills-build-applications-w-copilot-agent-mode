import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  rank: number;
  user: string;
  points: number;
  streak: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    rank: { type: Number, required: true },
    user: { type: String, required: true },
    points: { type: Number, required: true },
    streak: { type: Number, required: true }
  },
  { timestamps: true }
);

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
