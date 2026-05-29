import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

export function Sidebar({ items, brand, footer }: { items: NavItem[]; brand: ReactNode; footer?: ReactNode }) {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col border-r border-ink-100 bg-white">
      <div className="h-16 flex items-center px-5 border-b border-ink-100">{brand}</div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors',
              isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-ink-50'
            )}
          >
            <span className="w-5 h-5 flex items-center justify-center text-ink-500 [.active>&]:text-brand-600">{it.icon}</span>
            {it.label}
          </NavLink>
        ))}
      </nav>
      {footer && <div className="p-3 border-t border-ink-100">{footer}</div>}
    </aside>
  );
}
