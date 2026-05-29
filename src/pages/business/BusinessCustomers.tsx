import { useState } from 'react';
import { Card, Badge, Button, Stat } from '../../components/ui';
import { useApp } from '../../data/store';
import { money, date } from '../../utils/format';
import { segments as allSegments } from '../../data/mock';
import { Sparkles, X, Phone, Mail } from 'lucide-react';
import type { Customer, SegmentKey } from '../../types';

export function BusinessCustomers() {
  const { customers, orders } = useApp();
  const [seg, setSeg] = useState<SegmentKey | 'todos'>('todos');
  const [open, setOpen] = useState<Customer | null>(null);

  const filtered = seg === 'todos' ? customers : customers.filter(c => c.segment === seg);

  const customerOrders = open ? orders.filter(o => o.customerId === open.id) : [];

  const aiSugg = (c: Customer) => {
    switch (c.segment) {
      case 'dormido': return `Enviá WhatsApp: "Te extrañamos, ${c.name.split(' ')[0]} ☕ Te dejamos 50 puntos extra para tu próximo café".`;
      case 'alto-valor': return `Programá llamada de fidelización + invitación a probar pan dulce nuevo (alto margen).`;
      case 'compro-una-vez': return `Cupón 15% off en próxima compra con vencimiento 7 días por WhatsApp.`;
      case 'nuevo': return `Mensaje de bienvenida + tutorial corto de cómo usar la PWA.`;
      case 'frecuente': return `Recompensa sorpresa (chajá o medialunas gratis) para sostener frecuencia.`;
      default: return 'Mantener seguimiento normal.';
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-ink-900">Clientes</h1>
        <p className="text-ink-500 mt-1">Tu base de clientes propia. Datos reales, no de un marketplace.</p>
      </div>

      <div className="grid md:grid-cols-5 gap-3 mb-6">
        <Stat label="Total clientes" value={customers.length} />
        <Stat label="Nuevos (14d)" value={customers.filter(c => c.segment === 'nuevo').length} accent="up" />
        <Stat label="Frecuentes" value={customers.filter(c => c.segment === 'frecuente').length} />
        <Stat label="Alto valor" value={customers.filter(c => c.segment === 'alto-valor').length} />
        <Stat label="Dormidos" value={customers.filter(c => c.segment === 'dormido').length} accent="down" />
      </div>

      <Card className="p-3 mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button onClick={() => setSeg('todos')}
          className={`px-3 h-9 rounded-xl text-sm font-medium ${seg === 'todos' ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
          Todos
        </button>
        {allSegments.map((s) => (
          <button key={s.key} onClick={() => setSeg(s.key)}
            className={`px-3 h-9 rounded-xl text-sm font-medium ${seg === s.key ? 'bg-ink-900 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
            {s.name} ({customers.filter(c => c.segment === s.key).length})
          </button>
        ))}
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Segmento</th>
              <th className="text-left p-3">Pedidos</th>
              <th className="text-left p-3">Gastado</th>
              <th className="text-left p-3">Ticket prom.</th>
              <th className="text-left p-3">Última compra</th>
              <th className="text-left p-3">Puntos</th>
              <th className="text-right p-3">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((c) => {
              const segDef = allSegments.find(s => s.key === c.segment);
              return (
                <tr key={c.id} className="hover:bg-ink-50/50 cursor-pointer" onClick={() => setOpen(c)}>
                  <td className="p-3">
                    <div className="font-semibold text-sm text-ink-900">{c.name}</div>
                    <div className="text-xs text-ink-500">{c.phone}</div>
                  </td>
                  <td className="p-3"><Badge className={`${segDef?.color} ring-transparent`}>{segDef?.name}</Badge></td>
                  <td className="p-3 text-sm text-ink-700">{c.totalOrders}</td>
                  <td className="p-3 font-semibold text-ink-900">{money(c.totalSpent)}</td>
                  <td className="p-3 text-sm text-ink-700">{money(c.avgTicket)}</td>
                  <td className="p-3 text-xs text-ink-500">{c.lastOrderAt ? date(c.lastOrderAt) : '—'}</td>
                  <td className="p-3 text-sm font-semibold text-brand-700">{c.points}</td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <Button size="sm" variant="outline">Mensaje</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {open && (
        <div className="fixed inset-0 bg-ink-900/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setOpen(null)}>
          <Card className="w-full max-w-lg max-h-[90vh] overflow-auto">
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-5 border-b border-ink-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-ink-900 text-lg">{open.name}</div>
                  <div className="text-xs text-ink-500">Cliente desde {date(open.registeredAt)}</div>
                </div>
                <button onClick={() => setOpen(null)} className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-ink-50 p-2 flex items-center gap-2"><Phone className="w-3 h-3 text-ink-500" />{open.phone}</div>
                  <div className="rounded-lg bg-ink-50 p-2 flex items-center gap-2"><Mail className="w-3 h-3 text-ink-500" />{open.email ?? '—'}</div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  <div className="rounded-lg bg-ink-50 p-2"><div className="text-xs text-ink-500">Pedidos</div><div className="font-bold text-ink-900">{open.totalOrders}</div></div>
                  <div className="rounded-lg bg-ink-50 p-2"><div className="text-xs text-ink-500">Gastado</div><div className="font-bold text-ink-900">{money(open.totalSpent)}</div></div>
                  <div className="rounded-lg bg-ink-50 p-2"><div className="text-xs text-ink-500">Ticket</div><div className="font-bold text-ink-900">{money(open.avgTicket)}</div></div>
                  <div className="rounded-lg bg-brand-50 p-2"><div className="text-xs text-brand-600">Puntos</div><div className="font-bold text-brand-700">{open.points}</div></div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">Historial</div>
                  {customerOrders.length === 0 && <div className="text-sm text-ink-500">Sin compras en el período mostrado.</div>}
                  <div className="space-y-1.5">
                    {customerOrders.map(o => (
                      <div key={o.id} className="flex justify-between p-2 rounded-lg bg-white border border-ink-100 text-sm">
                        <div><span className="font-mono text-xs text-ink-500">{o.code}</span> · <span className="text-ink-700">{o.items.length} items</span></div>
                        <div className="font-semibold text-ink-900">{money(o.total)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-br from-brand-50 to-amber-50 border border-brand-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-brand-700">
                    <Sparkles className="w-4 h-4" /> SUGERENCIA IA
                  </div>
                  <div className="text-sm text-ink-800 mt-1">{aiSugg(open)}</div>
                  <Button size="sm" className="mt-3">Ejecutar acción</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
