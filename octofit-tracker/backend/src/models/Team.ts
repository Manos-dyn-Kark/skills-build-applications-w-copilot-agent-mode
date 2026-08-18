import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: number;
  focus: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    members: { type: Number, required: true, default: 0 },
    focus: { type: String, required: true }
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', TeamSchema);
