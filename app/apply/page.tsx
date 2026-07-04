import PageShell from "@/components/PageShell";

const options = [
    {
        number: "01",
        title: "Apply to be Mentored",
        description:
            "Bring a real situation you’re working through and talk it through on the show.",
        href: "/apply/mentee",
        cta: "Start mentee application",
    },
    {
        number: "02",
        title: "Become a Guest Mentor",
        description:
            "Share your experience and help others think through hard problems.",
        href: "/apply/mentor",
        cta: "Start guest mentor application",
    },
];

export default function ApplyPage() {
    return (
        <PageShell maxWidth="5xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold">
                Get involved
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Apply</h1>

            <p className="mt-4 max-w-2xl text-lg text-brand-muted">
                Choose the path that fits you best.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {options.map((option) => (
                    <a
                        key={option.href}
                        href={option.href}
                        className="group rounded-2xl border border-brand-border bg-brand-surface/80 p-8 shadow-lg shadow-black/10 transition hover:-translate-y-1 hover:border-brand-gold hover:bg-brand-border hover:shadow-xl"
                    >
                        <span className="text-sm font-semibold tracking-[0.2em] text-brand-gold">
                            {option.number}
                        </span>

                        <h2 className="mt-3 text-2xl font-semibold">{option.title}</h2>

                        <p className="mt-4 text-brand-muted">{option.description}</p>

                        <span className="mt-8 inline-block rounded-full bg-brand-gold px-5 py-3 font-semibold text-brand-bg transition group-hover:bg-brand-gold-hover">
                            {option.cta}
                        </span>
                    </a>
                ))}
            </div>
        </PageShell>
    );
}
