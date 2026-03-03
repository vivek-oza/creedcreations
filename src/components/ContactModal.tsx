import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import {
  validateRequired,
  validateEmail,
  validatePhone,
  validateMaxLength,
  FORM_LIMITS,
} from '../utils/validation';
import { trimAndLimit, sanitizeInput } from '../utils/sanitize';
import { logger } from '../utils/logger';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = '7600111331';
const WHATSAPP_URL = 'https://wa.me/7600111331';
const CREED_EMAIL = 'creedcreationindia@gmail.com';

const getEmailJsConfig = () => ({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '',
});

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [sentViaDirect, setSentViaDirect] = useState(true);

  const validateForm = useCallback((): boolean => {
    const errors: FieldErrors = {};
    const nameVal = name.trim();
    const emailVal = email.trim();
    const msgVal = message.trim();

    const nameResult = validateRequired(nameVal, 'Name');
    if (!nameResult.valid) errors.name = nameResult.error;
    else {
      const maxResult = validateMaxLength(nameVal, FORM_LIMITS.name.max, 'Name');
      if (!maxResult.valid) errors.name = maxResult.error;
    }

    const emailResult = validateEmail(emailVal);
    if (!emailResult.valid) errors.email = emailResult.error;

    const phoneResult = validatePhone(phone.trim());
    if (!phoneResult.valid) errors.phone = phoneResult.error;

    const msgRequired = validateRequired(msgVal, 'Message');
    if (!msgRequired.valid) errors.message = msgRequired.error;
    else {
      const msgMax = validateMaxLength(msgVal, FORM_LIMITS.message.max, 'Message');
      if (!msgMax.valid) errors.message = msgMax.error;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, phone, message]);

  const isValid =
    name.trim().length >= FORM_LIMITS.name.min &&
    email.trim().length > 0 &&
    message.trim().length >= FORM_LIMITS.name.min;

  const handleSendMessage = useCallback(async () => {
    if (!validateForm()) return;

    setStatus('loading');
    setErrorMessage('');
    setFieldErrors({});

    const safeName = trimAndLimit(sanitizeInput(name), FORM_LIMITS.name.max);
    const safeEmail = trimAndLimit(sanitizeInput(email), FORM_LIMITS.email.max);
    const safePhone = trimAndLimit(sanitizeInput(phone), FORM_LIMITS.phone.max);
    const safeMessage = trimAndLimit(sanitizeInput(message), FORM_LIMITS.message.max);

    const config = getEmailJsConfig();

    const sendViaEmailJS = async () => {
      if (!config.serviceId || !config.templateId || !config.publicKey) {
        throw new Error('Email service not configured');
      }
      await emailjs.send(
        config.serviceId,
        config.templateId,
        {
          from_name: safeName,
          reply_to: safeEmail,
          from_phone: safePhone || 'Not provided',
          message: safeMessage,
          to_email: CREED_EMAIL,
        },
        config.publicKey
      );
    };

    const sendViaMailto = () => {
      const subject = encodeURIComponent('New inquiry from CREED CREATIONS website');
      const bodyLines = [
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        safePhone ? `Phone: ${safePhone}` : '',
        '',
        'Message:',
        safeMessage,
      ].filter(Boolean);
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:${CREED_EMAIL}?subject=${subject}&body=${body}`;
    };

    try {
      if (config.serviceId && config.templateId && config.publicKey) {
        await sendViaEmailJS();
        setSentViaDirect(true);
      } else {
        sendViaMailto();
        setSentViaDirect(false);
      }
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setErrorMessage(msg);
      logger.error('Contact form send failed', { message: msg });
    }
  }, [name, email, phone, message, validateForm]);

  const handleClose = useCallback(() => {
    if (status !== 'loading') {
      setStatus('idle');
      setErrorMessage('');
      setFieldErrors({});
      setSentViaDirect(true);
      onClose();
    }
  }, [status, onClose]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(trimAndLimit(e.target.value, FORM_LIMITS.name.max));
    if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(trimAndLimit(e.target.value, FORM_LIMITS.email.max));
    if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(trimAndLimit(e.target.value, FORM_LIMITS.phone.max));
    if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(trimAndLimit(e.target.value, FORM_LIMITS.message.max));
    if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6 overflow-y-auto py-4 sm:py-6"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8 max-h-[calc(100vh-2rem)] overflow-y-auto my-auto"
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          disabled={status === 'loading'}
          className="absolute right-4 top-4 flex min-w-[44px] min-h-[44px] w-11 h-11 items-center justify-center rounded-full border border-black/15 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Close contact modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
            aria-hidden
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neon-orange/10 text-neon-orange"
              >
                <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden />
              </motion.div>
              <motion.h3
                id="contact-modal-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-xl sm:text-2xl font-bold text-black mb-2"
                style={{ fontFamily: "'Archivo Black', sans-serif" }}
              >
                Message sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-black/60 text-sm sm:text-base max-w-sm"
              >
                {sentViaDirect
                  ? "We'll get back to you within 24 hours."
                  : 'Email client opened — please complete sending.'}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 id="contact-modal-title" className="section-heading text-black text-2xl sm:text-3xl mb-2">
                CONTACT US
              </h2>
              <p className="text-sm sm:text-base text-black/60 mb-6">
                10 minutes to get a quote for your project.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                noValidate
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="contact-name" className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      disabled={status === 'loading'}
                      required
                      maxLength={FORM_LIMITS.name.max}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                      className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange disabled:opacity-70"
                      placeholder="Your name"
                    />
                    {fieldErrors.name && (
                      <p id="contact-name-error" className="mt-1 text-sm text-red-600" role="alert">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="contact-email" className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                      Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={status === 'loading'}
                      required
                      maxLength={FORM_LIMITS.email.max}
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                      className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange disabled:opacity-70"
                      placeholder="your@email.com"
                    />
                    {fieldErrors.email && (
                      <p id="contact-email-error" className="mt-1 text-sm text-red-600" role="alert">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    disabled={status === 'loading'}
                    maxLength={FORM_LIMITS.phone.max}
                    autoComplete="tel"
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
                    className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange disabled:opacity-70"
                    placeholder="Your phone (optional)"
                  />
                  {fieldErrors.phone && (
                    <p id="contact-phone-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={handleMessageChange}
                    disabled={status === 'loading'}
                    required
                    rows={4}
                    maxLength={FORM_LIMITS.message.max}
                    aria-required="true"
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                    className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange resize-none disabled:opacity-70"
                    placeholder="Tell us about your project"
                  />
                  {fieldErrors.message && (
                    <p id="contact-message-error" className="mt-1 text-sm text-red-600" role="alert">
                      {fieldErrors.message}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-black/50">
                    {message.length}/{FORM_LIMITS.message.max} characters
                  </p>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <a
                      href={`tel:${PHONE_NUMBER}`}
                      className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
                      aria-label="Call now"
                    >
                      <img
                        src="/logos/telephone.png"
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                      />
                    </a>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
                      aria-label="Chat on WhatsApp"
                    >
                      <img
                        src="/logos/whatsapp.png"
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        decoding="async"
                        className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                      />
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={!isValid || status === 'loading'}
                    className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 py-2.5 rounded-full bg-neon-orange text-white text-sm sm:text-base font-medium hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactModal;
