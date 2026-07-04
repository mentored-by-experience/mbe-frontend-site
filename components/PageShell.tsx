import type { ReactNode } from "react";

const maxWidths = {
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
} as const;

export default function PageShell({
    maxWidth = "3xl",
    children,
}: {
    maxWidth?: keyof typeof maxWidths;
    children: ReactNode;
}) {
    return (
        <main className="min-h-screen bg-brand-bg px-6 py-16 text-brand-fg">
            <section className={`mx-auto ${maxWidths[maxWidth]}`}>{children}</section>
        </main>
    );
}
