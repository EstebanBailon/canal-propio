import { Card, Stat, Section, Badge, Button } from '../../components/ui';
import { useApp } from '../../data/store';
import { money } from '../../utils/format';
import { AlertTriangle, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BusinessDashboard() {
  const { orders, customers, campaigns, products } = useApp();
  const today = orders;
  const sold = today.reduce((a, o) => a + o.total, 0);
  const avg = today.length ? Math.round(sold / today.length) : 0;
  const newCustomers = customers.filter(c => c.segment === 'nuevo').length;
  const recurrent = customers.filter(c => c.segment === 'frecuente' || c.segment === 'alto-valor').length;
  const pointsEmitted = customers.reduce((a, c) => a + c.points, 0);
  const activeCamps = campaigns.filter(c => c.status === 'enviada' || c.status === 'programada').length;

  // top productos
  const top = [...products].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)).slice(0, 5);

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Hola 👋</h1>
          <p className="text-ink-500 mt-1">Esto pasó hoy en tus locales.</p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 ring-emerald-200">28 may 2026 · canal propio</Badge>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Stat label="Ventas del día" value={money(sold)} hint="+18% vs ayer" accent="up" />
        <Stat label="Pedidos recibidos" value={today.length} hint="6 abiertos" accent="neutral" />
        <Stat label="Ticket promedio" value={money(avg)} hint="+$45 vs semana" accent="up" />
        <Stat label="Clientes nuevos" value={newCustomers} hint="↑ campaña dormidos" accent="up" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Stat label="Clientes recurrentes" value={recurrent} hint={`${Math.round((recurrent / customers.length) * 100)}% de la base`} />
        <Stat label="Puntos emitidos" value={pointsEmitted} hint="62 canjeados este mes" />
        <Stat label="Campañas activas" value={activeCamps} hint="1 en borrador" />
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Canal propio vs marketplace */}
        <Section title="Canal propio vs marketplace">
          <Card className="p-5">
            <div className="text-xs text-ink-500">Últimos 30 días</div>
            <div className="mt-3 space-y-3">
              <div>
                <div className="flex justify-between text-sm font-medium text-ink-800">
                  <span>Canal propio</span><span>$ 184.300 · 62%</span>
                </div>
                <div className="h-2 bg-ink-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-brand-500" style={{ width: '62%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-medium text-ink-800">
                  <span>Marketplace</span><span>$ 112.100 · 38%</span>
                </div>
                <div className="h-2 bg-ink-100 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-ink-400" style={{ width: '38%' }} />
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium">
              Ahorraste ~$ 26.000 en comisiones este mes operando por canal propio.
            </div>
          </Card>
        </Section>

        {/* Productos top */}
        <Section title="Más vendidos">
          <Card className="p-2">
            {top.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3 p-3 border-b border-ink-100 last:border-0">
                <div className="w-6 text-center text-xs text-ink-500 font-bold">#{i + 1}</div>
                <div className="w-9 h-9 rounded-lg bg-ink-50 flex items-center justify-center text-lg">{p.imageEmoji}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-ink-900">{p.name}</div>
                  <div className="text-xs text-ink-500">{money(p.price)} · {Math.round(40 - i * 6)} vendidos hoy</div>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        {/* Alertas accionables */}
        <Section title="Alertas accionables">
          <Card className="p-5 space-y-3">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-100">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-amber-900">3 clientes alto-valor sin compra hace 30 días</div>
                  <div className="text-amber-800 text-xs mt-1">Lanzá una campaña de reactivación con recompensa.</div>
                </div>
              </div>
              <Link to="/business/marketing"><Button size="sm" className="mt-3">Crear campaña</Button></Link>
            </div>
            <div className="p-3 rounded-xl bg-brand-50 border border-brand-100">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-700 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-brand-900">Brownie marcado como no disponible</div>
                  <div className="text-brand-800 text-xs mt-1">2 pedidos perdidos esta semana por falta de stock.</div>
                </div>
              </div>
              <Link to="/business/catalogo"><Button size="sm" variant="outline" className="mt-3">Revisar catálogo</Button></Link>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-start gap-2">
                <ArrowUpRight className="w-4 h-4 text-emerald-700 mt-0.5" />
                <div className="text-sm">
                  <div className="font-semibold text-emerald-900">Combo Mañana: +22 pedidos por campaña</div>
                  <div className="text-emerald-800 text-xs mt-1">Repetí el envío el próximo viernes.</div>
                </div>
              </div>
            </div>
          </Card>
        </Section>
      </div>
    </div>
  );
}
