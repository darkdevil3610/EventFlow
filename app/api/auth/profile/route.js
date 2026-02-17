import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import User from "@/models/User";

// GET current user profile
export async function GET(request) {
  try {
    await dbConnect();
    
    // Try to get user ID from header first
    let userId = request.headers.get("x-user-id");
    
    // If no user ID in header, try to get from cookie (for client-side calls)
    if (!userId) {
      const cookieHeader = request.headers.get("cookie");
      if (cookieHeader) {
        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        if (tokenMatch) {
          try {
            const token = tokenMatch[1];
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            userId = payload.userId;
          } catch (e) {
            console.error('Error decoding token:', e);
          }
        }
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const user = await User.findById(userId).select("-password").lean();
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Convert MongoDB timestamps to JSON-serializable format
    const userResponse = {
      ...user,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
      updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null
    };
    
    return NextResponse.json({ user: userResponse });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// UPDATE user profile
export async function PUT(request) {
  try {
    await dbConnect();
    
    // Try to get user ID from header first
    let userId = request.headers.get("x-user-id");
    
    // If no user ID in header, try to get from cookie (for client-side calls)
    if (!userId) {
      const cookieHeader = request.headers.get("cookie");
      if (cookieHeader) {
        const tokenMatch = cookieHeader.match(/token=([^;]+)/);
        if (tokenMatch) {
          try {
            const token = tokenMatch[1];
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
            userId = payload.userId;
          } catch (e) {
            console.error('Error decoding token:', e);
          }
        }
      }
    }
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const body = await request.json();
    const { name, bio } = body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { name, bio },
      { new: true }
    ).select("-password").lean();
    
    // Convert MongoDB timestamps to JSON-serializable format
    const userResponse = {
      ...user,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
      updatedAt: user.updatedAt ? user.updatedAt.toISOString() : null
    };
    
    return NextResponse.json({ user: userResponse });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
