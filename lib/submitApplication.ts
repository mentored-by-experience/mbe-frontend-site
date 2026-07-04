import {
    buildSheetRow,
    isFieldFilled,
    isFieldTooLong,
    type Answers,
    type FieldDef,
} from "@/lib/applicationForms";

export async function submitApplication({
    fields,
    answers,
    scriptUrl,
    honeypot,
}: {
    fields: FieldDef[];
    answers: Answers;
    scriptUrl: string | undefined;
    honeypot?: string;
}) {
    // Bots that blindly fill every field trip this hidden field; humans never
    // see or fill it. Report success without actually recording anything, so
    // the bot doesn't learn its submission was rejected.
    if (honeypot) {
        return { ok: true as const };
    }

    const missingRequired = fields.some((field) => !isFieldFilled(field, answers));
    if (missingRequired) {
        return { ok: false as const, status: 400, error: "Missing required fields" };
    }

    const tooLong = fields.some((field) => isFieldTooLong(field, answers));
    if (tooLong) {
        return { ok: false as const, status: 400, error: "A field exceeds the maximum length" };
    }

    if (!scriptUrl) {
        return { ok: false as const, status: 500, error: "Form is not configured" };
    }

    const row = buildSheetRow(fields, answers);

    const res = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: process.env.SHEETS_WEBHOOK_SECRET, row }),
    });

    if (!res.ok) {
        return { ok: false as const, status: 502, error: "Failed to record application" };
    }

    return { ok: true as const };
}
