/**
 * Input sanitization for XSS prevention
 * React escapes by default; these utilities add defense-in-depth for values
 * sent to external APIs or used in URLs/attributes.
 */

const DANGEROUS_PATTERNS = /<script|javascript:|on\w+=|data:/gi;

export function sanitizeForDisplay(input: string): string {
  if (typeof input !== 'string') return '';
  return input.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '')
    .replace(DANGEROUS_PATTERNS, '')
    .trim();
}

export function trimAndLimit(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength);
}
