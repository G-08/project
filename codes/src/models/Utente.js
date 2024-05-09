import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema (
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
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
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
        user_thighs: {
            type: Number,
            required: true,
        },
        user_shoulders: {
            type: Number,
            required: true,
        },
        user_waist: {
            type: Number,
            required: true,
        },
        user_biceps: {
            type: Number,
            required: true,
        },
        starting_condition: {
            type: Number,
            required: true,
        },
        user_goal: {
            type: Number,
            required: true,
        }
    },
    { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);