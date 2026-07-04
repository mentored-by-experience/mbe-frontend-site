import { GoldButton, OutlineButton } from "@/components/Button";
import { latestVideoEmbedUrl } from "@/lib/embeds";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-brand-gold">
          Real problems. Better questions. Hard-earned perspective.
        </p>

        <h1 className="mt-6 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
          Lessons earned the hard way.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-brand-muted">
          Honest conversations about life, responsibility, rebuilding, purpose,
          family, career, and the moments that force us to grow.
        </p>

        <div className="mt-10 aspect-video w-full overflow-hidden rounded-2xl border border-brand-border bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={latestVideoEmbedUrl}
            title="Latest Mentored By Experience episode"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <GoldButton href="/apply">Apply to be featured</GoldButton>
          <OutlineButton href="/contact">Business contact</OutlineButton>
        </div>
      </section>
    </main>
  );
}