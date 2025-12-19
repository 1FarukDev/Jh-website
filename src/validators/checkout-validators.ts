import { z } from "zod";

export const buyersInfoSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "First name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Last name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z.string().email("Please enter a valid email address"),

  phone_number: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      "Please enter a valid phone number"
    ),
});

export type BuyersInfoFormData = z.infer<typeof buyersInfoSchema>;

// Card Details Validation
export const cardDetailsSchema = z.object({
  card_number: z
    .string()
    .regex(/^\d{13,19}$/, "Card number must be between 13 and 19 digits")
    .refine((val) => luhnCheck(val), "Invalid card number"),

  card_holder: z
    .string()
    .min(3, "Cardholder name must be at least 3 characters")
    .max(50, "Cardholder name must be less than 50 characters")
    .regex(
      /^[a-zA-Z\s'-]+$/,
      "Cardholder name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  expiry_date: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .refine((val) => isValidExpiryDate(val), "Card has expired"),

  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),

  billing_country: z.string().min(2, "Country is required"),

  billing_state: z.string().min(2, "State/Province is required"),

  billing_city: z.string().min(2, "City is required"),

  billing_postal_code: z
    .string()
    .min(3, "Postal code must be at least 3 characters")
    .max(20, "Postal code is too long"),

  billing_address: z
    .string()
    .min(5, "Address must be at least 5 characters")
    .max(100, "Address must be less than 100 characters"),
});

export type CardDetailsFormData = z.infer<typeof cardDetailsSchema>;

// Helper function: Luhn Algorithm for card number validation
export function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Helper function: Check if expiry date is valid
export function isValidExpiryDate(expiryDate: string): boolean {
  const [month, year] = expiryDate.split("/");
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);

  if (expYear > currentYear) {
    return true;
  }

  if (expYear === currentYear) {
    return expMonth >= currentMonth;
  }

  return false;
}

// Helper function: Format card number input (add spaces every 4 digits)
export function formatCardNumber(value: string): string {
  return value
    .replace(/\s/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim();
}

// Helper function: Format expiry date input (auto-add slash)
export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
}
