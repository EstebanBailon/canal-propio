import { Outlet, Link } from 'react-router-dom';
import { Sidebar, type NavItem } from '../../components/Sidebar';
import { LayoutDashboard, Building2, Store, Boxes, ListChecks, Coffee, ArrowLeft } from 'lucide-react';

const items: NavItem[] = [
  { to: '/admin', end: true, label: 'Resumen', icon: <LayoutDashboard className="w-4 h-4" /> },
  { to: '/admin/clientes', label: 'Marcas gastronómicas', icon: <Building2 className="w-4 h-4" /> },
  { to: '/admin/locales', label: 'Locales', icon: <Store className="w-4 h-4" /> },
  { to: '/admin/modelo-de-local', label: 'Modelo de Local', icon: <Boxes className="w-4 h-4" /> },
  { to: '/admin/onboarding', label: 'Onboarding', icon: <ListChecks className="w-4 h-4" /> },
];

export function AdminLayout() {
  return (
    <div className="h-screen flex bg-ink-50">
      <Sidebar
        brand={
          <Link to="/" className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl bg-ink-900 text-white flex items-center justify-center"><Coffee className="w-4 h-4" /></span>
            <div>
              <div className="font-display font-extrabold text-ink-900 leading-tight">Plato Admin</div>
              <div className="text-[10px] text-ink-500">SaaS interno</div>
            </div>
          </Link>
        }
        items={items}
        footer={
          <Link to="/" className="flex items-center gap-2 text-xs text-ink-500 hover:text-ink-700">
            <ArrowLeft className="w-3 h-3" /> Volver al sitio
          </Link>
        }
      />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
