import { Link, NavLink } from 'react-router-dom';
import { Coffee } from 'lucide-react';

export function TopNav() {
  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium ${isActive ? 'text-brand-700' : 'text-ink-600 hover:text-ink-900'}`;

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center">
            <Coffee className="w-5 h-5" />
          </span>
          <span className="font-display font-extrabold text-ink-900 text-lg">Plato<span className="text-brand-600">.</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={linkCls}>Producto</NavLink>
          <NavLink to="/estrategia" className={linkCls}>Modelo Uruguay</NavLink>
          <NavLink to="/admin" className={linkCls}>Admin SaaS</NavLink>
          <NavLink to="/business" className={linkCls}>Panel negocio</NavLink>
          <NavLink to="/app/cafe-central-mvd" className={linkCls}>App cliente</NavLink>
        </nav>
        <Link to="/admin" className="hidden md:inline-flex items-center justify-center h-9 px-4 rounded-xl bg-ink-900 text-white text-sm font-semibold hover:bg-ink-800">
          Probar demo
        </Link>
      </div>
    </header>
  );
}
