import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String }, // Team pitch or description
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
        leader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        inviteCode: { type: String, unique: true },

        // Future-proofing features
        tags: [String], // e.g., ["React", "AI", "Beginner Friendly"]
        status: { type: String, enum: ["active", "disqualified", "archived"], default: "active" },
        isLookingForMembers: { type: Boolean, default: true },
        pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users asking to join
        assignedMentor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Mentor guiding this team
    },
    { timestamps: true }
);

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);
