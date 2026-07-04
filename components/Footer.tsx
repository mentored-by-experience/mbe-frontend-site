import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-brand-border">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-brand-muted sm:flex-row sm:justify-between">
                <p>© {year} Mentored By Experience. All rights reserved.</p>

                <nav className="flex items-center gap-6">
                    <Link href="/apply" className="transition hover:text-brand-fg">
                        Apply
                    </Link>
                    <Link href="/contact" className="transition hover:text-brand-fg">
                        Contact
                    </Link>
                </nav>
            </div>
        </footer>
    );
}
