import { type ReactNode, type ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('rounded-2xl bg-white border border-ink-100 shadow-card', className)}>{children}</div>;
}

export function Section({ title, subtitle, action, children }: { title?: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="mb-8">
      {(title || action) && (
        <div className="flex items-end justify-between mb-4">
          <div>
            {title && <h2 className="text-2xl font-bold text-ink-900">{title}</h2>}
            {subtitle && <p className="text-sm text-ink-500 mt-1">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: string; accent?: 'up' | 'down' | 'neutral' }) {
  const tone = accent === 'up' ? 'text-emerald-600' : accent === 'down' ? 'text-rose-600' : 'text-ink-500';
  return (
    <Card className="p-5">
      <div className="text-xs uppercase tracking-wider text-ink-500 font-medium">{label}</div>
      <div className="mt-2 text-2xl font-bold text-ink-900">{value}</div>
      {hint && <div className={clsx('mt-1 text-xs', tone)}>{hint}</div>}
    </Card>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={clsx('inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset', className)}>
      {children}
    </span>
  );
}

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', iconLeft, children, className, ...rest }: BtnProps) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors disabled:opacity-50';
  const sizes = { sm: 'h-8 px-3 text-xs', md: 'h-10 px-4 text-sm', lg: 'h-12 px-6 text-base' };
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    ghost: 'text-ink-700 hover:bg-ink-100',
    outline: 'border border-ink-200 text-ink-700 hover:bg-ink-50',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
  };
  return (
    <button {...rest} className={clsx(base, sizes[size], variants[variant], className)}>
      {iconLeft}{children}
    </button>
  );
}

export function Input({ label, ...rest }: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      {label && <span className="text-xs font-medium text-ink-600">{label}</span>}
      <input {...rest} className={clsx('mt-1 w-full h-10 px-3 rounded-xl border border-ink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400', rest.className)} />
    </label>
  );
}

export function Select({ label, children, ...rest }: { label?: string; children: ReactNode } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className="block">
      {label && <span className="text-xs font-medium text-ink-600">{label}</span>}
      <select {...rest} className={clsx('mt-1 w-full h-10 px-3 rounded-xl border border-ink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400', rest.className)}>
        {children}
      </select>
    </label>
  );
}

export function Textarea({ label, ...rest }: { label?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      {label && <span className="text-xs font-medium text-ink-600">{label}</span>}
      <textarea {...rest} className={clsx('mt-1 w-full min-h-[88px] p-3 rounded-xl border border-ink-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-400', rest.className)} />
    </label>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <button type="button" onClick={() => onChange(!checked)} className={clsx('relative h-6 w-11 rounded-full transition-colors', checked ? 'bg-brand-600' : 'bg-ink-200')}>
        <span className={clsx('absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform', checked ? 'translate-x-[22px]' : 'translate-x-0.5')} />
      </button>
      {label && <span className="text-sm text-ink-700">{label}</span>}
    </label>
  );
}

export function EmptyState({ emoji, title, desc, action }: { emoji: string; title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-3">{emoji}</div>
      <div className="font-semibold text-ink-900">{title}</div>
      {desc && <div className="text-sm text-ink-500 mt-1 max-w-sm mx-auto">{desc}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ProgressBar({ value, className }: { value: number; className?: string }) {
  return (
    <div className={clsx('h-2 w-full rounded-full bg-ink-100 overflow-hidden', className)}>
      <div className="h-full bg-brand-500" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
