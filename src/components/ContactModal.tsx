import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = '7600111331';
const WHATSAPP_URL = 'https://wa.me/7600111331';
const CREED_EMAIL = 'creedcreationindia@gmail.com';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sentViaDirect, setSentViaDirect] = useState(true);

  if (!isOpen) return null;

  const isValid = name.trim().length > 0 && email.trim().length > 0 && message.trim().length > 0;

  const handleSendMessage = async () => {
    if (!isValid) return;

    setStatus('loading');
    setErrorMessage('');

    const sendViaEmailJS = async () => {
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS not configured');
      }
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name.trim(),
          reply_to: email.trim(),
          from_phone: phone.trim() || 'Not provided',
          message: message.trim(),
          to_email: CREED_EMAIL,
        },
        EMAILJS_PUBLIC_KEY
      );
    };

    const sendViaMailto = () => {
      const subject = encodeURIComponent('New inquiry from CREED CREATIONS website');
      const bodyLines = [
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        phone.trim() ? `Phone: ${phone.trim()}` : '',
        '',
        'Message:',
        message.trim(),
      ].filter(Boolean);
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:${CREED_EMAIL}?subject=${subject}&body=${body}`;
    };

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await sendViaEmailJS();
        setSentViaDirect(true);
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        sendViaMailto();
        setSentViaDirect(false);
        setStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    }
  };

  const handleClose = () => {
    if (status !== 'loading') {
      setStatus('idle');
      setErrorMessage('');
      setSentViaDirect(true);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
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
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </motion.div>
              <motion.h3
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
              <h2 className="section-heading text-black text-2xl sm:text-3xl mb-2">
                CONTACT US
              </h2>
              <p className="text-sm sm:text-base text-black/60 mb-6">
                10 minutes to get a quote for your project.
              </p>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                      Name *
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === 'loading'}
                      className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange disabled:opacity-70"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange disabled:opacity-70"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange disabled:opacity-70"
                    placeholder="Your phone (optional)"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={status === 'loading'}
                    rows={4}
                    className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange resize-none disabled:opacity-70"
                    placeholder="Tell us about your project"
                  />
                </div>
              </div>

              {status === 'error' && (
                <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
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
                      alt="Call"
                      className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                    />
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-300"
                    aria-label="Chat on WhatsApp"
                  >
                    <img
                      src="/logos/whatsapp.png"
                      alt="WhatsApp"
                      className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
                    />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!isValid || status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 h-10 sm:h-11 px-5 py-2.5 rounded-full bg-neon-orange text-white text-sm sm:text-base font-medium hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactModal;
