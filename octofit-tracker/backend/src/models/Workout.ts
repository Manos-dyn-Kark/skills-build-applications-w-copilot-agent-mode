import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: 'easy' | 'moderate' | 'advanced';
  duration: number;
  goal: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'advanced'],
      required: true
    },
    duration: { type: Number, required: true },
    goal: { type: String, required: true }
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema);
