import dbConnect from "@/lib/dbConnect";
import Police from "@/models/Police";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    await dbConnect();

    try {
        const { searchParams } = new URL(req.url);
        const name: string | null = searchParams.get("name");

        const query: Partial<Record<string, unknown>> = {};

        if (name) query.name = { $regex: name, $options: "i" };

        const polices = await Police.find(query);

        return NextResponse.json(polices, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Error fetching data" }, { status: 500 });
    }
}
