import { Card, Badge, Section } from '../components/ui';
import { CheckCircle2, AlertTriangle, MapPin, Wallet, MessageSquare, CreditCard, Truck, Building2, Target } from 'lucide-react';

const whyNot = [
  { t: 'Pocas cadenas con 20+ locales', d: 'El TAM real en Uruguay para "enterprise" es chico. Apuntar solo ahí limita el negocio a 20-30 cuentas potenciales.' },
  { t: 'Ciclos de venta largos', d: 'Estructuras corporativas, comités, integraciones POS complejas. Time-to-revenue alto.' },
  { t: 'Negocios chicos ya quieren digital', d: 'Cafeterías, panaderías y rotiserías vienen del WhatsApp manual. Pagan por solución que les ahorre trabajo.' },
  { t: 'Mejor margen unitario', d: 'Más cuentas chicas con mensualidad media baja generan ARR más estable que pocas cuentas grandes con riesgo de churn.' },
];

const howToSell = [
  { n: '1', t: 'Identificá negocios con WhatsApp activo', d: 'Si ya operan delivery por WhatsApp, son el target perfecto. Tienen el dolor real.' },
  { n: '2', t: 'Vendé un dolor concreto', d: 'No "plataforma de fidelización". Vendé: "evitá responder pedidos manualmente y dejá de pagar 25% al marketplace".' },
  { n: '3', t: 'Onboarding hecho con el cliente', d: 'Setup inicial con USD 99 incluye carga del catálogo. Que no sea su tarea — es nuestra.' },
  { n: '4', t: 'Casos de éxito locales', d: 'Mostrar 2-3 negocios uruguayos con números (ahorro en comisiones, % de venta por canal propio) convierte mucho más que features.' },
  { n: '5', t: 'Prueba 30 días', d: 'Mensualidad baja + setup única = riesgo bajo para el dueño. Si funciona, se queda.' },
];

const mvpFeatures = [
  { ok: true, t: 'PWA con catálogo y carrito', why: 'Es el corazón del producto. Sin esto no hay venta.' },
  { ok: true, t: 'Checkout con Mercado Pago + efectivo', why: 'MP es estándar en Uruguay. Efectivo es para pedidos retiro.' },
  { ok: true, t: 'Panel de pedidos con estados', why: 'Reemplaza el caos del WhatsApp grupal.' },
  { ok: true, t: 'WhatsApp Business (manual o API básica)', why: 'Notificaciones de pedido. Es donde están los clientes.' },
  { ok: true, t: 'CRM básico con segmentación automática', why: 'El dato del cliente es lo que diferencia del marketplace.' },
  { ok: true, t: 'Programa de puntos simple', why: 'No es nice-to-have: aumenta recompra desde el día 1.' },
  { ok: true, t: 'Modelo de Local clonable', why: 'Para que el costo de onboardear el cliente N+1 sea bajo.' },
];

const phase2 = [
  'Integraciones con POS locales (Maxirest, Fudo, Geant)',
  'Delivery tercerizado (Uber Direct, PedidosYa Envíos)',
  'Reservas y mesas',
  'Tienda física con QR de mesa',
  'Multimoneda y multipaís',
  'Campañas con segmentación predictiva',
  'App nativa (iOS/Android wrapper de la PWA)',
];

const pricing = [
  { item: 'Setup inicial', value: 'USD 99 — único', desc: 'Carga de catálogo, configuración del modelo, primera capacitación.' },
  { item: 'Mensualidad Esencial', value: 'USD 49', desc: '1 local, hasta 500 clientes activos.' },
  { item: 'Mensualidad Crece', value: 'USD 89', desc: 'Hasta 3 locales, programa de puntos y campañas IA.' },
  { item: 'Mensualidad Multi-local', value: 'USD 149 + USD 25/local extra', desc: '4+ locales, comparativos cruzados, soporte prioritario.' },
  { item: 'Comisión opcional', value: '1.5% por pedido', desc: 'Para negocios que prefieren no pagar fijo. Tope mensual de USD 100.' },
];

const integrationsLocal = [
  { icon: <MessageSquare className="w-5 h-5" />, name: 'WhatsApp Business', why: 'Canal #1 de relación. Empezar con API oficial vía proveedor regional (Wati, 360dialog).' },
  { icon: <Wallet className="w-5 h-5" />, name: 'Mercado Pago Uruguay', why: 'Pagos online estándar. Permite link de pago y checkout pro.' },
  { icon: <CreditCard className="w-5 h-5" />, name: 'POS locales', why: 'Maxirest, Fudo, Geant. Integración fase 2 — al principio export manual.' },
  { icon: <Truck className="w-5 h-5" />, name: 'Delivery', why: 'Cadetería propia primero. Convenios con PedidosYa Envíos / Uber Direct fase 2.' },
];

const propositions = [
  { t: 'Recuperá clientes que compraron una vez', d: 'Casi 1 de cada 3 clientes nunca vuelve. La PWA + remarketing por WhatsApp resuelve eso.' },
  { t: 'Vendé por tu propio canal', d: 'Cada pedido por marketplace deja 20-30% en la mesa. El canal propio paga sus mensualidades en 1 semana.' },
  { t: 'Construí base de datos de tus clientes', d: 'Hoy no la tenés porque PedidosYa no te la da. Empezás de cero pero pasa a ser tu activo más valioso.' },
  { t: 'Fidelizá sin complejidad', d: 'Puntos por monto, recompensas claras. Sin tarjetas plásticas ni reglas complicadas.' },
  { t: 'Reducí dependencia de marketplaces', d: 'No se trata de salirte. Se trata de que el marketplace deje de ser tu único canal.' },
];

const assumptions = [
  'Comisión promedio de marketplaces en Uruguay: 20-30% por pedido (PedidosYa, Rappi).',
  'Penetración de Mercado Pago como wallet/checkout: alta (>60% según datos públicos del sector).',
  'WhatsApp Business es el canal default de operación digital en negocios pequeños del rubro.',
  '"Cadena chica" = 1 a 5 locales, dueño único, operación familiar o equipo de hasta 30 personas.',
  'Pricing en USD asume tipo de cambio promedio. En facturación final se cobra en UYU equivalente.',
  'El "Modelo de Local" se vende como diferencial técnico: reduce costo de configuración de cada nuevo local de ~6hs a <1h.',
  'Setup inicial subsidiado a USD 99 cumple función de pricing-anchor: lo importante es la mensualidad recurrente.',
];

export function StrategyPage() {
  return (
    <div className="bg-white">
      <div className="bg-gradient-to-br from-ink-900 to-ink-800 text-white">
        <div className="max-w-5xl mx-auto px-6 py-20">
          <Badge className="bg-brand-500/20 text-brand-300 ring-brand-500/30"><Target className="w-3 h-3" /> Adaptación al mercado uruguayo</Badge>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
            Modelo para Uruguay y mercados con pocas cadenas grandes.
          </h1>
          <p className="mt-4 text-ink-300 text-lg max-w-3xl">
            Esta sección explica cómo Plato compite en un mercado donde el negocio promedio es de 1 a 3 locales,
            la operación digital pasa por WhatsApp, y vender al "enterprise gastronómico" es un atajo a un techo bajo.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-14">
        <Section title="1. Por qué no apuntar solo a grandes cadenas" subtitle="Existen, pero son pocas — y caras de cerrar.">
          <div className="grid md:grid-cols-2 gap-4">
            {whyNot.map((w, i) => (
              <Card key={i} className="p-5">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <div className="mt-3 font-semibold text-ink-900">{w.t}</div>
                <div className="text-sm text-ink-500 mt-1">{w.d}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="2. Cómo venderle a un negocio de 1-3 locales" subtitle="Funnel de venta concreto.">
          <div className="space-y-3">
            {howToSell.map((h) => (
              <Card key={h.n} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center shrink-0">{h.n}</div>
                <div>
                  <div className="font-semibold text-ink-900">{h.t}</div>
                  <div className="text-sm text-ink-500 mt-1">{h.d}</div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="3. Funcionalidades del MVP" subtitle="Lo mínimo para que valga la pena pagar la mensualidad desde el día 1.">
          <Card className="p-5 space-y-3">
            {mvpFeatures.map((f) => (
              <div key={f.t} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-ink-900">{f.t}</div>
                  <div className="text-xs text-ink-500">{f.why}</div>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        <Section title="4. Lo que queda para Fase 2" subtitle="No lo metas en el MVP — alarga el time-to-market.">
          <Card className="p-5">
            <ul className="grid md:grid-cols-2 gap-2">
              {phase2.map((p, i) => (
                <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                  <span className="w-1 h-1 bg-ink-400 rounded-full mt-2 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </Card>
        </Section>

        <Section title="5. Cómo cobrar" subtitle="Setup + mensualidad + comisión opcional.">
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-ink-50 text-xs uppercase tracking-wider text-ink-500">
                <tr>
                  <th className="text-left p-4">Concepto</th>
                  <th className="text-left p-4">Precio</th>
                  <th className="text-left p-4">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {pricing.map((p) => (
                  <tr key={p.item}>
                    <td className="p-4 font-semibold text-ink-900">{p.item}</td>
                    <td className="p-4 text-brand-700 font-bold">{p.value}</td>
                    <td className="p-4 text-sm text-ink-500">{p.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Section>

        <Section title="6. Integraciones locales prioritarias" subtitle="Lo que tiene que andar bien en Uruguay desde el día 1.">
          <div className="grid md:grid-cols-2 gap-4">
            {integrationsLocal.map((i) => (
              <Card key={i.name} className="p-5">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">{i.icon}</div>
                <div className="mt-3 font-semibold text-ink-900">{i.name}</div>
                <div className="text-sm text-ink-500 mt-1">{i.why}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="7. Propuesta de valor que mejor convierte" subtitle="Cinco ángulos según perfil del cliente.">
          <div className="grid md:grid-cols-2 gap-4">
            {propositions.map((p) => (
              <Card key={p.t} className="p-5">
                <div className="font-semibold text-ink-900">{p.t}</div>
                <div className="text-sm text-ink-500 mt-1">{p.d}</div>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Mercado objetivo concreto" subtitle="Perfil de ICP (Ideal Customer Profile) para los primeros 50 clientes.">
          <Card className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-3">Características</div>
              <ul className="space-y-2 text-sm text-ink-700">
                <li className="flex gap-2"><Building2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> Cafeterías, panaderías, rotiserías, restaurantes de barrio con 1-3 locales</li>
                <li className="flex gap-2"><MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> Montevideo metropolitano + Maldonado y Canelones en fase 2</li>
                <li className="flex gap-2"><MessageSquare className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> Ya operan delivery o pickup vía WhatsApp</li>
                <li className="flex gap-2"><Wallet className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> Facturan $UYU 300K-1M/mes</li>
                <li className="flex gap-2"><Target className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" /> Dueño operativo, decide en una reunión</li>
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold mb-3">Objetivos primeros 12 meses</div>
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-ink-50">
                  <div className="text-xs text-ink-500">50 clientes activos</div>
                  <div className="font-bold text-ink-900 mt-1">USD ~4.500 MRR</div>
                </div>
                <div className="p-3 rounded-xl bg-ink-50">
                  <div className="text-xs text-ink-500">Churn anual objetivo</div>
                  <div className="font-bold text-ink-900 mt-1">&lt; 12%</div>
                </div>
                <div className="p-3 rounded-xl bg-ink-50">
                  <div className="text-xs text-ink-500">CAC payback</div>
                  <div className="font-bold text-ink-900 mt-1">&lt; 4 meses</div>
                </div>
              </div>
            </div>
          </Card>
        </Section>

        <Section title="Supuestos del prototipo" subtitle="Datos asumidos sin información de mercado vinculante. Documentados explícitamente.">
          <Card className="p-5">
            <ul className="space-y-2">
              {assumptions.map((a, i) => (
                <li key={i} className="text-sm text-ink-700 flex items-start gap-2">
                  <span className="text-brand-600 font-bold">{i + 1}.</span> {a}
                </li>
              ))}
            </ul>
          </Card>
        </Section>
      </div>
    </div>
  );
}
