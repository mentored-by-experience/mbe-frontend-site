export default function IframeEmbed({
    src,
    title,
}: {
    src: string;
    title: string;
}) {
    return (
        <div className="mt-10 overflow-hidden rounded-2xl border border-brand-border bg-white">
            <iframe
                src={src}
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title={title}
            />
        </div>
    );
}
