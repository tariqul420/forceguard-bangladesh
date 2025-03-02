import dbConnect from "@/lib/dbConnect";
import Army from "@/models/Army";
import { NextResponse } from "next/server";

// GET request handler
export async function GET() {
    await dbConnect();

    try {
        const armies = await Army.find();
        return NextResponse.json(armies, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    }
}