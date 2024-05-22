import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema (
    {
        id: {
            type: Number,
            required: true,
        }, 
        muscular_group: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Training || mongoose.model("Training", trainingSchema);