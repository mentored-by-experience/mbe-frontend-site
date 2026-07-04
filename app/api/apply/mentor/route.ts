import { NextResponse } from "next/server";
import { mentorFields, type Answers } from "@/lib/applicationForms";
import { submitApplication } from "@/lib/submitApplication";

export async function POST(request: Request) {
    let answers: Answers;

    try {
        const body = await request.json();
        answers = body.answers ?? {};
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const result = await submitApplication({
        fields: mentorFields,
        answers,
        scriptUrl: process.env.MENTOR_APPS_SCRIPT_URL,
    });

    if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
}
