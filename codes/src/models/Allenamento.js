import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
        muscular_group: {
            type: String,
            required: true,
        },
        exercises: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CustomExercise",
            },
        ],
        
    },
  { timestamps: true }
);

export default mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
