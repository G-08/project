import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            required: true,
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: String,
            required: true,
        },
        user_weight: {
            type: Number,
            required: true,
        },
        user_height: {
            type: Number,
            required: true,
        },
        thighs: {
            type: Number,
            required: true,
        },
        shoulders: {
            type: Number,
            required: true,
        },
        waist: {
            type: Number,
            required: true,
        },
        biceps: {
            type: Number,
            required: true,
        },
        initial: {
            type: Number,
            required: true,
        },
        goal: {
            type: Number,
            required: true,
        },
        theme: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);