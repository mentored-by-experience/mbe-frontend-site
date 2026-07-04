export default function BackLink({
    href,
    children,
}: {
    href: string;
    children: string;
}) {
    return (
        <a href={href} className="text-sm text-brand-gold hover:text-brand-gold-hover">
            {children}
        </a>
    );
}
