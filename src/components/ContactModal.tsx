import React, { useState } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBER = '7600111331';
const WHATSAPP_URL = 'https://wa.me/7600111331';

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSendMessage = () => {
    const subject = 'New contact from CREED CREATIONS website';
    const bodyLines = [
      name && `Name: ${name}`,
      // email && `Email: ${email}`,
      phone && `Phone: ${phone}`,
      '',
      'Message:',
      message || '(no message entered)',
    ].filter(Boolean);

    const body = bodyLines.join('\n');
    window.location.href = `mailto:creedcreationindia@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 sm:px-6"
      style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
        style={{
          boxShadow: '0 0 0 1px rgba(0,0,0,0.06), 0 32px 80px rgba(0,0,0,0.15)',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
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

        {/* Title */}
        <h2 className="section-heading text-black text-2xl sm:text-3xl mb-2">
          CONTACT US
        </h2>
        <p className="text-sm sm:text-base text-black/60 mb-6">
          10 minutes to get a quote for your project.
        </p>

        {/* Form */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange"
                placeholder="Your name"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
                Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange"
                placeholder="Your phone"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm uppercase tracking-wide text-black/80 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-xl bg-gray-100 border border-black/10 px-3 py-2.5 text-sm sm:text-base text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:border-neon-orange resize-none"
              placeholder="Tell us about your project"
            />
          </div>
        </div>

        {/* Actions */}
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
            className="inline-flex items-center justify-center h-10 sm:h-11 px-5 py-2.5 rounded-full bg-neon-orange text-white text-sm sm:text-base font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;

