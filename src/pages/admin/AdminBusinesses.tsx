import { useState } from 'react';
import { Card, Badge, Button, Input, Select, ProgressBar } from '../../components/ui';
import { useApp } from '../../data/store';
import { Plus, Search } from 'lucide-react';

export function AdminBusinesses() {
  const { allBusinesses } = useApp();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);

  const filtered = allBusinesses.filter(b => b.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Marcas gastronómicas</h1>
          <p className="text-ink-500 mt-1">Clientes del SaaS. Acá se da de alta una nueva marca y se inicia el onboarding.</p>
        </div>
        <Button iconLeft={<Plus className="w-4 h-4" />} onClick={() => setOpen(true)}>Alta de marca</Button>
      </div>

      <Card className="p-4 mb-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar marca…"
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400" />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
            <tr>
              <th className="text-left p-4">Marca</th>
              <th className="text-left p-4">Rubro</th>
              <th className="text-left p-4">Ciudad</th>
              <th className="text-left p-4">Plan</th>
              <th className="text-left p-4">Onboarding</th>
              <th className="text-right p-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-ink-50/50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: b.brandColor + '22' }}>{b.logoEmoji}</div>
                    <div>
                      <div className="font-semibold text-ink-900">{b.name}</div>
                      <div className="text-xs text-ink-500">/{b.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4"><Badge className="bg-ink-100 text-ink-700 ring-ink-200">{b.category}</Badge></td>
                <td className="p-4 text-sm text-ink-700">{b.city}</td>
                <td className="p-4"><Badge className="bg-brand-50 text-brand-700 ring-brand-100">{b.plan}</Badge></td>
                <td className="p-4 w-48">
                  <div className="flex items-center gap-2">
                    <ProgressBar value={b.onboardingProgress} className="flex-1" />
                    <span className="text-xs font-semibold text-ink-600">{b.onboardingProgress}%</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm">Abrir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {open && (
        <div className="fixed inset-0 bg-ink-900/50 flex items-center justify-center p-4 z-50" onClick={() => setOpen(false)}>
          <Card className="p-6 w-full max-w-lg" >
            <div onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-ink-900">Alta de marca gastronómica</h3>
              <p className="text-sm text-ink-500 mt-1">Esto crea la marca y deja lista la plantilla base para configurar el Modelo de Local.</p>
              <div className="mt-5 space-y-3">
                <Input label="Nombre de la marca" placeholder="Ej. Café del Sur" />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Slug (URL)" placeholder="cafe-del-sur" />
                  <Select label="Rubro" defaultValue="cafeteria">
                    <option value="cafeteria">Cafetería</option>
                    <option value="restaurant">Restaurante</option>
                    <option value="bakery">Panadería</option>
                    <option value="rotiseria">Rotisería</option>
                    <option value="bar">Bar</option>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Ciudad" placeholder="Montevideo" />
                  <Select label="Plan" defaultValue="Crece">
                    <option>Esencial</option><option>Crece</option><option>Multi-local</option>
                  </Select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={() => setOpen(false)}>Crear marca</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
