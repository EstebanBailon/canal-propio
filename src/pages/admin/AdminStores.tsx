import { Card, Badge, Button, Section } from '../../components/ui';
import { useApp } from '../../data/store';
import { MapPin, Phone, Copy } from 'lucide-react';

export function AdminStores() {
  const { business, stores, storeModels } = useApp();
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-ink-900">Locales</h1>
        <p className="text-ink-500 mt-1">Sucursales de la marca <span className="font-semibold">{business.name}</span>. Cada local hereda del Modelo de Local y puede tener overrides.</p>
      </div>

      <Section title="Sucursales activas" action={<Button variant="outline">+ Nuevo local</Button>}>
        <div className="grid md:grid-cols-2 gap-4">
          {stores.map((s) => {
            const model = storeModels.find(m => m.id === s.modelId);
            return (
              <Card key={s.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-ink-900">{s.name}</div>
                    <div className="text-sm text-ink-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {s.address}</div>
                    <div className="text-sm text-ink-500 flex items-center gap-1"><Phone className="w-3 h-3" /> {s.phone}</div>
                  </div>
                  <Badge className={s.active ? 'bg-emerald-100 text-emerald-700 ring-emerald-200' : 'bg-ink-100 text-ink-600 ring-ink-200'}>
                    {s.active ? 'Activo' : 'Pausado'}
                  </Badge>
                </div>
                <div className="mt-4 p-3 rounded-xl bg-ink-50">
                  <div className="text-xs uppercase text-ink-500 font-medium">Modelo asignado</div>
                  <div className="text-sm font-semibold text-ink-800 mt-1 flex items-center gap-2">
                    <Copy className="w-3 h-3 text-ink-500" /> {model?.name ?? '—'}
                  </div>
                  {s.overrides && (
                    <div className="mt-2 text-xs text-amber-700 bg-amber-50 ring-1 ring-amber-100 rounded px-2 py-1">
                      Tiene overrides locales (ej. monto mínimo)
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
