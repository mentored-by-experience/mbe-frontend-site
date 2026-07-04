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
        <main className="px-6 py-16 md:py-24">
            <section className={`mx-auto ${maxWidths[maxWidth]}`}>{children}</section>
        </main>
    );
}
