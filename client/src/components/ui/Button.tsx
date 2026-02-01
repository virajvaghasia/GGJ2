import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: ReactNode;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles = `
    relative font-mono font-semibold uppercase tracking-wider
    border transition-all duration-200 cursor-pointer
    flex items-center justify-center gap-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

    const variants = {
        primary: `
      bg-gradient-to-r from-cyan-500/20 to-cyan-600/20
      border-cyan-400 text-cyan-400
      hover:bg-cyan-400 hover:text-slate-900
      focus:ring-2 focus:ring-cyan-400/50 focus:outline-none
    `,
        secondary: `
      bg-gradient-to-r from-pink-500/20 to-pink-600/20
      border-pink-400 text-pink-400
      hover:bg-pink-400 hover:text-slate-900
      focus:ring-2 focus:ring-pink-400/50 focus:outline-none
    `,
        danger: `
      bg-gradient-to-r from-red-500/20 to-red-600/20
      border-red-400 text-red-400
      hover:bg-red-400 hover:text-slate-900
      focus:ring-2 focus:ring-red-400/50 focus:outline-none
    `,
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={disabled || loading}
            {...props}
        >
            {loading && (
                <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                />
            )}
            {children}
        </motion.button>
    );
}
