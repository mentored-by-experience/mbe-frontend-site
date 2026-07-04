import Image from "next/image";
import { GoldButton, OutlineButton } from "@/components/Button";
import { latestVideoEmbedUrl } from "@/lib/embeds";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-bg text-brand-fg">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-20">
        <div className="mb-8 flex items-center gap-4">
          <Image
            src="/mbe-logo.jpg"
            alt="Mentored By Experience logo"
            width={72}
            height={72}
            className="rounded-xl shadow-lg"
            priority
          />

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand-gold">
              Mentored By Experience
            </p>
            <p className="mt-1 text-sm text-brand-muted">
              Real problems. Better questions. Hard-earned perspective.
            </p>
          </div>
        </div>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
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