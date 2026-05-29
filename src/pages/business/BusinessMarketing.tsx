import { useState } from 'react';
import { Card, Badge, Button, Section, Select, Input, Stat } from '../../components/ui';
import { useApp } from '../../data/store';
import { segments } from '../../data/mock';
import type { CampaignChannel, CampaignObjective, SegmentKey, Campaign } from '../../types';
import { Sparkles, Send, MessageSquare, Mail, Bell, Wand2, Plus } from 'lucide-react';
import { money } from '../../utils/format';

const objectives: { key: CampaignObjective; label: string; emoji: string }[] = [
  { key: 'reactivar', label: 'Reactivar clientes', emoji: '🔁' },
  { key: 'frecuencia', label: 'Aumentar frecuencia', emoji: '📈' },
  { key: 'producto', label: 'Promocionar producto', emoji: '⭐' },
  { key: 'recuperar-dormidos', label: 'Recuperar dormidos', emoji: '💤' },
  { key: 'ticket', label: 'Subir ticket promedio', emoji: '💸' },
];

const variantesPorObjetivo: Record<CampaignObjective, string[]> = {
  reactivar: [
    '¡Te extrañamos {nombre}! Te dejamos 50 puntos extra para tu próximo café ☕',
    'Hace rato que no te vemos. Vení esta semana y tu chajá va de regalo 🍰',
    '{nombre}, queremos invitarte un café. Pasá antes del domingo ✨',
  ],
  frecuencia: [
    '¡Hola {nombre}! Combo Mañana con 10% extra hoy. Pedí desde la app 🥐',
    '2x1 en tostados de 15 a 18hs. Ideal para la oficina 🥪',
    'Llevá pan dulce y sumás 2x puntos esta semana 🍞',
  ],
  producto: [
    'Nuestro chajá artesanal vuelve esta semana. Reservá el tuyo 🍰',
    'Submarino caliente para arrancar la mañana. Pedido en 2 minutos 🍫',
    'Sándwich vegetal con palta y rúcula — recomendación de la casa 🥗',
  ],
  'recuperar-dormidos': [
    '{nombre}, te dejamos 80 puntos por volver. Válido por 7 días ⭐',
    'Cupón exclusivo del 20% off — esta vez es solo para vos.',
    'Volvé esta semana y el café con leche te lo invitamos nosotros ☕',
  ],
  ticket: [
    'Agregá un postre por solo $150 a tu pedido 🍰',
    'Combo Café + Tostado + Postre a precio especial hoy 🥪',
    'Hacé tu pedido + $300 y el envío va sin cargo 🛵',
  ],
};

export function BusinessMarketing() {
  const { campaigns, upsertCampaign, customers } = useApp();
  const [open, setOpen] = useState(false);

  // form state
  const [objective, setObjective] = useState<CampaignObjective>('recuperar-dormidos');
  const [seg, setSeg] = useState<SegmentKey>('dormido');
  const [channel, setChannel] = useState<CampaignChannel>('whatsapp');
  const [name, setName] = useState('');
  const [variants, setVariants] = useState<string[]>([]);
  const [chosen, setChosen] = useState<string>('');

  const audienceCount = customers.filter(c => c.segment === seg).length;

  const generate = () => {
    const v = variantesPorObjetivo[objective];
    setVariants(v);
    setChosen(v[0]);
  };

  const sendCampaign = () => {
    const c: Campaign = {
      id: 'cm-' + Math.random().toString(36).slice(2, 6),
      name: name || `${objectives.find(o => o.key === objective)?.label} — ${seg}`,
      objective, segmentKey: seg, channel, message: chosen,
      status: 'enviada',
      metrics: {
        sent: audienceCount,
        opened: Math.round(audienceCount * 0.78),
        clicked: Math.round(audienceCount * 0.32),
        orders: Math.round(audienceCount * 0.14),
        revenue: Math.round(audienceCount * 0.14 * 580),
      },
      createdAt: new Date().toISOString().slice(0, 10),
    };
    upsertCampaign(c);
    setOpen(false);
    setVariants([]); setChosen(''); setName('');
  };

  const channelIcon = (c: CampaignChannel) =>
    c === 'whatsapp' ? <MessageSquare className="w-3 h-3" /> :
    c === 'email' ? <Mail className="w-3 h-3" /> : <Bell className="w-3 h-3" />;

  return (
    <div>
      <div className="flex items-end justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Marketing con IA</h1>
          <p className="text-ink-500 mt-1">Lanzá campañas en minutos. La IA escribe el mensaje y elige el segmento.</p>
        </div>
        <Button iconLeft={<Plus className="w-4 h-4" />} onClick={() => setOpen(true)}>Nueva campaña</Button>
      </div>

      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <Stat label="Campañas totales" value={campaigns.length} />
        <Stat label="Enviadas" value={campaigns.filter(c => c.status === 'enviada').length} />
        <Stat label="Pedidos generados" value={campaigns.reduce((a, c) => a + c.metrics.orders, 0)} accent="up" />
        <Stat label="Ingresos atribuidos" value={money(campaigns.reduce((a, c) => a + c.metrics.revenue, 0))} accent="up" />
      </div>

      <Section title="Campañas">
        <div className="space-y-3">
          {campaigns.map((c) => {
            const segDef = segments.find(s => s.key === c.segmentKey);
            const openRate = c.metrics.sent ? Math.round((c.metrics.opened / c.metrics.sent) * 100) : 0;
            const clickRate = c.metrics.opened ? Math.round((c.metrics.clicked / c.metrics.opened) * 100) : 0;
            return (
              <Card key={c.id} className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-ink-100 text-ink-700 ring-ink-200 capitalize">{channelIcon(c.channel)} {c.channel}</Badge>
                      <Badge className={`${segDef?.color} ring-transparent`}>{segDef?.name}</Badge>
                      <Badge className={c.status === 'enviada' ? 'bg-emerald-100 text-emerald-700 ring-emerald-200' : c.status === 'programada' ? 'bg-indigo-100 text-indigo-700 ring-indigo-200' : 'bg-ink-100 text-ink-600 ring-ink-200'}>
                        {c.status}
                      </Badge>
                    </div>
                    <div className="mt-2 font-semibold text-ink-900">{c.name}</div>
                    <div className="text-xs text-ink-500 mt-1 line-clamp-1">{c.message}</div>
                  </div>
                  <div className="grid grid-cols-5 gap-3 text-center">
                    <div><div className="text-xs text-ink-500">Enviados</div><div className="font-bold text-ink-900">{c.metrics.sent}</div></div>
                    <div><div className="text-xs text-ink-500">Abiertos</div><div className="font-bold text-ink-900">{openRate}%</div></div>
                    <div><div className="text-xs text-ink-500">Clics</div><div className="font-bold text-ink-900">{clickRate}%</div></div>
                    <div><div className="text-xs text-ink-500">Pedidos</div><div className="font-bold text-emerald-700">{c.metrics.orders}</div></div>
                    <div><div className="text-xs text-ink-500">Ingresos</div><div className="font-bold text-emerald-700">{money(c.metrics.revenue)}</div></div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {open && (
        <div className="fixed inset-0 bg-ink-900/50 z-50 flex items-end md:items-center justify-center p-4" onClick={() => setOpen(false)}>
          <Card className="w-full max-w-2xl max-h-[92vh] overflow-auto" >
            <div onClick={(e) => e.stopPropagation()} className="p-6">
              <h3 className="text-xl font-bold text-ink-900 flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-600" /> Nueva campaña</h3>

              {/* 1. Objetivo */}
              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">1. Objetivo</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {objectives.map((o) => (
                    <button key={o.key} onClick={() => setObjective(o.key)}
                      className={`p-3 rounded-xl border text-left ${objective === o.key ? 'border-brand-500 bg-brand-50' : 'border-ink-200'}`}>
                      <div className="text-xl">{o.emoji}</div>
                      <div className="text-sm font-semibold text-ink-800 mt-1">{o.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Segmento */}
              <div className="mt-5">
                <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-2">2. Audiencia</div>
                <div className="grid grid-cols-3 gap-2">
                  <Select value={seg} onChange={(e) => setSeg(e.target.value as SegmentKey)}>
                    {segments.map((s) => <option key={s.key} value={s.key}>{s.name}</option>)}
                  </Select>
                  <div className="rounded-xl bg-ink-50 px-3 flex items-center text-sm">
                    <span className="text-ink-500 mr-2">Alcance:</span> <span className="font-bold text-ink-900">{audienceCount}</span>
                  </div>
                  <Select value={channel} onChange={(e) => setChannel(e.target.value as CampaignChannel)}>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="push">Push</option>
                  </Select>
                </div>
              </div>

              {/* 3. IA */}
              <div className="mt-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">3. Mensaje (IA)</div>
                  <Button size="sm" variant="outline" iconLeft={<Wand2 className="w-3 h-3" />} onClick={generate}>Generar variantes</Button>
                </div>
                {variants.length === 0 && (
                  <div className="p-4 rounded-xl bg-ink-50 text-sm text-ink-500 text-center">
                    Hacé click en <span className="font-semibold">Generar variantes</span> para que la IA proponga 3 opciones según el objetivo.
                  </div>
                )}
                {variants.length > 0 && (
                  <div className="space-y-2">
                    {variants.map((v, i) => (
                      <label key={i} className={`block p-3 rounded-xl border cursor-pointer ${chosen === v ? 'border-brand-500 bg-brand-50' : 'border-ink-200'}`}>
                        <div className="flex items-start gap-2">
                          <input type="radio" checked={chosen === v} onChange={() => setChosen(v)} className="mt-1" />
                          <div className="text-sm text-ink-800">{v}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* nombre + preview */}
              <div className="mt-5 grid md:grid-cols-2 gap-4">
                <Input label="Nombre interno (opcional)" placeholder="Ej. Reactivación dormidos junio" value={name} onChange={(e) => setName(e.target.value)} />
                <div>
                  <div className="text-xs font-medium text-ink-600">Preview</div>
                  <div className="mt-1 rounded-2xl p-3 bg-emerald-50 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2 text-xs text-emerald-800 font-semibold"><MessageSquare className="w-3 h-3" /> Vista previa WhatsApp</div>
                    <div className="bg-white rounded-xl p-3 text-sm text-ink-800 shadow-sm">{chosen || 'Tu mensaje aparece acá'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button iconLeft={<Send className="w-4 h-4" />} onClick={sendCampaign} disabled={!chosen}>Enviar a {audienceCount}</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
