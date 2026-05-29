import { Link } from 'react-router-dom';
import { Card, Badge, Button } from '../components/ui';
import { ArrowRight, CheckCircle2, Coffee, MessageSquare, Smartphone, Wallet, LineChart, Sparkles, Users, ShieldCheck, Gift } from 'lucide-react';
import { useState } from 'react';

const features = [
  { icon: <Smartphone className="w-5 h-5" />, title: 'Tu propia app PWA', desc: 'Un canal de venta con tu marca, sin comisiones por pedido.' },
  { icon: <Users className="w-5 h-5" />, title: 'CRM y base de clientes', desc: 'Cada compra alimenta tu base. Datos de verdad, no de un marketplace.' },
  { icon: <Gift className="w-5 h-5" />, title: 'Puntos y recompensas', desc: 'Fidelizá sin complejidad. Reglas simples, recompensas claras.' },
  { icon: <MessageSquare className="w-5 h-5" />, title: 'Campañas por WhatsApp', desc: 'Mensajes generados con IA para reactivar y aumentar frecuencia.' },
  { icon: <Wallet className="w-5 h-5" />, title: 'Cobros con Mercado Pago', desc: 'Checkout integrado con el medio que ya usás.' },
  { icon: <LineChart className="w-5 h-5" />, title: 'Métricas accionables', desc: 'Compará tu canal propio vs marketplace y decidí dónde poner energía.' },
];

const steps = [
  { n: '01', title: 'Configuramos tu Modelo de Local', desc: 'Catálogo, zonas, pagos, branding y reglas operativas. Tu plantilla queda lista para clonar entre sucursales.' },
  { n: '02', title: 'Te entregamos tu PWA', desc: 'Un link y un QR para que tus clientes pidan desde tu propio canal. Sin app store, sin descargas.' },
  { n: '03', title: 'Operás desde un único panel', desc: 'Pedidos, clientes, fidelización y marketing. Una sola herramienta para todo el negocio.' },
  { n: '04', title: 'Crecés con datos', desc: 'Cada compra genera datos. La IA te sugiere campañas para reactivar, aumentar ticket o frecuencia.' },
];

const useCases = [
  { emoji: '☕', title: 'Cafetería con 1 local', desc: 'Empezá vendiendo con tu canal propio en 48hs. Plan Esencial.' },
  { emoji: '🥖', title: 'Panadería con 2-3 sucursales', desc: 'Configurás un modelo y lo clonás. Mismo catálogo, distintos horarios.' },
  { emoji: '🍗', title: 'Rotisería que vende por WhatsApp', desc: 'Pasá del WhatsApp manual a un canal con catálogo, pago y fidelización.' },
  { emoji: '🍺', title: 'Bar de barrio', desc: 'Construí base de clientes recurrentes y reservá tus margenes.' },
];

const plans = [
  { name: 'Esencial', price: 'USD 49', period: '/mes', target: '1 local', features: ['PWA con tu marca', 'Catálogo y pedidos', 'WhatsApp + Mercado Pago', 'CRM básico', 'Hasta 500 clientes'], cta: 'Empezar' },
  { name: 'Crece', price: 'USD 89', period: '/mes', target: '1-3 locales', features: ['Todo Esencial', 'Programa de puntos', 'Campañas WhatsApp con IA', 'Segmentación automática', 'Hasta 2.500 clientes'], featured: true, cta: 'Más elegido' },
  { name: 'Multi-local', price: 'USD 149', period: '/mes + USD 25/local extra', target: '4+ locales', features: ['Todo Crece', 'Modelo de local clonable', 'Comparativo entre sucursales', 'Soporte prioritario', 'Clientes ilimitados'], cta: 'Hablar con ventas' },
];

const faqs = [
  { q: '¿Cuánto demora el alta?', a: 'Entre 48 y 72hs hábiles. Te entregamos la PWA cargada con tu catálogo, branding e integraciones.' },
  { q: '¿Reemplaza a PedidosYa o Rappi?', a: 'No los reemplaza, los complementa. La idea es que el canal propio gane peso para reducir dependencia y comisiones.' },
  { q: '¿Cómo cobramos los pedidos?', a: 'Por Mercado Pago en la PWA, o cobro presencial / transferencia. Vos definís qué métodos habilitar.' },
  { q: '¿Y si solo tengo WhatsApp?', a: 'Perfecto, ese es el caso ideal. Convertimos esa operación manual en un canal con catálogo, datos y fidelización.' },
  { q: '¿Cobran comisión por pedido?', a: 'No. El plan es una mensualidad fija. Opcionalmente podemos sumar una comisión muy baja si querés un plan sin mensualidad.' },
];

export function LandingPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-amber-50" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-brand-100 text-brand-800 ring-brand-200">
              <Sparkles className="w-3 h-3" /> Hecho para gastronómicos chicos y medianos
            </Badge>
            <h1 className="mt-5 text-5xl md:text-6xl font-extrabold text-ink-900 leading-[1.05]">
              Tu canal propio de venta y fidelización, <span className="text-brand-600">sin comisiones del marketplace</span>.
            </h1>
            <p className="mt-6 text-lg text-ink-600 max-w-xl">
              Plato es la plataforma para que cafeterías, panaderías, rotiserías y restaurantes tengan su PWA, su CRM y su programa de puntos.
              Operás todo desde un panel y dejás de regalar el dato del cliente.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/admin"><Button size="lg" iconLeft={<Coffee className="w-4 h-4" />}>Ver demo de admin</Button></Link>
              <Link to="/app/cafe-central-mvd"><Button size="lg" variant="outline">Ver app del cliente</Button></Link>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-ink-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Alta en 48hs</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Sin permanencia</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% en español</div>
            </div>
          </div>

          {/* mock visual */}
          <div className="relative">
            <div className="absolute -top-6 -right-4 hidden md:block bg-white shadow-soft border border-ink-100 rounded-2xl p-3 w-56">
              <div className="text-xs text-ink-500">Pedidos hoy</div>
              <div className="text-2xl font-bold text-ink-900">38</div>
              <div className="text-xs text-emerald-600 font-medium">+24% vs ayer</div>
            </div>
            <div className="absolute -bottom-6 -left-4 hidden md:block bg-white shadow-soft border border-ink-100 rounded-2xl p-3 w-60">
              <div className="text-xs text-ink-500">Campaña enviada</div>
              <div className="text-sm font-semibold text-ink-900">Reactivación dormidos</div>
              <div className="text-xs text-ink-500 mt-1">142 enviados · 18 pedidos generados</div>
            </div>
            <div className="phone-frame mx-auto rotate-2">
              <div>
                <div className="h-32 bg-gradient-to-br from-brand-500 to-amber-400 p-4 text-white">
                  <div className="text-[10px] uppercase tracking-widest opacity-90">Café Central MVD</div>
                  <div className="text-xl font-bold leading-tight mt-1">Tu café de siempre, ahora a un click</div>
                </div>
                <div className="p-4 space-y-3">
                  {['☕ Café con leche', '🥐 Medialunas (x3)', '🥪 Tostado mixto'].map((t, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-ink-100 p-3">
                      <div className="text-sm font-medium text-ink-800">{t}</div>
                      <div className="text-sm font-bold text-brand-600">$ {220 + i * 50}</div>
                    </div>
                  ))}
                  <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Tenés 220 puntos disponibles
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-rose-50 text-rose-700 ring-rose-100">El problema</Badge>
          <h2 className="mt-4 text-4xl font-extrabold text-ink-900">Vender por marketplace te resuelve hoy y te limita mañana.</h2>
          <p className="mt-4 text-ink-600">Cada pedido que entra por Rappi o PedidosYa es un cliente que no es tuyo. No tenés su contacto, no sabés cuándo dejó de comprarte y cada venta te deja entre 18% y 30% de comisión.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {[
            { n: '20-30%', t: 'comisión por pedido', d: 'Erosiona el margen y obliga a subir precios.' },
            { n: '0%', t: 'datos de clientes', d: 'No tenés contacto, frecuencia ni historial real.' },
            { n: '1 vez', t: 'compran y no vuelven', d: 'Sin remarketing, no hay recompra.' },
            { n: '↓', t: 'baja recompra', d: 'Dependés de descuentos y posiciones pagas.' },
          ].map((it, i) => (
            <Card key={i} className="p-6">
              <div className="text-3xl font-bold text-rose-600">{it.n}</div>
              <div className="mt-1 font-semibold text-ink-900">{it.t}</div>
              <div className="mt-2 text-sm text-ink-500">{it.d}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* PROPUESTA DE VALOR */}
      <section className="bg-ink-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-brand-500/10 text-brand-300 ring-brand-500/30">Lo que te damos</Badge>
            <h2 className="mt-4 text-4xl font-extrabold">Tu canal. Tu cliente. Tu dato.</h2>
            <p className="mt-4 text-ink-300">Una sola herramienta para vender, fidelizar y hacer marketing desde el primer pedido.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-ink-800/60 border border-ink-700">
                <div className="w-10 h-10 rounded-xl bg-brand-500/15 text-brand-400 flex items-center justify-center">{f.icon}</div>
                <div className="mt-4 font-semibold text-lg">{f.title}</div>
                <div className="mt-1 text-sm text-ink-300">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-ink-100 text-ink-700 ring-ink-200">Cómo funciona</Badge>
          <h2 className="mt-4 text-4xl font-extrabold text-ink-900">De WhatsApp manual a un canal propio en 4 pasos.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-4 gap-4">
          {steps.map((s) => (
            <Card key={s.n} className="p-6">
              <div className="text-brand-600 font-bold">{s.n}</div>
              <div className="mt-2 font-semibold text-ink-900">{s.title}</div>
              <div className="mt-2 text-sm text-ink-500">{s.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* CASOS DE USO */}
      <section className="bg-ink-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="bg-amber-100 text-amber-800 ring-amber-200">Pensado para tu realidad</Badge>
            <h2 className="mt-4 text-4xl font-extrabold text-ink-900">Para negocios de 1, 2 o 3 locales — no solo grandes cadenas.</h2>
          </div>
          <div className="mt-12 grid md:grid-cols-4 gap-4">
            {useCases.map((u, i) => (
              <Card key={i} className="p-6">
                <div className="text-3xl">{u.emoji}</div>
                <div className="mt-3 font-semibold text-ink-900">{u.title}</div>
                <div className="mt-2 text-sm text-ink-500">{u.desc}</div>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/estrategia" className="text-brand-600 font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              Ver modelo adaptado a Uruguay <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* PLANES */}
      <section id="planes" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <Badge className="bg-emerald-100 text-emerald-800 ring-emerald-200">Planes</Badge>
          <h2 className="mt-4 text-4xl font-extrabold text-ink-900">Precios claros, sin comisión por pedido.</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <Card key={p.name} className={`p-6 ${p.featured ? 'ring-2 ring-brand-500 shadow-soft' : ''}`}>
              {p.featured && <Badge className="bg-brand-600 text-white ring-brand-700 mb-2">Más elegido</Badge>}
              <div className="text-sm text-ink-500">{p.target}</div>
              <div className="mt-1 font-extrabold text-2xl text-ink-900">{p.name}</div>
              <div className="mt-4 flex items-baseline gap-1">
                <div className="text-3xl font-extrabold text-ink-900">{p.price}</div>
                <div className="text-sm text-ink-500">{p.period}</div>
              </div>
              <ul className="mt-6 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="text-sm text-ink-700 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full" variant={p.featured ? 'primary' : 'outline'}>{p.cta}</Button>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-500">Setup inicial USD 99 (incluye carga de catálogo y configuración del modelo de local).</p>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Card className="p-10 md:p-14 bg-gradient-to-br from-brand-600 to-amber-500 border-0 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold">Hablemos 20 minutos.</h2>
              <p className="mt-3 text-white/90 max-w-md">Te mostramos cómo se vería tu propia PWA con tu marca, tu catálogo y tu primer programa de puntos.</p>
            </div>
            <div className="md:justify-self-end flex flex-wrap gap-3">
              <Button size="lg" className="bg-white text-ink-900 hover:bg-ink-100" iconLeft={<MessageSquare className="w-4 h-4" />}>Solicitar demo</Button>
              <Button size="lg" variant="ghost" className="text-white hover:bg-white/10">WhatsApp</Button>
            </div>
          </div>
        </Card>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center">
          <Badge className="bg-ink-100 text-ink-700 ring-ink-200">Preguntas frecuentes</Badge>
          <h2 className="mt-4 text-3xl font-extrabold text-ink-900">Todo lo que querés saber</h2>
        </div>
        <div className="mt-8 space-y-2">
          {faqs.map((f, i) => (
            <Card key={i} className="p-0 overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full px-5 py-4 flex items-center justify-between text-left">
                <span className="font-semibold text-ink-900">{f.q}</span>
                <span className="text-ink-500">{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className="px-5 pb-5 text-ink-600 text-sm">{f.a}</div>}
            </Card>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-2 text-xs text-ink-500 justify-center">
          <ShieldCheck className="w-4 h-4" /> Marca, textos y datos del prototipo son demostrativos.
        </div>
      </section>

      <footer className="border-t border-ink-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-ink-500">
          <div>© 2026 Plato — prototipo demostrativo</div>
          <div className="flex gap-4">
            <Link to="/admin" className="hover:text-ink-700">Admin SaaS</Link>
            <Link to="/business" className="hover:text-ink-700">Panel negocio</Link>
            <Link to="/estrategia" className="hover:text-ink-700">Modelo Uruguay</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
