export type ID = string;

export interface Business {
  id: ID;
  name: string;
  slug: string;
  category: 'cafeteria' | 'restaurant' | 'bakery' | 'rotiseria' | 'bar';
  city: string;
  country: string;
  logoEmoji: string;
  brandColor: string;
  stores: ID[];
  onboardingProgress: number; // 0-100
  plan: 'Esencial' | 'Crece' | 'Multi-local';
  createdAt: string;
}

export interface Schedule {
  day: 'lun' | 'mar' | 'mie' | 'jue' | 'vie' | 'sab' | 'dom';
  open: string;
  close: string;
}

export interface DeliveryZone {
  name: string;
  fee: number;
  minOrder: number;
  etaMinutes: number;
}

export interface StoreModel {
  id: ID;
  name: string;
  description: string;
  schedule: Schedule[];
  pickupEnabled: boolean;
  deliveryEnabled: boolean;
  deliveryZones: DeliveryZone[];
  paymentMethods: ('efectivo' | 'mercadopago' | 'tarjeta-local' | 'transferencia')[];
  categoryIds: ID[];
  productIds: ID[];
  promotionIds: ID[];
  loyaltyProgramId: ID;
  segmentIds: ID[];
  autoMessages: AutoMessage[];
  suggestedCampaigns: string[];
  integrations: ('whatsapp' | 'mercadopago' | 'pos' | 'delivery-externo' | 'email')[];
  branding: {
    primaryColor: string;
    accentColor: string;
    logoEmoji: string;
    heroTagline: string;
  };
  operationalRules: {
    minOrderAmount: number;
    maxPreparationMinutes: number;
    acceptsScheduledOrders: boolean;
    autoAcceptOrders: boolean;
  };
}

export interface AutoMessage {
  trigger: 'order_received' | 'order_ready' | 'order_delivered' | 'birthday' | 'inactive_30d';
  channel: 'whatsapp' | 'email' | 'push';
  template: string;
}

export interface Store {
  id: ID;
  businessId: ID;
  modelId: ID;
  name: string;
  address: string;
  phone: string;
  active: boolean;
  // permite overrides locales sobre el modelo
  overrides?: Partial<StoreModel>;
}

export interface Category {
  id: ID;
  name: string;
  emoji: string;
  order: number;
}

export interface Product {
  id: ID;
  categoryId: ID;
  name: string;
  description: string;
  price: number;
  imageEmoji: string;
  available: boolean;
  featured: boolean;
  tags: string[];
}

export interface Promotion {
  id: ID;
  name: string;
  type: '2x1' | 'combo' | '%' | '$';
  value: number;
  description: string;
  productIds: ID[];
  active: boolean;
}

export interface Customer {
  id: ID;
  name: string;
  phone: string;
  email?: string;
  registeredAt: string;
  lastOrderAt?: string;
  totalOrders: number;
  totalSpent: number;
  avgTicket: number;
  points: number;
  segment: SegmentKey;
  notes?: string;
}

export type SegmentKey =
  | 'nuevo'
  | 'frecuente'
  | 'dormido'
  | 'alto-valor'
  | 'compro-una-vez';

export interface Segment {
  key: SegmentKey;
  name: string;
  description: string;
  color: string;
}

export type OrderStatus =
  | 'nuevo'
  | 'aceptado'
  | 'preparando'
  | 'listo'
  | 'enviado'
  | 'entregado'
  | 'cancelado';

export type OrderChannel = 'pwa' | 'whatsapp' | 'marketplace';
export type DeliveryMethod = 'retiro' | 'delivery-propio' | 'delivery-externo' | 'whatsapp';
export type PaymentMethod = 'efectivo' | 'mercadopago' | 'tarjeta-local' | 'transferencia';

export interface OrderItem {
  productId: ID;
  name: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: ID;
  code: string;
  storeId: ID;
  customerId: ID;
  status: OrderStatus;
  channel: OrderChannel;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  createdAt: string;
}

export interface LoyaltyProgram {
  id: ID;
  pointsPerCurrencyUnit: number; // ej 1 punto por cada $50 gastado
  currencyPerPoint: number; // valor en pesos por punto al canjear
  welcomeBonus: number;
  active: boolean;
}

export interface Reward {
  id: ID;
  name: string;
  description: string;
  pointsCost: number;
  emoji: string;
  active: boolean;
}

export type CampaignObjective =
  | 'reactivar'
  | 'frecuencia'
  | 'producto'
  | 'recuperar-dormidos'
  | 'ticket';

export type CampaignChannel = 'whatsapp' | 'email' | 'push';

export interface Campaign {
  id: ID;
  name: string;
  objective: CampaignObjective;
  segmentKey: SegmentKey;
  channel: CampaignChannel;
  message: string;
  status: 'borrador' | 'programada' | 'enviada';
  metrics: {
    sent: number;
    opened: number;
    clicked: number;
    orders: number;
    revenue: number;
  };
  createdAt: string;
}

export interface Integration {
  key: 'whatsapp' | 'mercadopago' | 'pos' | 'delivery-externo' | 'email';
  name: string;
  description: string;
  connected: boolean;
  emoji: string;
}

export interface OnboardingTask {
  id: ID;
  title: string;
  description: string;
  done: boolean;
  step: number;
}
