import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-brand-border">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-10 text-sm text-brand-muted sm:flex-row sm:justify-between">
                <p>© {year} Mentored By Experience. All rights reserved.</p>

                <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                    <nav className="flex items-center gap-6">
                        <Link href="/apply" className="transition hover:text-brand-fg">
                            Apply
                        </Link>
                        <Link href="/contact" className="transition hover:text-brand-fg">
                            Contact
                        </Link>
                    </nav>

                    <SocialLinks />
                </div>
            </div>
        </footer>
    );
}
