import { useState } from 'react';
import { Card, Badge, Button, Input, Toggle } from '../../components/ui';
import { useApp } from '../../data/store';
import { Copy, Save, Layers, Clock, Truck, CreditCard, Sparkles, Settings2, Boxes, MessageSquare, Gift, Palette } from 'lucide-react';

const tabs = [
  { key: 'info', label: 'Info', icon: <Settings2 className="w-4 h-4" /> },
  { key: 'horarios', label: 'Horarios', icon: <Clock className="w-4 h-4" /> },
  { key: 'entrega', label: 'Entrega', icon: <Truck className="w-4 h-4" /> },
  { key: 'pagos', label: 'Pagos', icon: <CreditCard className="w-4 h-4" /> },
  { key: 'catalogo', label: 'Catálogo', icon: <Boxes className="w-4 h-4" /> },
  { key: 'puntos', label: 'Puntos', icon: <Gift className="w-4 h-4" /> },
  { key: 'mensajes', label: 'Mensajes auto', icon: <MessageSquare className="w-4 h-4" /> },
  { key: 'campanas', label: 'Campañas sug.', icon: <Sparkles className="w-4 h-4" /> },
  { key: 'branding', label: 'Branding', icon: <Palette className="w-4 h-4" /> },
  { key: 'reglas', label: 'Reglas op.', icon: <Layers className="w-4 h-4" /> },
];

export function AdminStoreModel() {
  const { storeModel, updateStoreModel, cloneStoreModel, storeModels, categories, products } = useApp();
  const [tab, setTab] = useState<string>('info');
  const [draft, setDraft] = useState(storeModel);
  const [cloneOpen, setCloneOpen] = useState(false);
  const [cloneName, setCloneName] = useState('Modelo Café Central — copia');

  const save = () => {
    updateStoreModel(draft);
    alert('Modelo actualizado ✔');
  };

  return (
    <div>
      <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
        <div>
          <Badge className="bg-brand-100 text-brand-800 ring-brand-200 mb-2"><Layers className="w-3 h-3" /> Plantilla reutilizable</Badge>
          <h1 className="text-3xl font-extrabold text-ink-900">Modelo de Local</h1>
          <p className="text-ink-500 mt-1 max-w-2xl">Es la pieza central del producto. Configurás una vez todo lo que necesita un local —catálogo, zonas, pagos, branding, puntos, mensajes— y lo clonás para abrir sucursales o nuevas marcas.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" iconLeft={<Copy className="w-4 h-4" />} onClick={() => setCloneOpen(true)}>Clonar modelo</Button>
          <Button iconLeft={<Save className="w-4 h-4" />} onClick={save}>Guardar cambios</Button>
        </div>
      </div>

      {/* lista de modelos existentes */}
      <Card className="p-4 mb-6 flex items-center gap-2 flex-wrap">
        <span className="text-xs uppercase tracking-wider text-ink-500 mr-2">Modelos:</span>
        {storeModels.map((m) => (
          <Badge key={m.id} className={`${m.id === storeModel.id ? 'bg-brand-600 text-white ring-brand-700' : 'bg-ink-100 text-ink-700 ring-ink-200'}`}>
            {m.name}
          </Badge>
        ))}
      </Card>

      <div className="grid md:grid-cols-[220px,1fr] gap-6">
        {/* tabs sidebar */}
        <Card className="p-2 h-fit">
          {tabs.map((t) => (
            <button key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left ${tab === t.key ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-ink-600 hover:bg-ink-50'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </Card>

        {/* content */}
        <div className="space-y-4">
          {tab === 'info' && (
            <Card className="p-6 space-y-4">
              <Input label="Nombre del modelo" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              <div>
                <span className="text-xs font-medium text-ink-600">Descripción</span>
                <textarea value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                  className="mt-1 w-full p-3 rounded-xl border border-ink-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 min-h-[88px]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Toggle checked={draft.pickupEnabled} onChange={(v) => setDraft({ ...draft, pickupEnabled: v })} label="Retiro en local habilitado" />
                <Toggle checked={draft.deliveryEnabled} onChange={(v) => setDraft({ ...draft, deliveryEnabled: v })} label="Delivery habilitado" />
              </div>
            </Card>
          )}

          {tab === 'horarios' && (
            <Card className="p-6">
              <h3 className="font-semibold text-ink-900 mb-3">Horarios estándar</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {draft.schedule.map((s, i) => (
                  <div key={s.day} className="flex items-center gap-2 rounded-xl bg-ink-50 p-3">
                    <div className="font-semibold w-10 uppercase text-xs text-ink-700">{s.day}</div>
                    <input value={s.open} onChange={(e) => {
                      const cp = [...draft.schedule]; cp[i] = { ...cp[i], open: e.target.value }; setDraft({ ...draft, schedule: cp });
                    }} className="h-8 px-2 rounded border border-ink-200 w-20 text-sm" />
                    <span className="text-ink-400 text-xs">a</span>
                    <input value={s.close} onChange={(e) => {
                      const cp = [...draft.schedule]; cp[i] = { ...cp[i], close: e.target.value }; setDraft({ ...draft, schedule: cp });
                    }} className="h-8 px-2 rounded border border-ink-200 w-20 text-sm" />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'entrega' && (
            <>
              <Card className="p-6">
                <h3 className="font-semibold text-ink-900 mb-3">Zonas de delivery</h3>
                <div className="space-y-2">
                  {draft.deliveryZones.map((z, i) => (
                    <div key={i} className="grid grid-cols-12 items-end gap-2 rounded-xl bg-ink-50 p-3">
                      <Input label="Zona" value={z.name} className="col-span-4" onChange={(e) => {
                        const cp = [...draft.deliveryZones]; cp[i] = { ...cp[i], name: e.target.value }; setDraft({ ...draft, deliveryZones: cp });
                      }} />
                      <Input label="Envío $" type="number" value={z.fee} className="col-span-2" onChange={(e) => {
                        const cp = [...draft.deliveryZones]; cp[i] = { ...cp[i], fee: +e.target.value }; setDraft({ ...draft, deliveryZones: cp });
                      }} />
                      <Input label="Pedido mín $" type="number" value={z.minOrder} className="col-span-3" onChange={(e) => {
                        const cp = [...draft.deliveryZones]; cp[i] = { ...cp[i], minOrder: +e.target.value }; setDraft({ ...draft, deliveryZones: cp });
                      }} />
                      <Input label="ETA min" type="number" value={z.etaMinutes} className="col-span-3" onChange={(e) => {
                        const cp = [...draft.deliveryZones]; cp[i] = { ...cp[i], etaMinutes: +e.target.value }; setDraft({ ...draft, deliveryZones: cp });
                      }} />
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-3">+ Agregar zona</Button>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-ink-900 mb-3">Retiro en local</h3>
                <p className="text-sm text-ink-500 mb-3">Activado para todos los locales que usan este modelo. El cliente puede ver tiempo estimado de preparación al hacer el pedido.</p>
                <Toggle checked={draft.pickupEnabled} onChange={(v) => setDraft({ ...draft, pickupEnabled: v })} label="Permitir retiro en local" />
              </Card>
            </>
          )}

          {tab === 'pagos' && (
            <Card className="p-6">
              <h3 className="font-semibold text-ink-900 mb-3">Métodos de pago aceptados</h3>
              <div className="grid grid-cols-2 gap-3">
                {(['efectivo', 'mercadopago', 'tarjeta-local', 'transferencia'] as const).map((m) => {
                  const on = draft.paymentMethods.includes(m);
                  return (
                    <button key={m} onClick={() => {
                      setDraft({
                        ...draft,
                        paymentMethods: on ? draft.paymentMethods.filter(x => x !== m) : [...draft.paymentMethods, m],
                      });
                    }} className={`p-4 rounded-xl border text-left ${on ? 'border-brand-500 bg-brand-50' : 'border-ink-200 bg-white'}`}>
                      <div className="font-semibold text-ink-900 capitalize">{m.replace('-', ' ')}</div>
                      <div className="text-xs text-ink-500 mt-1">{on ? 'Habilitado' : 'Desactivado'}</div>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {tab === 'catalogo' && (
            <Card className="p-6">
              <h3 className="font-semibold text-ink-900 mb-3">Catálogo base ({products.length} productos · {categories.length} categorías)</h3>
              <p className="text-sm text-ink-500 mb-3">El catálogo se hereda al local. Cada local puede pausar productos sin cambiar el modelo.</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {categories.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl border border-ink-100">
                    <div className="font-semibold text-ink-900">{c.emoji} {c.name}</div>
                    <div className="mt-2 space-y-1">
                      {products.filter(p => p.categoryId === c.id).map(p => (
                        <div key={p.id} className="flex justify-between text-sm">
                          <span className="text-ink-700">{p.name}</span>
                          <span className="text-ink-500">$ {p.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'puntos' && (
            <Card className="p-6">
              <h3 className="font-semibold text-ink-900 mb-3">Programa de puntos asociado</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-ink-50">
                  <div className="text-xs text-ink-500">Cada</div>
                  <div className="text-2xl font-bold text-ink-900 mt-1">$50</div>
                  <div className="text-xs text-ink-500 mt-1">otorgan 1 punto</div>
                </div>
                <div className="p-4 rounded-xl bg-ink-50">
                  <div className="text-xs text-ink-500">Bono de bienvenida</div>
                  <div className="text-2xl font-bold text-ink-900 mt-1">50 pts</div>
                </div>
                <div className="p-4 rounded-xl bg-ink-50">
                  <div className="text-xs text-ink-500">Recompensas</div>
                  <div className="text-2xl font-bold text-ink-900 mt-1">5 activas</div>
                </div>
              </div>
              <p className="text-xs text-ink-500 mt-3">Las reglas se editan desde el panel del negocio en Fidelización.</p>
            </Card>
          )}

          {tab === 'mensajes' && (
            <Card className="p-6">
              <h3 className="font-semibold text-ink-900 mb-3">Mensajes automáticos</h3>
              <div className="space-y-3">
                {draft.autoMessages.map((m, i) => (
                  <div key={i} className="p-3 rounded-xl bg-ink-50">
                    <div className="flex items-center gap-2 text-xs">
                      <Badge className="bg-white text-ink-700 ring-ink-200">{m.trigger}</Badge>
                      <Badge className="bg-emerald-100 text-emerald-700 ring-emerald-200">{m.channel}</Badge>
                    </div>
                    <div className="mt-2 text-sm text-ink-800">{m.template}</div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'campanas' && (
            <Card className="p-6">
              <h3 className="font-semibold text-ink-900 mb-3">Campañas sugeridas</h3>
              <ul className="space-y-2">
                {draft.suggestedCampaigns.map((c, i) => (
                  <li key={i} className="p-3 rounded-xl border border-ink-100 flex items-center justify-between">
                    <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-brand-600" /><span className="text-sm">{c}</span></div>
                    <Button size="sm" variant="outline">Lanzar</Button>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {tab === 'branding' && (
            <Card className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="text-xs font-medium text-ink-600">Color principal</span>
                  <input type="color" value={draft.branding.primaryColor} className="mt-1 w-full h-10 rounded-xl border border-ink-200"
                    onChange={(e) => setDraft({ ...draft, branding: { ...draft.branding, primaryColor: e.target.value } })} />
                </div>
                <div>
                  <span className="text-xs font-medium text-ink-600">Color de acento</span>
                  <input type="color" value={draft.branding.accentColor} className="mt-1 w-full h-10 rounded-xl border border-ink-200"
                    onChange={(e) => setDraft({ ...draft, branding: { ...draft.branding, accentColor: e.target.value } })} />
                </div>
                <Input label="Emoji / logo simple" value={draft.branding.logoEmoji}
                  onChange={(e) => setDraft({ ...draft, branding: { ...draft.branding, logoEmoji: e.target.value } })} />
              </div>
              <Input label="Tagline del hero" value={draft.branding.heroTagline}
                onChange={(e) => setDraft({ ...draft, branding: { ...draft.branding, heroTagline: e.target.value } })} />
              <div className="rounded-xl p-6" style={{ background: draft.branding.primaryColor + '15' }}>
                <div className="text-xs uppercase tracking-widest" style={{ color: draft.branding.primaryColor }}>Preview</div>
                <div className="mt-2 text-2xl font-extrabold text-ink-900">{draft.branding.logoEmoji} {draft.branding.heroTagline}</div>
              </div>
            </Card>
          )}

          {tab === 'reglas' && (
            <Card className="p-6 space-y-4">
              <Input label="Pedido mínimo ($)" type="number" value={draft.operationalRules.minOrderAmount}
                onChange={(e) => setDraft({ ...draft, operationalRules: { ...draft.operationalRules, minOrderAmount: +e.target.value } })} />
              <Input label="Tiempo máx. de preparación (min)" type="number" value={draft.operationalRules.maxPreparationMinutes}
                onChange={(e) => setDraft({ ...draft, operationalRules: { ...draft.operationalRules, maxPreparationMinutes: +e.target.value } })} />
              <Toggle checked={draft.operationalRules.acceptsScheduledOrders} label="Acepta pedidos programados"
                onChange={(v) => setDraft({ ...draft, operationalRules: { ...draft.operationalRules, acceptsScheduledOrders: v } })} />
              <Toggle checked={draft.operationalRules.autoAcceptOrders} label="Aceptar pedidos automáticamente"
                onChange={(v) => setDraft({ ...draft, operationalRules: { ...draft.operationalRules, autoAcceptOrders: v } })} />
            </Card>
          )}
        </div>
      </div>

      {cloneOpen && (
        <div className="fixed inset-0 bg-ink-900/50 flex items-center justify-center p-4 z-50" onClick={() => setCloneOpen(false)}>
          <Card className="p-6 w-full max-w-md" >
            <div onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-ink-900">Clonar modelo</h3>
              <p className="text-sm text-ink-500 mt-1">Crea una copia exacta del modelo actual. Útil para abrir un nuevo local con pequeñas variaciones.</p>
              <Input label="Nombre del nuevo modelo" className="mt-4" value={cloneName} onChange={(e) => setCloneName(e.target.value)} />
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setCloneOpen(false)}>Cancelar</Button>
                <Button onClick={() => { cloneStoreModel(cloneName); setCloneOpen(false); }}>Clonar</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
