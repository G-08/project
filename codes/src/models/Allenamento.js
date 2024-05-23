import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema (
    {
        muscular_group: {
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

export default mongoose.models.Training || mongoose.model("Training", trainingSchema);