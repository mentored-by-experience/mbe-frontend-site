"use client";

import { useState } from "react";
import { getFieldMaxLength, isFieldFilled, type Answers, type FieldDef } from "@/lib/applicationForms";
import { goldButtonClasses } from "@/components/Button";

const inputClasses =
    "w-full rounded-lg border border-brand-border bg-brand-surface/60 px-4 py-3 text-brand-fg placeholder:text-brand-muted/70 transition focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold";

function OptionPill({
    selected,
    onClick,
    children,
}: {
    selected: boolean;
    onClick: () => void;
    children: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={selected}
            className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                selected
                    ? "border-brand-gold bg-brand-surface text-brand-fg"
                    : "border-brand-border bg-brand-surface/60 text-brand-muted hover:border-brand-outline"
            }`}
        >
            {children}
        </button>
    );
}

export default function ApplicationForm({
    fields,
    endpoint,
}: {
    fields: FieldDef[];
    endpoint: string;
}) {
    const [answers, setAnswers] = useState<Answers>({});
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [showErrors, setShowErrors] = useState(false);
    const [honeypot, setHoneypot] = useState("");

    const invalidFields = fields.filter((field) => !isFieldFilled(field, answers));

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (invalidFields.length > 0) {
            setShowErrors(true);
            return;
        }

        setStatus("submitting");

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers, honeypot }),
            });

            if (!res.ok) throw new Error("Request failed");
            setStatus("success");
        } catch {
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="mt-10 rounded-2xl border border-brand-border bg-brand-surface/60 p-8 text-center">
                <p className="text-xl font-semibold">Thanks for applying.</p>
                <p className="mt-2 text-brand-muted">
                    Your application was submitted. We&apos;ll be in touch if it&apos;s a fit.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="mt-10 flex flex-col gap-8">
            <input
                type="text"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            {fields.map((field, index) => {
                if (field.type === "heading") {
                    return (
                        <h2
                            key={`heading-${index}`}
                            className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold first:mt-0"
                        >
                            {field.label}
                        </h2>
                    );
                }

                const invalid = showErrors && !isFieldFilled(field, answers);

                return (
                    <div key={field.name}>
                        <label className="block font-medium">
                            {field.label}
                            {field.required && <span className="ml-1 text-brand-gold">*</span>}
                        </label>

                        <div className="mt-3">
                            {(field.type === "text" || field.type === "email") && (
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    maxLength={getFieldMaxLength(field)}
                                    value={(answers[field.name] as string) ?? ""}
                                    onChange={(e) =>
                                        setAnswers((prev) => ({ ...prev, [field.name]: e.target.value }))
                                    }
                                    className={inputClasses}
                                />
                            )}

                            {field.type === "textarea" && (
                                <textarea
                                    placeholder={field.placeholder}
                                    maxLength={getFieldMaxLength(field)}
                                    value={(answers[field.name] as string) ?? ""}
                                    onChange={(e) =>
                                        setAnswers((prev) => ({ ...prev, [field.name]: e.target.value }))
                                    }
                                    rows={4}
                                    className={inputClasses}
                                />
                            )}

                            {field.type === "radio" && (
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {field.options.map((option) => (
                                        <OptionPill
                                            key={option}
                                            selected={answers[field.name] === option}
                                            onClick={() =>
                                                setAnswers((prev) => ({ ...prev, [field.name]: option }))
                                            }
                                        >
                                            {option}
                                        </OptionPill>
                                    ))}
                                </div>
                            )}

                            {field.type === "checkboxes" && (
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {field.options.map((option) => {
                                        const selectedOptions =
                                            (answers[field.name] as string[]) ?? [];
                                        const selected = selectedOptions.includes(option);

                                        return (
                                            <OptionPill
                                                key={option}
                                                selected={selected}
                                                onClick={() =>
                                                    setAnswers((prev) => {
                                                        const current = (prev[field.name] as string[]) ?? [];
                                                        const next = selected
                                                            ? current.filter((o) => o !== option)
                                                            : [...current, option];
                                                        return { ...prev, [field.name]: next };
                                                    })
                                                }
                                            >
                                                {option}
                                            </OptionPill>
                                        );
                                    })}
                                </div>
                            )}

                            {field.type === "checkbox" && (
                                <label className="flex items-start gap-3 text-sm text-brand-muted">
                                    <input
                                        type="checkbox"
                                        checked={(answers[field.name] as boolean) ?? false}
                                        onChange={(e) =>
                                            setAnswers((prev) => ({
                                                ...prev,
                                                [field.name]: e.target.checked,
                                            }))
                                        }
                                        className="mt-1 h-4 w-4 accent-brand-gold"
                                    />
                                    I understand
                                </label>
                            )}
                        </div>

                        {invalid && (
                            <p className="mt-2 text-sm text-red-400">This field is required.</p>
                        )}
                    </div>
                );
            })}

            {status === "error" && (
                <p className="text-sm text-red-400">
                    Something went wrong submitting your application. Please try again.
                </p>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className={`${goldButtonClasses} disabled:cursor-not-allowed disabled:opacity-60`}
            >
                {status === "submitting" ? "Submitting…" : "Submit"}
            </button>
        </form>
    );
}
