import { Outlet, Link } from 'react-router-dom';
import { Sidebar, type NavItem } from '../../components/Sidebar';
import { LayoutDashboard, ArrowLeft, Boxes, ShoppingBag, Users, Gift, Sparkles, Settings, ExternalLink } from 'lucide-react';
import { useApp } from '../../data/store';

const items: NavItem[] = [
  { to: '/business', end: true, label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { to: '/business/catalogo', label: 'Catálogo', icon: <Boxes className="w-4 h-4" /> },
  { to: '/business/pedidos', label: 'Pedidos', icon: <ShoppingBag className="w-4 h-4" /> },
  { to: '/business/clientes', label: 'Clientes', icon: <Users className="w-4 h-4" /> },
  { to: '/business/fidelizacion', label: 'Fidelización', icon: <Gift className="w-4 h-4" /> },
  { to: '/business/marketing', label: 'Marketing IA', icon: <Sparkles className="w-4 h-4" /> },
  { to: '/business/config', label: 'Configuración', icon: <Settings className="w-4 h-4" /> },
];

export function BusinessLayout() {
  const { business } = useApp();
  return (
    <div className="h-screen flex bg-ink-50">
      <Sidebar
        brand={
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: business.brandColor + '22' }}>{business.logoEmoji}</span>
            <div>
              <div className="font-display font-bold text-ink-900 leading-tight text-sm">{business.name}</div>
              <div className="text-[10px] text-ink-500">{business.city}</div>
            </div>
          </div>
        }
        items={items}
        footer={
          <div className="space-y-2">
            <Link to={`/app/${business.slug}`} className="flex items-center gap-2 text-xs text-brand-700 hover:text-brand-800 font-semibold">
              <ExternalLink className="w-3 h-3" /> Ver mi PWA
            </Link>
            <Link to="/" className="flex items-center gap-2 text-xs text-ink-500 hover:text-ink-700">
              <ArrowLeft className="w-3 h-3" /> Volver al sitio
            </Link>
          </div>
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
