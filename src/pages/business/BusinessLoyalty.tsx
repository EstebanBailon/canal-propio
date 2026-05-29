import { Card, Badge, Button, Stat, Input, Toggle, Section } from '../../components/ui';
import { useApp } from '../../data/store';
import { Gift, Sparkles, Save } from 'lucide-react';
import { useState } from 'react';

export function BusinessLoyalty() {
  const { loyaltyProgram, updateLoyalty, rewards, updateReward, customers } = useApp();
  const [draft, setDraft] = useState(loyaltyProgram);
  const emitted = customers.reduce((a, c) => a + c.points, 0);
  const redeemed = 320;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-ink-900">Fidelización</h1>
        <p className="text-ink-500 mt-1">Programa de puntos simple. El cliente acumula con cada compra y canjea recompensas.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Stat label="Puntos emitidos" value={emitted} hint="Histórico" />
        <Stat label="Puntos canjeados" value={redeemed} hint="Este mes" />
        <Stat label="Tasa de canje" value={`${Math.round((redeemed / emitted) * 100)}%`} accent="up" />
        <Stat label="Recompensas activas" value={rewards.filter(r => r.active).length} />
      </div>

      <Section title="Reglas del programa" subtitle="Editables. Se aplican a partir del próximo pedido.">
        <Card className="p-6 grid md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-1">
            <Input label="Cada $ gastado..." type="number" value={draft.pointsPerCurrencyUnit}
              onChange={(e) => setDraft({ ...draft, pointsPerCurrencyUnit: +e.target.value })} />
            <p className="text-xs text-ink-500 mt-1">otorga 1 punto</p>
          </div>
          <div>
            <Input label="Bono de bienvenida (pts)" type="number" value={draft.welcomeBonus}
              onChange={(e) => setDraft({ ...draft, welcomeBonus: +e.target.value })} />
          </div>
          <div className="flex items-center gap-3">
            <Toggle checked={draft.active} onChange={(v) => setDraft({ ...draft, active: v })} label="Programa activo" />
            <Button iconLeft={<Save className="w-4 h-4" />} onClick={() => updateLoyalty(draft)}>Guardar</Button>
          </div>
        </Card>
      </Section>

      <Section title="Recompensas" action={<Button variant="outline">+ Nueva recompensa</Button>}>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-3xl flex items-center justify-center">{r.emoji}</div>
                <Badge className="bg-brand-100 text-brand-800 ring-brand-200">{r.pointsCost} pts</Badge>
              </div>
              <div className="mt-3 font-semibold text-ink-900">{r.name}</div>
              <div className="text-xs text-ink-500">{r.description}</div>
              <div className="mt-4 flex items-center justify-between">
                <Toggle checked={r.active} onChange={(v) => updateReward({ ...r, active: v })} label="Activa" />
                <Button size="sm" variant="ghost">Editar</Button>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Top clientes por puntos">
        <Card className="p-2">
          {[...customers].sort((a, b) => b.points - a.points).slice(0, 5).map((c, i) => (
            <div key={c.id} className="flex items-center gap-3 p-3 border-b border-ink-100 last:border-0">
              <div className="w-6 text-center text-xs font-bold text-ink-500">#{i + 1}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm text-ink-900">{c.name}</div>
                <div className="text-xs text-ink-500">{c.totalOrders} pedidos</div>
              </div>
              <div className="flex items-center gap-1 text-brand-700 font-bold"><Gift className="w-4 h-4" /> {c.points}</div>
            </div>
          ))}
        </Card>
      </Section>

      <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100 text-sm flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-amber-700 mt-0.5" />
        <div className="text-amber-900">
          <span className="font-semibold">Sugerencia:</span> tu tasa de canje es alta (≈18%) — los clientes ven valor real. Probá duplicar puntos los martes para subir frecuencia en el día más flojo.
        </div>
      </div>
    </div>
  );
}
