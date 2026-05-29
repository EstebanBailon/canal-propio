import { Stat, Card, Section, Badge, Button, ProgressBar } from '../../components/ui';
import { useApp } from '../../data/store';
import { Link } from 'react-router-dom';
import { Plus, TrendingUp, Building2 } from 'lucide-react';

export function AdminDashboard() {
  const { allBusinesses, stores, customers, orders } = useApp();
  const totalGMV = orders.reduce((a, o) => a + o.total, 0);

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Resumen SaaS</h1>
          <p className="text-ink-500 mt-1">Vista interna del operador. No es lo que ve el cliente gastronómico.</p>
        </div>
        <Button iconLeft={<Plus className="w-4 h-4" />}>Nueva marca</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Stat label="Marcas activas" value={allBusinesses.length} hint="+1 este mes" accent="up" />
        <Stat label="Locales conectados" value={stores.length + 7} hint="9 en alta" accent="neutral" />
        <Stat label="Clientes finales" value={customers.length * 38} hint="+412 esta semana" accent="up" />
        <Stat label="GMV procesado (demo)" value={`$${(totalGMV * 120).toLocaleString('es-UY')}`} hint="+18% MoM" accent="up" />
      </div>

      <Section title="Marcas en onboarding" subtitle="Estado de implementación por cliente">
        <div className="space-y-3">
          {allBusinesses.map((b) => (
            <Card key={b.id} className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: b.brandColor + '22' }}>
                    {b.logoEmoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-ink-900 truncate">{b.name}</div>
                    <div className="text-xs text-ink-500">{b.city} · plan {b.plan}</div>
                  </div>
                </div>
                <div className="hidden md:block w-64">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-ink-500">Onboarding</span>
                    <span className="font-semibold text-ink-700">{b.onboardingProgress}%</span>
                  </div>
                  <ProgressBar value={b.onboardingProgress} />
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-ink-100 text-ink-700 ring-ink-200">{b.category}</Badge>
                  <Link to="/admin/clientes"><Button variant="outline" size="sm">Abrir</Button></Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Actividad reciente">
        <Card className="p-5 divide-y divide-ink-100">
          {[
            { icon: <Plus className="w-4 h-4 text-emerald-600" />, t: 'Nueva marca creada: Bar Esquina Norte', d: 'Hace 2hs' },
            { icon: <TrendingUp className="w-4 h-4 text-brand-600" />, t: 'Don Pepe alcanzó USD 5K MRR atribuido a canal propio', d: 'Ayer' },
            { icon: <Building2 className="w-4 h-4 text-indigo-600" />, t: 'La Espiga agregó su 2° local', d: 'Hace 3 días' },
          ].map((it, i) => (
            <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="w-8 h-8 rounded-lg bg-ink-50 flex items-center justify-center">{it.icon}</div>
              <div className="flex-1">
                <div className="text-sm text-ink-800">{it.t}</div>
                <div className="text-xs text-ink-500">{it.d}</div>
              </div>
            </div>
          ))}
        </Card>
      </Section>
    </div>
  );
}
