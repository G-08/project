import mongoose from "mongoose";

const CustomExersciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    muscular_group: {
      type: String,
      required: true,
    },
    exercise_description: {
      type: String,
      required: true,
    },
    reps_number: {
      type: Number,
      required: true,
    },
    sets_number: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.CustomExercise || mongoose.model("CustomExercise", CustomExersciseSchema);
