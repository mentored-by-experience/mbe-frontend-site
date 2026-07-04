import { NextResponse } from "next/server";
import { menteeFields, type Answers } from "@/lib/applicationForms";
import { submitApplication } from "@/lib/submitApplication";

export async function POST(request: Request) {
    let answers: Answers;
    let honeypot: string | undefined;

    try {
        const body = await request.json();
        answers = body.answers ?? {};
        honeypot = body.honeypot;
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const result = await submitApplication({
        fields: menteeFields,
        answers,
        scriptUrl: process.env.MENTEE_APPS_SCRIPT_URL,
        honeypot,
    });

    if (!result.ok) {
        return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ ok: true });
}
