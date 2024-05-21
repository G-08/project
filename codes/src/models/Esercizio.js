import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema (
    {
        id: {
            type: Number,
            required: true,
        }, 
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
    },
    { timestamps: true }
);

export default mongoose.models.Exercise || mongoose.model("Exercise", exerciseSchema);