import type {
  Business, Store, StoreModel, Category, Product, Promotion,
  Customer, Order, LoyaltyProgram, Reward, Campaign, Segment,
  Integration, OnboardingTask, Schedule,
} from '../types';

// ---------------- Schedule base ----------------
const standardSchedule: Schedule[] = [
  { day: 'lun', open: '07:30', close: '21:00' },
  { day: 'mar', open: '07:30', close: '21:00' },
  { day: 'mie', open: '07:30', close: '21:00' },
  { day: 'jue', open: '07:30', close: '21:00' },
  { day: 'vie', open: '07:30', close: '23:00' },
  { day: 'sab', open: '08:30', close: '23:00' },
  { day: 'dom', open: '08:30', close: '20:00' },
];

// ---------------- Segmentos ----------------
export const segments: Segment[] = [
  { key: 'nuevo', name: 'Nuevo cliente', description: 'Se registró hace menos de 14 días', color: 'bg-blue-100 text-blue-800' },
  { key: 'frecuente', name: 'Frecuente', description: '3+ compras en últimos 60 días', color: 'bg-emerald-100 text-emerald-800' },
  { key: 'dormido', name: 'Dormido', description: 'Sin compras hace 45+ días', color: 'bg-amber-100 text-amber-800' },
  { key: 'alto-valor', name: 'Alto valor', description: 'Ticket promedio > $900', color: 'bg-purple-100 text-purple-800' },
  { key: 'compro-una-vez', name: 'Compró una vez', description: '1 sola compra, no volvió', color: 'bg-rose-100 text-rose-800' },
];

// ---------------- Categorías ----------------
export const categories: Category[] = [
  { id: 'c1', name: 'Café & Bebidas', emoji: '☕', order: 1 },
  { id: 'c2', name: 'Panadería', emoji: '🥐', order: 2 },
  { id: 'c3', name: 'Sándwiches', emoji: '🥪', order: 3 },
  { id: 'c4', name: 'Postres', emoji: '🍰', order: 4 },
];

// ---------------- Productos ----------------
export const products: Product[] = [
  { id: 'p1', categoryId: 'c1', name: 'Café con leche', description: 'Espresso doble con leche cremosa', price: 220, imageEmoji: '☕', available: true, featured: true, tags: ['más vendido'] },
  { id: 'p2', categoryId: 'c1', name: 'Submarino', description: 'Leche caliente con barra de chocolate amargo', price: 290, imageEmoji: '🍫', available: true, featured: false, tags: ['clásico'] },
  { id: 'p3', categoryId: 'c2', name: 'Medialunas (x3)', description: 'Recién horneadas', price: 180, imageEmoji: '🥐', available: true, featured: true, tags: ['mañana'] },
  { id: 'p4', categoryId: 'c2', name: 'Pan dulce artesanal', description: 'Con frutas y nueces', price: 650, imageEmoji: '🍞', available: true, featured: false, tags: [] },
  { id: 'p5', categoryId: 'c3', name: 'Tostado mixto', description: 'Jamón cocido y queso en pan de campo', price: 320, imageEmoji: '🥪', available: true, featured: true, tags: ['rápido'] },
  { id: 'p6', categoryId: 'c3', name: 'Sándwich vegetal', description: 'Palta, tomate, rúcula, queso crema', price: 380, imageEmoji: '🥗', available: true, featured: false, tags: ['veggie'] },
  { id: 'p7', categoryId: 'c4', name: 'Chajá individual', description: 'Postre uruguayo clásico', price: 260, imageEmoji: '🍰', available: true, featured: true, tags: ['uruguayo'] },
  { id: 'p8', categoryId: 'c4', name: 'Brownie con dulce de leche', description: 'Casero, con nueces', price: 230, imageEmoji: '🍫', available: false, featured: false, tags: [] },
];

// ---------------- Promociones ----------------
export const promotions: Promotion[] = [
  { id: 'pr1', name: 'Combo Mañana', type: 'combo', value: 350, description: 'Café con leche + 3 medialunas', productIds: ['p1', 'p3'], active: true },
  { id: 'pr2', name: '2x1 Tostados (lun-mie 15-18hs)', type: '2x1', value: 0, description: 'Llevá 2 tostados y pagás 1', productIds: ['p5'], active: true },
  { id: 'pr3', name: '15% off primer pedido', type: '%', value: 15, description: 'Para nuevos clientes registrados', productIds: [], active: true },
];

// ---------------- Loyalty ----------------
export const loyaltyProgram: LoyaltyProgram = {
  id: 'l1',
  pointsPerCurrencyUnit: 50, // 1 punto por cada $50
  currencyPerPoint: 1,
  welcomeBonus: 50,
  active: true,
};

export const rewards: Reward[] = [
  { id: 'r1', name: 'Café gratis', description: 'Un café con leche', pointsCost: 80, emoji: '☕', active: true },
  { id: 'r2', name: '3 medialunas', description: 'Recién horneadas', pointsCost: 60, emoji: '🥐', active: true },
  { id: 'r3', name: '20% off próximo pedido', description: 'Sobre el subtotal', pointsCost: 120, emoji: '🎟️', active: true },
  { id: 'r4', name: 'Chajá individual', description: 'Postre de regalo', pointsCost: 100, emoji: '🍰', active: true },
  { id: 'r5', name: 'Envío gratis', description: 'En tu próximo delivery', pointsCost: 70, emoji: '🛵', active: true },
];

// ---------------- Auto messages ----------------
const autoMessages = [
  { trigger: 'order_received' as const, channel: 'whatsapp' as const, template: '¡Gracias {nombre}! Recibimos tu pedido {codigo}. Te avisamos cuando esté listo ✨' },
  { trigger: 'order_ready' as const, channel: 'whatsapp' as const, template: 'Tu pedido {codigo} ya está listo para retirar 🥐' },
  { trigger: 'inactive_30d' as const, channel: 'whatsapp' as const, template: 'Te extrañamos {nombre}, te dejamos 50 puntos para tu próximo café ☕' },
  { trigger: 'birthday' as const, channel: 'whatsapp' as const, template: '¡Feliz cumple {nombre}! Pasá a buscar tu chajá de regalo 🎂' },
];

// ---------------- Store Model base ----------------
export const baseStoreModel: StoreModel = {
  id: 'sm-base',
  name: 'Modelo Café Central',
  description: 'Plantilla base para cafetería con servicio en local, retiro y delivery propio en zona centro.',
  schedule: standardSchedule,
  pickupEnabled: true,
  deliveryEnabled: true,
  deliveryZones: [
    { name: 'Centro', fee: 80, minOrder: 300, etaMinutes: 25 },
    { name: 'Cordón', fee: 120, minOrder: 400, etaMinutes: 35 },
    { name: 'Pocitos', fee: 180, minOrder: 500, etaMinutes: 45 },
  ],
  paymentMethods: ['efectivo', 'mercadopago', 'tarjeta-local'],
  categoryIds: categories.map(c => c.id),
  productIds: products.map(p => p.id),
  promotionIds: promotions.map(p => p.id),
  loyaltyProgramId: loyaltyProgram.id,
  segmentIds: segments.map(s => s.key),
  autoMessages,
  suggestedCampaigns: [
    'Reactivar clientes con 45+ días sin compras',
    'Combo Mañana a frecuentes los viernes',
    'Recuperar clientes que compraron 1 sola vez',
  ],
  integrations: ['whatsapp', 'mercadopago'],
  branding: {
    primaryColor: '#ea580c',
    accentColor: '#0f172a',
    logoEmoji: '☕',
    heroTagline: 'Tu café de siempre, ahora a un click',
  },
  operationalRules: {
    minOrderAmount: 250,
    maxPreparationMinutes: 20,
    acceptsScheduledOrders: true,
    autoAcceptOrders: false,
  },
};

// ---------------- Business + Stores ----------------
export const business: Business = {
  id: 'b1',
  name: 'Café Central MVD',
  slug: 'cafe-central-mvd',
  category: 'cafeteria',
  city: 'Montevideo',
  country: 'Uruguay',
  logoEmoji: '☕',
  brandColor: '#ea580c',
  stores: ['s1', 's2'],
  onboardingProgress: 75,
  plan: 'Crece',
  createdAt: '2026-03-10',
};

export const stores: Store[] = [
  {
    id: 's1', businessId: 'b1', modelId: 'sm-base',
    name: 'Café Central — Centro',
    address: 'Av. 18 de Julio 1234, Montevideo',
    phone: '+598 2900 1234',
    active: true,
  },
  {
    id: 's2', businessId: 'b1', modelId: 'sm-base',
    name: 'Café Central — Pocitos',
    address: 'Av. Brasil 2890, Montevideo',
    phone: '+598 2710 5678',
    active: true,
    overrides: {
      operationalRules: { ...baseStoreModel.operationalRules, minOrderAmount: 300 },
    },
  },
];

// ---------------- Clientes ----------------
export const customers: Customer[] = [
  { id: 'cu1', name: 'María González', phone: '099 123 456', email: 'maria@mail.com', registeredAt: '2026-05-20', lastOrderAt: '2026-05-26', totalOrders: 2, totalSpent: 980, avgTicket: 490, points: 70, segment: 'nuevo' },
  { id: 'cu2', name: 'Javier Pereira', phone: '098 222 333', registeredAt: '2026-01-15', lastOrderAt: '2026-05-25', totalOrders: 18, totalSpent: 11250, avgTicket: 625, points: 220, segment: 'frecuente' },
  { id: 'cu3', name: 'Lucía Fernández', phone: '094 555 999', email: 'lu.fer@mail.com', registeredAt: '2025-11-02', lastOrderAt: '2026-03-12', totalOrders: 4, totalSpent: 3200, avgTicket: 800, points: 60, segment: 'dormido' },
  { id: 'cu4', name: 'Andrés Castro', phone: '091 777 111', registeredAt: '2025-09-10', lastOrderAt: '2026-05-27', totalOrders: 32, totalSpent: 38400, avgTicket: 1200, points: 480, segment: 'alto-valor' },
  { id: 'cu5', name: 'Sofía Rodríguez', phone: '098 444 222', registeredAt: '2026-02-28', lastOrderAt: '2026-03-01', totalOrders: 1, totalSpent: 420, avgTicket: 420, points: 8, segment: 'compro-una-vez' },
  { id: 'cu6', name: 'Diego Martínez', phone: '099 888 666', email: 'diegom@mail.com', registeredAt: '2026-05-15', lastOrderAt: '2026-05-26', totalOrders: 3, totalSpent: 1450, avgTicket: 483, points: 90, segment: 'nuevo' },
  { id: 'cu7', name: 'Camila Silva', phone: '093 111 222', registeredAt: '2025-08-22', lastOrderAt: '2026-05-27', totalOrders: 27, totalSpent: 16200, avgTicket: 600, points: 320, segment: 'frecuente' },
  { id: 'cu8', name: 'Mateo Suárez', phone: '094 333 444', registeredAt: '2025-10-05', lastOrderAt: '2026-02-08', totalOrders: 6, totalSpent: 2700, avgTicket: 450, points: 50, segment: 'dormido' },
  { id: 'cu9', name: 'Valentina Ríos', phone: '098 555 666', registeredAt: '2025-12-12', lastOrderAt: '2026-05-26', totalOrders: 22, totalSpent: 26400, avgTicket: 1200, points: 410, segment: 'alto-valor' },
  { id: 'cu10', name: 'Pablo Méndez', phone: '091 222 333', registeredAt: '2026-04-30', lastOrderAt: '2026-04-30', totalOrders: 1, totalSpent: 380, avgTicket: 380, points: 8, segment: 'compro-una-vez' },
  { id: 'cu11', name: 'Florencia Acosta', phone: '094 666 777', registeredAt: '2025-07-18', lastOrderAt: '2026-05-25', totalOrders: 41, totalSpent: 24600, avgTicket: 600, points: 510, segment: 'frecuente' },
  { id: 'cu12', name: 'Nicolás Vega', phone: '099 999 000', registeredAt: '2026-05-24', lastOrderAt: '2026-05-25', totalOrders: 1, totalSpent: 290, avgTicket: 290, points: 5, segment: 'nuevo' },
];

// ---------------- Pedidos ----------------
export const orders: Order[] = [
  { id: 'o1', code: 'CC-2041', storeId: 's1', customerId: 'cu2', status: 'nuevo', channel: 'pwa', deliveryMethod: 'delivery-propio', paymentMethod: 'mercadopago', items: [{ productId: 'p1', name: 'Café con leche', qty: 2, unitPrice: 220 }, { productId: 'p3', name: 'Medialunas (x3)', qty: 1, unitPrice: 180 }], subtotal: 620, deliveryFee: 80, total: 700, notes: 'Dejar en portería', createdAt: '2026-05-28T08:42:00' },
  { id: 'o2', code: 'CC-2042', storeId: 's1', customerId: 'cu4', status: 'preparando', channel: 'pwa', deliveryMethod: 'retiro', paymentMethod: 'mercadopago', items: [{ productId: 'p5', name: 'Tostado mixto', qty: 2, unitPrice: 320 }, { productId: 'p1', name: 'Café con leche', qty: 2, unitPrice: 220 }], subtotal: 1080, deliveryFee: 0, total: 1080, createdAt: '2026-05-28T09:05:00' },
  { id: 'o3', code: 'CC-2043', storeId: 's1', customerId: 'cu7', status: 'listo', channel: 'pwa', deliveryMethod: 'retiro', paymentMethod: 'efectivo', items: [{ productId: 'p2', name: 'Submarino', qty: 1, unitPrice: 290 }, { productId: 'p7', name: 'Chajá individual', qty: 1, unitPrice: 260 }], subtotal: 550, deliveryFee: 0, total: 550, createdAt: '2026-05-28T09:18:00' },
  { id: 'o4', code: 'CC-2044', storeId: 's2', customerId: 'cu9', status: 'enviado', channel: 'pwa', deliveryMethod: 'delivery-propio', paymentMethod: 'mercadopago', items: [{ productId: 'p6', name: 'Sándwich vegetal', qty: 2, unitPrice: 380 }, { productId: 'p1', name: 'Café con leche', qty: 2, unitPrice: 220 }, { productId: 'p7', name: 'Chajá individual', qty: 1, unitPrice: 260 }], subtotal: 1460, deliveryFee: 180, total: 1640, createdAt: '2026-05-28T09:30:00' },
  { id: 'o5', code: 'CC-2045', storeId: 's1', customerId: 'cu11', status: 'entregado', channel: 'pwa', deliveryMethod: 'delivery-propio', paymentMethod: 'mercadopago', items: [{ productId: 'p4', name: 'Pan dulce artesanal', qty: 1, unitPrice: 650 }], subtotal: 650, deliveryFee: 80, total: 730, createdAt: '2026-05-28T07:55:00' },
  { id: 'o6', code: 'CC-2046', storeId: 's1', customerId: 'cu1', status: 'entregado', channel: 'whatsapp', deliveryMethod: 'whatsapp', paymentMethod: 'transferencia', items: [{ productId: 'p5', name: 'Tostado mixto', qty: 1, unitPrice: 320 }, { productId: 'p1', name: 'Café con leche', qty: 1, unitPrice: 220 }], subtotal: 540, deliveryFee: 0, total: 540, notes: 'Coordinado por WhatsApp', createdAt: '2026-05-27T16:20:00' },
  { id: 'o7', code: 'CC-2047', storeId: 's2', customerId: 'cu6', status: 'entregado', channel: 'pwa', deliveryMethod: 'retiro', paymentMethod: 'mercadopago', items: [{ productId: 'p2', name: 'Submarino', qty: 1, unitPrice: 290 }], subtotal: 290, deliveryFee: 0, total: 290, createdAt: '2026-05-27T17:10:00' },
  { id: 'o8', code: 'CC-2048', storeId: 's1', customerId: 'cu12', status: 'cancelado', channel: 'pwa', deliveryMethod: 'delivery-propio', paymentMethod: 'mercadopago', items: [{ productId: 'p3', name: 'Medialunas (x3)', qty: 1, unitPrice: 180 }], subtotal: 180, deliveryFee: 80, total: 260, notes: 'Cliente canceló por demora', createdAt: '2026-05-27T18:00:00' },
  { id: 'o9', code: 'CC-2049', storeId: 's2', customerId: 'cu4', status: 'entregado', channel: 'pwa', deliveryMethod: 'delivery-propio', paymentMethod: 'mercadopago', items: [{ productId: 'p5', name: 'Tostado mixto', qty: 3, unitPrice: 320 }, { productId: 'p1', name: 'Café con leche', qty: 3, unitPrice: 220 }], subtotal: 1620, deliveryFee: 180, total: 1800, createdAt: '2026-05-26T12:40:00' },
  { id: 'o10', code: 'CC-2050', storeId: 's1', customerId: 'cu2', status: 'aceptado', channel: 'pwa', deliveryMethod: 'delivery-propio', paymentMethod: 'mercadopago', items: [{ productId: 'p1', name: 'Café con leche', qty: 1, unitPrice: 220 }, { productId: 'p7', name: 'Chajá individual', qty: 1, unitPrice: 260 }], subtotal: 480, deliveryFee: 80, total: 560, createdAt: '2026-05-28T09:40:00' },
];

// ---------------- Campañas ----------------
export const campaigns: Campaign[] = [
  { id: 'cm1', name: 'Te extrañamos — dormidos abril', objective: 'recuperar-dormidos', segmentKey: 'dormido', channel: 'whatsapp', message: 'Hace rato que no te vemos. Te dejamos 50 puntos para tu próximo café ☕ Válido por 7 días.', status: 'enviada', metrics: { sent: 142, opened: 118, clicked: 41, orders: 18, revenue: 9650 }, createdAt: '2026-05-12' },
  { id: 'cm2', name: 'Combo Mañana viernes', objective: 'frecuencia', segmentKey: 'frecuente', channel: 'whatsapp', message: '¡Hola! Hoy tenés el Combo Mañana con 10% extra. Pedí desde la app 🥐', status: 'enviada', metrics: { sent: 89, opened: 76, clicked: 38, orders: 22, revenue: 12100 }, createdAt: '2026-05-17' },
  { id: 'cm3', name: 'Sumá puntos con pan dulce', objective: 'producto', segmentKey: 'alto-valor', channel: 'email', message: 'Pan dulce artesanal con doble puntos esta semana 🍞', status: 'programada', metrics: { sent: 0, opened: 0, clicked: 0, orders: 0, revenue: 0 }, createdAt: '2026-05-26' },
  { id: 'cm4', name: 'Volvé y llevate un chajá', objective: 'reactivar', segmentKey: 'compro-una-vez', channel: 'whatsapp', message: 'Gracias por probarnos. Volvé esta semana y el chajá va de regalo 🍰', status: 'borrador', metrics: { sent: 0, opened: 0, clicked: 0, orders: 0, revenue: 0 }, createdAt: '2026-05-27' },
];

// ---------------- Integraciones disponibles ----------------
export const integrations: Integration[] = [
  { key: 'whatsapp', name: 'WhatsApp Business', description: 'Notificaciones de pedido y campañas', connected: true, emoji: '💬' },
  { key: 'mercadopago', name: 'Mercado Pago', description: 'Cobros online en checkout', connected: true, emoji: '💳' },
  { key: 'pos', name: 'POS Local', description: 'Sincroniza ventas y stock', connected: false, emoji: '🧾' },
  { key: 'delivery-externo', name: 'Delivery tercerizado', description: 'Pedidos vía cadetes externos', connected: false, emoji: '🛵' },
  { key: 'email', name: 'Email marketing', description: 'Campañas por email', connected: false, emoji: '📧' },
];

// ---------------- Onboarding ----------------
export const onboardingTasks: OnboardingTask[] = [
  { id: 't1', step: 1, title: 'Datos del negocio', description: 'Razón social, rubro y contacto', done: true },
  { id: 't2', step: 2, title: 'Alta de locales', description: 'Crear sucursales y horarios', done: true },
  { id: 't3', step: 3, title: 'Modelo de local configurado', description: 'Catálogo, zonas, pagos, branding', done: true },
  { id: 't4', step: 4, title: 'Integraciones', description: 'WhatsApp + Mercado Pago conectados', done: true },
  { id: 't5', step: 5, title: 'Programa de puntos', description: 'Reglas y recompensas activas', done: true },
  { id: 't6', step: 6, title: 'Campaña de bienvenida', description: 'Lanzar primer mensaje a base de clientes', done: false },
  { id: 't7', step: 7, title: 'PWA publicada', description: 'Link compartible con clientes', done: true },
  { id: 't8', step: 8, title: 'Capacitación equipo de local', description: 'Sesión de uso de panel', done: false },
];

// ---------------- Marcas (para SaaS admin lista) ----------------
export const allBusinesses: Business[] = [
  business,
  { id: 'b2', name: 'Panadería La Espiga', slug: 'la-espiga', category: 'bakery', city: 'Canelones', country: 'Uruguay', logoEmoji: '🥖', brandColor: '#a16207', stores: [], onboardingProgress: 40, plan: 'Esencial', createdAt: '2026-04-22' },
  { id: 'b3', name: 'Rotisería Don Pepe', slug: 'don-pepe', category: 'rotiseria', city: 'Maldonado', country: 'Uruguay', logoEmoji: '🍗', brandColor: '#dc2626', stores: [], onboardingProgress: 90, plan: 'Crece', createdAt: '2026-02-08' },
  { id: 'b4', name: 'Bar Esquina Norte', slug: 'esquina-norte', category: 'bar', city: 'Montevideo', country: 'Uruguay', logoEmoji: '🍺', brandColor: '#0369a1', stores: [], onboardingProgress: 20, plan: 'Esencial', createdAt: '2026-05-21' },
];
