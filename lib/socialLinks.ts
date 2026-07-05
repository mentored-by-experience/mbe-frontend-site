export const socialLinksEnabled = process.env.FEATURE_SOCIAL_LINKS !== "false";

export const socialLinks = {
    instagram: process.env.INSTAGRAM_URL || "#",
    x: process.env.X_URL || "#",
    tiktok: process.env.TIKTOK_URL || "#",
    youtube: process.env.YOUTUBE_URL || "#",
};
