import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.cookies.get("token");
    
    if (!token) {
        return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    return NextResponse.json({ token });
}
