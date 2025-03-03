import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Army from "@/models/Army";

export async function GET(req: NextRequest): Promise<NextResponse> {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const name: string | null = searchParams.get("name");

        const query: Partial<Record<string, unknown>> = {};

        if (name) query.name = { $regex: name, $options: "i" };

        const armies = await Army.find(query);

        return NextResponse.json(armies, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
