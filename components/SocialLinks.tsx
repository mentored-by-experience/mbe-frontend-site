import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { socialLinks, socialLinksEnabled } from "@/lib/socialLinks";

const platforms = [
    { name: "Instagram", href: socialLinks.instagram, Icon: FaInstagram },
    { name: "X", href: socialLinks.x, Icon: FaXTwitter },
    { name: "TikTok", href: socialLinks.tiktok, Icon: FaTiktok },
    { name: "YouTube", href: socialLinks.youtube, Icon: FaYoutube },
];

export default function SocialLinks() {
    if (!socialLinksEnabled) return null;

    return (
        <div className="flex items-center gap-5">
            {platforms.map(({ name, href, Icon }) => (
                <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="text-brand-muted transition hover:text-brand-gold"
                >
                    <Icon className="h-5 w-5" />
                </a>
            ))}
        </div>
    );
}
