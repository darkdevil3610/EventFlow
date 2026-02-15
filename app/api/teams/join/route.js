import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import Team from "@/models/Team";

// JOIN a team using invite code
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { inviteCode, userId } = body;
    
    // Find team by invite code
    const team = await Team.findOne({ inviteCode: inviteCode.toUpperCase() });
    
    if (!team) {
      return NextResponse.json(
        { error: "Invalid invite code" },
        { status: 404 }
      );
    }
    
    // Check if user is already the leader
    if (team.leader.toString() === userId) {
      return NextResponse.json(
        { error: "You are already the leader of this team" },
        { status: 400 }
      );
    }
    
    // Check if user is already a member
    if (team.members.includes(userId)) {
      return NextResponse.json(
        { error: "You are already a member of this team" },
        { status: 400 }
      );
    }
    
    // Check if user is already in another team
    const existingTeam = await Team.findOne({
      $or: [
        { leader: userId },
        { members: userId }
      ]
    });
    
    if (existingTeam) {
      return NextResponse.json(
        { error: "You are already in a team. Leave your current team first." },
        { status: 400 }
      );
    }
    
    // Add user to team
    team.members.push(userId);
    await team.save();
    
    await team.populate('leader', 'name email');
    await team.populate('members', 'name email');
    await team.populate('event', 'title startDate endDate');
    
    return NextResponse.json({ 
      message: "Successfully joined the team",
      team 
    });
  } catch (error) {
    console.error("Error joining team:", error);
    return NextResponse.json({ error: "Failed to join team" }, { status: 500 });
  }
}
