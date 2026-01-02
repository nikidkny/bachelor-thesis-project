import { ContactFormDTO } from "@/types/ContactFormDTO";

const fields = [
  "full_name",
  "company_name",
  "company_email",
  "services",
  "message",
] as const;

export default function validate(body: Partial<ContactFormDTO>): {
  isValid: boolean;
  validationError?: string;
} {
  // check if all required fileds are present
  for (const field of fields) {
    if (!(field in body)) {
      return {
        isValid: false,
        validationError: "Missing field(s) from request body",
      };
    }
  }

  const { full_name, company_name, company_email, services, message } = body;
  // check if they are strings
  if (
    typeof full_name !== "string" ||
    typeof company_name !== "string" ||
    typeof company_email !== "string" ||
    typeof message !== "string" ||
    !Array.isArray(services)
  ) {
    return { isValid: false, validationError: "Incorrect data type(s)" };
  }

  // check if they are not empty
  if (
    full_name.length === 0 ||
    company_name.length === 0 ||
    company_email.length === 0 ||
    services.length === 0||
    message.length === 0
  ) {
    return { isValid: false, validationError: "A required field is empty" };
  }
  // name only contains letters, spaces, special letters like accents and hyphens
  if (/^[a-zA-ZÀ-ÿ'\s-']+$/.test(full_name) === false) {
    return {
      isValid: false,
      validationError: "full_name contains invalid characters",
    };
  }
  return { isValid: true };
}
