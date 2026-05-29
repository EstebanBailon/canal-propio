import { useState } from 'react';
import { Card, Badge, Button } from '../../components/ui';
import { useApp } from '../../data/store';
import { money, datetime, orderStatusColor, nextStatus } from '../../utils/format';
import type { Order, OrderStatus } from '../../types';
import { MessageSquare, X } from 'lucide-react';

const statusTabs: { key: OrderStatus | 'todos'; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'nuevo', label: 'Nuevos' },
  { key: 'aceptado', label: 'Aceptados' },
  { key: 'preparando', label: 'Preparando' },
  { key: 'listo', label: 'Listos' },
  { key: 'enviado', label: 'Enviados' },
  { key: 'entregado', label: 'Entregados' },
  { key: 'cancelado', label: 'Cancelados' },
];

export function BusinessOrders() {
  const { orders, customers, updateOrderStatus } = useApp();
  const [tab, setTab] = useState<OrderStatus | 'todos'>('todos');
  const [open, setOpen] = useState<Order | null>(null);
  const [waToast, setWaToast] = useState<string | null>(null);

  const filtered = tab === 'todos' ? orders : orders.filter(o => o.status === tab);

  const advance = (o: Order) => {
    const n = nextStatus(o.status);
    if (n) updateOrderStatus(o.id, n as OrderStatus);
  };

  const sendWA = (msg: string) => {
    setWaToast(msg);
    setTimeout(() => setWaToast(null), 2500);
  };

  return (
    <div>
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Pedidos</h1>
          <p className="text-ink-500 mt-1">Operación diaria. Cambiá estados y notificá al cliente por WhatsApp.</p>
        </div>
      </div>

      <Card className="p-2 mb-4 flex items-center gap-1 overflow-x-auto no-scrollbar">
        {statusTabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-3 h-9 rounded-lg text-sm font-medium whitespace-nowrap ${tab === t.key ? 'bg-ink-900 text-white' : 'text-ink-600 hover:bg-ink-100'}`}>
            {t.label} ({t.key === 'todos' ? orders.length : orders.filter(o => o.status === t.key).length})
          </button>
        ))}
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="text-left p-3">Código</th>
              <th className="text-left p-3">Cliente</th>
              <th className="text-left p-3">Método</th>
              <th className="text-left p-3">Pago</th>
              <th className="text-left p-3">Total</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3">Hora</th>
              <th className="text-right p-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((o) => {
              const c = customers.find(x => x.id === o.customerId);
              return (
                <tr key={o.id} className="hover:bg-ink-50/50 cursor-pointer" onClick={() => setOpen(o)}>
                  <td className="p-3 font-mono text-xs text-ink-700">{o.code}</td>
                  <td className="p-3">
                    <div className="font-semibold text-sm text-ink-900">{c?.name}</div>
                    <div className="text-xs text-ink-500">{c?.phone}</div>
                  </td>
                  <td className="p-3 text-xs text-ink-700 capitalize">{o.deliveryMethod.replace('-', ' ')}</td>
                  <td className="p-3 text-xs text-ink-700 capitalize">{o.paymentMethod}</td>
                  <td className="p-3 font-semibold text-ink-900">{money(o.total)}</td>
                  <td className="p-3"><Badge className={orderStatusColor(o.status)}>{o.status}</Badge></td>
                  <td className="p-3 text-xs text-ink-500">{datetime(o.createdAt)}</td>
                  <td className="p-3 text-right" onClick={(e) => e.stopPropagation()}>
                    {nextStatus(o.status) && (
                      <Button size="sm" onClick={() => advance(o)}>→ {nextStatus(o.status)}</Button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {open && (
        <div className="fixed inset-0 bg-ink-900/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setOpen(null)}>
          <Card className="w-full max-w-lg max-h-[90vh] overflow-auto" >
            <div onClick={(e) => e.stopPropagation()}>
              <div className="p-5 border-b border-ink-100 flex items-center justify-between">
                <div>
                  <div className="font-mono text-xs text-ink-500">{open.code}</div>
                  <div className="font-bold text-ink-900 text-lg">Pedido</div>
                </div>
                <button onClick={() => setOpen(null)} className="w-8 h-8 rounded-lg hover:bg-ink-100 flex items-center justify-center"><X className="w-4 h-4" /></button>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className={orderStatusColor(open.status)}>{open.status}</Badge>
                  <div className="text-xs text-ink-500">{datetime(open.createdAt)}</div>
                </div>

                <div className="rounded-xl bg-ink-50 p-3">
                  <div className="text-xs text-ink-500">Cliente</div>
                  <div className="font-semibold text-ink-900">{customers.find(c => c.id === open.customerId)?.name}</div>
                  <div className="text-xs text-ink-500">{customers.find(c => c.id === open.customerId)?.phone}</div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">Items</div>
                  <div className="space-y-2">
                    {open.items.map((it, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span>{it.qty}× {it.name}</span>
                        <span className="font-semibold">{money(it.qty * it.unitPrice)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-ink-100 space-y-1 text-sm">
                    <div className="flex justify-between text-ink-600"><span>Subtotal</span><span>{money(open.subtotal)}</span></div>
                    {open.deliveryFee > 0 && <div className="flex justify-between text-ink-600"><span>Envío</span><span>{money(open.deliveryFee)}</span></div>}
                    <div className="flex justify-between font-bold text-ink-900"><span>Total</span><span>{money(open.total)}</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-ink-50 p-2"><span className="text-ink-500">Método:</span> <span className="capitalize font-medium">{open.deliveryMethod.replace('-', ' ')}</span></div>
                  <div className="rounded-lg bg-ink-50 p-2"><span className="text-ink-500">Pago:</span> <span className="capitalize font-medium">{open.paymentMethod}</span></div>
                </div>

                {open.notes && (
                  <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 text-sm text-amber-900">
                    <span className="font-semibold">Nota del cliente:</span> {open.notes}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  {nextStatus(open.status) && (
                    <Button onClick={() => { advance(open); setOpen({ ...open, status: nextStatus(open.status) as OrderStatus }); }}>
                      Pasar a {nextStatus(open.status)}
                    </Button>
                  )}
                  <Button variant="outline" iconLeft={<MessageSquare className="w-4 h-4" />} onClick={() => sendWA(`WhatsApp enviado a ${customers.find(c => c.id === open.customerId)?.name}: "Tu pedido ${open.code} está ${open.status}"`)}>
                    Notificar WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {waToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-soft flex items-center gap-2 z-50">
          <MessageSquare className="w-4 h-4" /> {waToast}
        </div>
      )}
    </div>
  );
}
