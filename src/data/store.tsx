import { createContext, useContext, useState, type ReactNode } from 'react';
import {
  baseStoreModel, business, stores, categories as initCats, products as initProds,
  promotions as initProms, customers as initCusts, orders as initOrders,
  loyaltyProgram as initLoyalty, rewards as initRewards, campaigns as initCamps,
  integrations as initInts, onboardingTasks as initOnb, allBusinesses as initAll,
} from './mock';
import type {
  StoreModel, Store, Category, Product, Promotion, Customer, Order,
  LoyaltyProgram, Reward, Campaign, Integration, OnboardingTask, Business, OrderStatus,
} from '../types';

interface AppState {
  business: Business;
  allBusinesses: Business[];
  stores: Store[];
  storeModel: StoreModel;
  storeModels: StoreModel[];
  categories: Category[];
  products: Product[];
  promotions: Promotion[];
  customers: Customer[];
  orders: Order[];
  loyaltyProgram: LoyaltyProgram;
  rewards: Reward[];
  campaigns: Campaign[];
  integrations: Integration[];
  onboardingTasks: OnboardingTask[];

  cart: { productId: string; qty: number }[];
  cartCustomerId?: string;

  // mutations
  updateStoreModel: (m: StoreModel) => void;
  cloneStoreModel: (name: string) => void;
  updateProduct: (p: Product) => void;
  toggleProductAvailable: (id: string) => void;
  updateOrderStatus: (id: string, s: OrderStatus) => void;
  addOrder: (o: Order) => void;
  addCustomer: (c: Customer) => void;
  upsertCampaign: (c: Campaign) => void;
  toggleIntegration: (key: Integration['key']) => void;
  toggleOnboarding: (id: string) => void;
  updateLoyalty: (l: LoyaltyProgram) => void;
  updateReward: (r: Reward) => void;

  addToCart: (productId: string, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  setCartCustomer: (id?: string) => void;
}

const AppCtx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [biz] = useState<Business>(business);
  const [allBiz] = useState<Business[]>(initAll);
  const [storesL] = useState<Store[]>(stores);
  const [storeModel, setStoreModel] = useState<StoreModel>(baseStoreModel);
  const [storeModels, setStoreModels] = useState<StoreModel[]>([baseStoreModel]);
  const [categories] = useState<Category[]>(initCats);
  const [products, setProducts] = useState<Product[]>(initProds);
  const [promotions] = useState<Promotion[]>(initProms);
  const [customers, setCustomers] = useState<Customer[]>(initCusts);
  const [orders, setOrders] = useState<Order[]>(initOrders);
  const [loyaltyProgram, setLoyalty] = useState<LoyaltyProgram>(initLoyalty);
  const [rewards, setRewards] = useState<Reward[]>(initRewards);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initCamps);
  const [integrations, setIntegrations] = useState<Integration[]>(initInts);
  const [onboardingTasks, setOnboarding] = useState<OnboardingTask[]>(initOnb);

  const [cart, setCart] = useState<{ productId: string; qty: number }[]>([]);
  const [cartCustomerId, setCartCustomer] = useState<string | undefined>();

  const value: AppState = {
    business: biz, allBusinesses: allBiz, stores: storesL, storeModel, storeModels,
    categories, products, promotions, customers, orders, loyaltyProgram, rewards,
    campaigns, integrations, onboardingTasks, cart, cartCustomerId,
    updateStoreModel: (m) => {
      setStoreModel(m);
      setStoreModels((prev) => prev.map(x => x.id === m.id ? m : x));
    },
    cloneStoreModel: (name) => {
      const id = 'sm-' + Math.random().toString(36).slice(2, 7);
      const cloned: StoreModel = { ...storeModel, id, name };
      setStoreModels((prev) => [...prev, cloned]);
    },
    updateProduct: (p) => setProducts((prev) => prev.map(x => x.id === p.id ? p : x)),
    toggleProductAvailable: (id) =>
      setProducts((prev) => prev.map(x => x.id === id ? { ...x, available: !x.available } : x)),
    updateOrderStatus: (id, s) =>
      setOrders((prev) => prev.map(o => o.id === id ? { ...o, status: s } : o)),
    addOrder: (o) => setOrders((prev) => [o, ...prev]),
    addCustomer: (c) => setCustomers((prev) => [c, ...prev]),
    upsertCampaign: (c) => setCampaigns((prev) => {
      const i = prev.findIndex(x => x.id === c.id);
      if (i === -1) return [c, ...prev];
      const cp = [...prev]; cp[i] = c; return cp;
    }),
    toggleIntegration: (key) =>
      setIntegrations((prev) => prev.map(i => i.key === key ? { ...i, connected: !i.connected } : i)),
    toggleOnboarding: (id) =>
      setOnboarding((prev) => prev.map(t => t.id === id ? { ...t, done: !t.done } : t)),
    updateLoyalty: setLoyalty,
    updateReward: (r) => setRewards((prev) => prev.map(x => x.id === r.id ? r : x)),

    addToCart: (productId, qty = 1) => setCart((prev) => {
      const i = prev.findIndex(x => x.productId === productId);
      if (i === -1) return [...prev, { productId, qty }];
      const cp = [...prev]; cp[i] = { ...cp[i], qty: cp[i].qty + qty }; return cp;
    }),
    removeFromCart: (productId) => setCart((prev) => prev.filter(x => x.productId !== productId)),
    clearCart: () => setCart([]),
    setCartCustomer,
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
