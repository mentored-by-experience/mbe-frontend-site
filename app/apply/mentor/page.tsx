import BackLink from "@/components/BackLink";
import PageShell from "@/components/PageShell";
import ApplicationForm from "@/components/form/ApplicationForm";
import { mentorFields } from "@/lib/applicationForms";

export default function MentorApplicationPage() {
    return (
        <PageShell maxWidth="4xl">
            <BackLink href="/apply">← Back to applications</BackLink>

            <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
                Become a Guest Mentor
            </h1>

            <p className="mt-4 max-w-2xl text-brand-muted">
                Share the experience, background, or perspective you could bring to a
                future conversation.
            </p>

            <ApplicationForm fields={mentorFields} endpoint="/api/apply/mentor" />
        </PageShell>
    );
}
