import BackLink from "@/components/BackLink";
import { GoldButton } from "@/components/Button";
import PageShell from "@/components/PageShell";

export default function ContactPage() {
    return (
        <PageShell maxWidth="3xl">
            <BackLink href="/">← Back home</BackLink>

            <h1 className="mt-8 text-4xl font-bold md:text-6xl">Contact</h1>

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
