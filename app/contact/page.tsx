import { GoldButton } from "@/components/Button";
import PageShell from "@/components/PageShell";

export default function ContactPage() {
    return (
        <PageShell maxWidth="3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold">
                Get in touch
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Contact</h1>

            <p className="mt-6 text-lg text-brand-muted">
                For business inquiries, sponsorships, guest requests, or media
                contact:
            </p>

            <GoldButton
                href="mailto:contact@mentoredbyexperience.com"
                className="mt-6 inline-block"
            >
                contact@mentoredbyexperience.com
            </GoldButton>
        </PageShell>
    );
}
