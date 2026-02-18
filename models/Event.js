import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        registrationDeadline: Date,
        logo: String,
        isPublic: { type: Boolean, default: true },
        organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        status: {
            type: String,
            enum: ["draft", "upcoming", "ongoing", "completed"],
            default: "draft",
        },
        minTeamSize: { type: Number, default: 2 },
        maxTeamSize: { type: Number, default: 4 },

        judges: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

        rules: [String],
        tracks: [String],

        // Comprehensive Event Details
        judgingCriteria: [{
            name: { type: String, required: true },
            description: String,
            maxScore: { type: Number, default: 10 }
        }],
        prizes: [{
            title: String, // e.g., "1st Place"
            description: String,
            amount: String, // Cash or value
        }],
        sponsors: [{
            name: String,
            logo: String,
            website: String,
            tier: { type: String, enum: ["platinum", "gold", "silver", "bronze"], default: "bronze" }
        }],

    },
    { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);
