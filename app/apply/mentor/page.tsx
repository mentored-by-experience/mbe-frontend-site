import BackLink from "@/components/BackLink";
import IframeEmbed from "@/components/IframeEmbed";
import PageShell from "@/components/PageShell";
import { tallyMentorEmbedUrl } from "@/lib/embeds";

export default function MentorApplicationPage() {
    return (
        <PageShell maxWidth="4xl">
            <BackLink href="/apply">← Back to applications</BackLink>

            <h1 className="mt-8 text-4xl font-bold md:text-6xl">
                Become a Guest Mentor
            </h1>

            <p className="mt-4 max-w-2xl text-brand-muted">
                Share the experience, background, or perspective you could bring to a
                future conversation.
            </p>

            <IframeEmbed src={tallyMentorEmbedUrl} title="Become a guest mentor" />
        </PageShell>
    );
}
