import Image from "next/image";
import Link from "next/link";
import { goldButtonClasses } from "@/components/Button";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/mbe-logo.jpg"
                        alt="Mentored By Experience logo"
                        width={36}
                        height={36}
                        className="rounded-lg"
                    />
                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                        Mentored By Experience
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link
                        href="/contact"
                        className="hidden text-sm font-medium text-brand-muted transition hover:text-brand-fg sm:inline-block"
                    >
                        Contact
                    </Link>
                    <Link href="/apply" className={`${goldButtonClasses} px-5 py-2 text-sm`}>
                        Apply
                    </Link>
                </nav>
            </div>
        </header>
    );
}
