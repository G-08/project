import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema (
    {
        id: {
            type: Number,
            required: true,
        }, 
        nome: {
            type: String,
            required: true,
        },
        gruppo_muscolare: {
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