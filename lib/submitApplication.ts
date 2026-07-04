import { buildSheetRow, isFieldFilled, type Answers, type FieldDef } from "@/lib/applicationForms";

export async function submitApplication({
    fields,
    answers,
    scriptUrl,
}: {
    fields: FieldDef[];
    answers: Answers;
    scriptUrl: string | undefined;
}) {
    const missingRequired = fields.some((field) => !isFieldFilled(field, answers));
    if (missingRequired) {
        return { ok: false as const, status: 400, error: "Missing required fields" };
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
