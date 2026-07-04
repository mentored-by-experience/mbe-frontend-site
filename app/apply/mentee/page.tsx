import BackLink from "@/components/BackLink";
import PageShell from "@/components/PageShell";
import ApplicationForm from "@/components/form/ApplicationForm";
import { menteeFields } from "@/lib/applicationForms";

export default function MenteeApplicationPage() {
    return (
        <PageShell maxWidth="4xl">
            <BackLink href="/apply">← Back to applications</BackLink>

            <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
                Apply to be Mentored
            </h1>

            <p className="mt-4 max-w-2xl text-brand-muted">
                Share what you’re working through. Only include what you are
                comfortable potentially discussing on a recorded show.
            </p>

            <ApplicationForm fields={menteeFields} endpoint="/api/apply/mentee" />
        </PageShell>
    );
}
