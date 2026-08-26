import mongoose, { type InferSchemaType } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ['strength', 'cardio', 'mobility', 'recovery'] },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: [{ type: String, required: true }],
    recommendedFor: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = mongoose.model('Workout', workoutSchema);
