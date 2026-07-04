export type FieldDef =
    | {
          type: "heading";
          label: string;
      }
    | {
          type: "text" | "email";
          name: string;
          label: string;
          required?: boolean;
          placeholder?: string;
      }
    | {
          type: "textarea";
          name: string;
          label: string;
          required?: boolean;
          placeholder?: string;
      }
    | {
          type: "radio";
          name: string;
          label: string;
          required?: boolean;
          options: string[];
      }
    | {
          type: "checkboxes";
          name: string;
          label: string;
          required?: boolean;
          options: string[];
      }
    | {
          type: "checkbox";
          name: string;
          label: string;
          required?: boolean;
      };

export type Answers = Record<string, string | string[] | boolean | undefined>;

export function isFieldFilled(field: FieldDef, answers: Answers) {
    if (field.type === "heading" || !field.required) return true;

    const value = answers[field.name];

    if (field.type === "checkboxes") return Array.isArray(value) && value.length > 0;
    if (field.type === "checkbox") return value === true;
    return typeof value === "string" && value.trim().length > 0;
}

const MAX_LENGTH: Record<"text" | "email" | "textarea", number> = {
    text: 200,
    email: 254,
    textarea: 5000,
};

export function getFieldMaxLength(field: FieldDef): number | undefined {
    if (field.type === "text" || field.type === "email" || field.type === "textarea") {
        return MAX_LENGTH[field.type];
    }
    return undefined;
}

export function isFieldTooLong(field: FieldDef, answers: Answers) {
    if (field.type !== "text" && field.type !== "email" && field.type !== "textarea") {
        return false;
    }

    const value = answers[field.name];
    return typeof value === "string" && value.length > MAX_LENGTH[field.type];
}

// Google Sheets (and Excel) treat cell values starting with these characters as
// formulas. Left unsanitized, a submitted answer like `=IMPORTXML(...)` could
// execute as a live formula for whoever opens the sheet. Prefixing with an
// apostrophe forces Sheets to treat the value as plain text.
const FORMULA_TRIGGER_CHARS = new Set(["=", "+", "-", "@", "\t", "\r"]);

function sanitizeForSheets(value: string): string {
    if (value.length > 0 && FORMULA_TRIGGER_CHARS.has(value[0])) {
        return `'${value}`;
    }
    return value;
}

export function buildSheetRow(fields: FieldDef[], answers: Answers): string[] {
    const row: string[] = [new Date().toISOString()];

    for (const field of fields) {
        if (field.type === "heading") continue;

        const value = answers[field.name];

        if (field.type === "checkboxes") {
            row.push(Array.isArray(value) ? sanitizeForSheets(value.join(", ")) : "");
        } else if (field.type === "checkbox") {
            row.push(value ? "Yes" : "No");
        } else {
            row.push(typeof value === "string" ? sanitizeForSheets(value) : "");
        }
    }

    return row;
}

export const menteeFields: FieldDef[] = [
    { type: "text", name: "firstName", label: "First Name", required: true },
    { type: "text", name: "lastName", label: "Last Name", required: true },
    { type: "email", name: "email", label: "Email Address", required: true },
    {
        type: "radio",
        name: "ageRange",
        label: "Age Range",
        required: true,
        options: ["18–24", "25–34", "35–44", "45–54", "55+", "Prefer not to say"],
    },
    { type: "text", name: "location", label: "Where are you located?" },
    {
        type: "textarea",
        name: "situation",
        label: "Tell me what's going on.",
        required: true,
    },
    {
        type: "textarea",
        name: "outcome",
        label: "What outcome are you hoping for from the conversation?",
        required: true,
    },
    {
        type: "radio",
        name: "willingToRecord",
        label: "Are you willing to appear in a recorded video/audio session?",
        required: true,
        options: ["Yes", "Maybe", "No"],
    },
    {
        type: "radio",
        name: "comfortablePublic",
        label: "Are you comfortable with your story being discussed publicly if selected?",
        required: true,
        options: ["Yes", "Maybe, but I want to discuss boundaries first", "No"],
    },
    {
        type: "radio",
        name: "contactMethod",
        label: "Preferred contact method:",
        required: true,
        options: ["Email", "Phone", "Video call"],
    },
    {
        type: "textarea",
        name: "offLimits",
        label: "Anything that is off-limits?",
        required: true,
    },
    {
        type: "checkbox",
        name: "agreement",
        label:
            "I understand this is not therapy, legal advice, financial advice, or medical advice. I am submitting this voluntarily and understand I may be contacted about appearing on Mentored By Experience.",
        required: true,
    },
];

export const mentorFields: FieldDef[] = [
    { type: "heading", label: "Basic information" },
    { type: "text", name: "name", label: "Name", required: true },
    { type: "email", name: "email", label: "Email", required: true },
    {
        type: "text",
        name: "location",
        label: "Where are you located?",
        placeholder: "city/state",
    },
    {
        type: "radio",
        name: "age",
        label: "Age",
        options: ["8–24", "25–34", "35–44", "45–54", "55–64", "65+"],
    },

    { type: "heading", label: "Your story" },
    {
        type: "text",
        name: "experienceAreas",
        label: "Which areas of life have given you the most hard-earned experience?",
        required: true,
    },
    {
        type: "textarea",
        name: "shapedExperiences",
        label: "What experiences have shaped who you are today?",
        required: true,
        placeholder: "Tell me about the events that changed your perspective on life.",
    },
    {
        type: "textarea",
        name: "lessonLearned",
        label: "What is one lesson you wish someone had taught you 20 years ago?",
        required: true,
    },

    { type: "heading", label: "Conversation topics" },
    {
        type: "textarea",
        name: "offLimitTopics",
        label: "Are there any topics you would prefer not to discuss?",
        required: true,
    },
    {
        type: "textarea",
        name: "whyJoin",
        label: "Why do you want to be part of Mentored By Experience?",
        required: true,
        placeholder: "What about this format appeals to you?",
    },

    { type: "heading", label: "On camera" },
    {
        type: "radio",
        name: "cameraExperience",
        label: "Have you ever appeared on camera before?",
        required: true,
        options: ["Frequently", "Occasionally", "Once or twice", "Never"],
    },
    {
        type: "checkboxes",
        name: "comfortableFormats",
        label: "Are you comfortable appearing on:",
        required: true,
        options: ["Audio only", "Video podcast", "Livestream", "Either"],
    },
    {
        type: "checkboxes",
        name: "accessTo",
        label: "Do you have access to:",
        required: true,
        options: [
            "Webcam",
            "External camera",
            "Good microphone",
            "Quiet recording space",
            "Reliable internet",
        ],
    },

    { type: "heading", label: "Availability" },
    { type: "text", name: "timezone", label: "What time zone are you in?", required: true },
    {
        type: "checkboxes",
        name: "availability",
        label: "Typical availability",
        required: true,
        options: [
            "Weekday mornings",
            "Weekday afternoons",
            "Weekday evenings",
            "Weekends",
        ],
    },

    { type: "heading", label: "Optional" },
    { type: "text", name: "website", label: "Website" },
    { type: "textarea", name: "socialLinks", label: "Social media links" },

    { type: "heading", label: "Final question" },
    {
        type: "textarea",
        name: "imagineScenario",
        label:
            "Imagine someone sitting across from you. They're overwhelmed and feel completely stuck.",
        required: true,
        placeholder: "What's the first question you would ask them?",
    },

    { type: "heading", label: "Agreement" },
    {
        type: "checkbox",
        name: "agreementAdvice",
        label:
            "I understand Mentored By Experience is intended for thoughtful conversations and not professional medical, legal, financial, or psychological advice.",
        required: true,
    },
    {
        type: "checkbox",
        name: "agreementNoGuarantee",
        label:
            "I understand submitting this application does not guarantee I will be invited onto the show.",
        required: true,
    },
    {
        type: "checkbox",
        name: "agreementContactConsent",
        label: "If selected, I consent to being contacted by email.",
        required: true,
    },
];
