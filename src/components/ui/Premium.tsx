import { motion, useReducedMotion } from 'motion/react';
import type { ComponentType, ReactNode } from 'react';

type IconType = ComponentType<{ className?: string; size?: number }>;

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
};

export function SectionHeader({ eyebrow, title, description, align = 'center', className = '' }: SectionHeaderProps) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center items-center' : 'text-left items-start'} flex max-w-4xl flex-col ${className}`}>
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/25 bg-white/[0.035] px-5 py-2 shadow-[0_0_24px_rgba(201,162,39,0.12)]">
        <span className="h-2 w-2 rounded-full bg-[#C9A227] shadow-[0_0_18px_rgba(201,162,39,0.8)]" />
        <span className="text-[10px] font-black uppercase tracking-[0.26em] text-[#C9A227]">{eyebrow}</span>
      </div>
      <h2 className="font-serif text-4xl font-black leading-tight text-white md:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

type PremiumButtonProps = {
  href: string;
  children: ReactNode;
  icon?: IconType;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
};

export function PremiumButton({ href, children, icon: Icon, variant = 'primary', className = '', onClick }: PremiumButtonProps) {
  const variantClass = {
    primary: 'bg-gradient-to-r from-[#C9A227] to-[#FFD700] text-[#04060b] shadow-[0_18px_45px_rgba(201,162,39,0.22)] hover:from-[#FFD700] hover:to-[#F5E6C8]',
    outline: 'border border-[#C9A227]/35 bg-white/[0.035] text-white hover:border-[#C9A227]/70 hover:bg-[#C9A227]/10',
    ghost: 'border border-white/10 bg-white/[0.025] text-slate-200 hover:border-white/25 hover:bg-white/[0.06]',
  }[variant];

  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-xs font-black uppercase tracking-[0.14em] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-4 focus-visible:ring-offset-[#04060b] ${variantClass} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      <span>{children}</span>
    </a>
  );
}

type StatCardProps = {
  value: string;
  label: string;
  detail?: string;
  icon: IconType;
};

export function StatCard({ value, label, detail, icon: Icon }: StatCardProps) {
  return (
    <div className="corner-brackets group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)] transition-all duration-500 hover:-translate-y-1 hover:border-[#C9A227]/35 hover:bg-white/[0.055]">
      <Icon className="mb-4 h-5 w-5 text-[#C9A227]" />
      <p className="font-serif text-3xl font-black text-white md:text-4xl">{value}</p>
      <p className="mt-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#C9A227]/85">{label}</p>
      {detail && <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p>}
    </div>
  );
}

export function GlowDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden bg-white/5">
      <div className="absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />
    </div>
  );
}

type MotionFrameProps = {
  children: ReactNode;
  className?: string;
  radiusClass?: string;
};

export function MotionFrame({ children, className = '', radiusClass = 'rounded-[2rem]' }: MotionFrameProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`relative overflow-hidden p-[1px] ${radiusClass} ${className}`}>
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        className="absolute left-1/2 top-1/2 h-[220%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(transparent_0_70%,rgba(201,162,39,0.55),transparent_86%)]"
      />
      <div className={`relative bg-[#080b12]/95 ${radiusClass}`}>
        {children}
      </div>
    </div>
  );
}

type FilterTabsProps<T extends string> = {
  options: { id: T; label: string }[];
  active: T;
  onChange: (id: T) => void;
  ariaLabel: string;
};

export function FilterTabs<T extends string>({ options, active, onChange, ariaLabel }: FilterTabsProps<T>) {
  return (
    <div className="mx-auto mb-10 flex max-w-4xl flex-wrap items-center justify-center gap-2" role="tablist" aria-label={ariaLabel}>
      {options.map((option) => {
        const isActive = active === option.id;

        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.id)}
            className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-all duration-300 ${
              isActive
                ? 'border-[#C9A227] bg-[#C9A227] text-[#04060b] shadow-[0_0_24px_rgba(201,162,39,0.2)]'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-[#C9A227]/50 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
