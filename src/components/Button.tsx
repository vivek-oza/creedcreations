import React from 'react';
import { motion, type MotionProps } from 'framer-motion';

interface ButtonProps extends Omit<MotionProps, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Reusable Button Component
 * Features multiple variants, sizes, and smooth animations
 * Follows Gen-Z aesthetic with neon orange accents
 */
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...motionProps
}) => {
  const baseClasses = 'font-bold rounded-none border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-orange focus:ring-offset-2 focus:ring-offset-black';
  
  const variantClasses = {
    primary: 'bg-neon-orange text-black border-neon-orange hover:bg-white hover:text-black',
    secondary: 'bg-transparent text-white border-white hover:bg-white hover:text-black hover:border-white',
    ghost: 'bg-transparent text-neon-orange border-neon-orange hover:bg-neon-orange hover:text-black',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-lg',
    lg: 'px-12 py-6 text-xl',
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-current' 
    : 'cursor-pointer';

  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <motion.button
      className={buttonClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      {...motionProps}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && !disabled && (
        <motion.div
          className="absolute inset-0 bg-white origin-left"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

export default Button;