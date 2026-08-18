import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: number;
  calories: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, required: true }
  },
  { timestamps: true }
);

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);
