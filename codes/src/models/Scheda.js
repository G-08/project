import mongoose from "mongoose";

const Scheda = new mongoose.Schema(
  {
        userEmail: {
            type: String,
            required: true,
        },
        gambe: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            },
        ],
        schiena: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            },
        ],
        petto: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            },
        ],
        braccia: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            },
        ],
        addome: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            },
        ],
    },
  { timestamps: true }
);

export default mongoose.models.Scheda || mongoose.model("Scheda", Scheda);
