/**
 * Form validation utilities
 * Client-side validation with XSS-safe rules
 */

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^[\d\s\-+()]{7,20}$/;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}

export function validateEmail(value: string): ValidationResult {
  const trimmed = value.trim();
  if (trimmed.length === 0) return { valid: false, error: 'Email is required' };
  if (trimmed.length > 254) return { valid: false, error: 'Email is too long' };
  if (!EMAIL_REGEX.test(trimmed)) return { valid: false, error: 'Please enter a valid email address' };
  return { valid: true };
}

export function validatePhone(value: string): ValidationResult {
  const trimmed = value.trim();
  if (trimmed.length === 0) return { valid: true }; // optional
  if (trimmed.length < 7 || trimmed.length > 20) return { valid: false, error: 'Phone number must be 7–20 digits' };
  if (!PHONE_REGEX.test(trimmed)) return { valid: false, error: 'Please enter a valid phone number' };
  return { valid: true };
}

export function validateMaxLength(value: string, max: number, fieldName: string): ValidationResult {
  const trimmed = value.trim();
  if (trimmed.length > max) {
    return { valid: false, error: `${fieldName} must be ${max} characters or fewer` };
  }
  return { valid: true };
}

export const FORM_LIMITS = {
  name: { min: 1, max: 100 },
  email: { max: 254 },
  phone: { max: 20 },
  message: { max: 2000 },
} as const;
