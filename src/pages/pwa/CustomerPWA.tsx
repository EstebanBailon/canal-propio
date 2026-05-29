import { useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../data/store';
import { money } from '../../utils/format';
import type { Product, Order, DeliveryMethod, PaymentMethod, OrderItem } from '../../types';
import { Home, Search, Gift, ShoppingBag, ChevronLeft, Plus, Minus, MessageCircle, ChevronRight, MapPin, Check, Trash2 } from 'lucide-react';
import { Button, Badge } from '../../components/ui';
import clsx from 'clsx';

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-ink-100 flex items-center justify-center py-6 px-4">
      <div className="phone-frame">
        <div>{children}</div>
      </div>
    </div>
  );
}

function BottomNav({ slug, cartCount }: { slug: string; cartCount: number }) {
  const items = [
    { to: `/app/${slug}`, label: 'Inicio', icon: <Home className="w-5 h-5" />, end: true },
    { to: `/app/${slug}/buscar`, label: 'Buscar', icon: <Search className="w-5 h-5" /> },
    { to: `/app/${slug}/puntos`, label: 'Puntos', icon: <Gift className="w-5 h-5" /> },
    { to: `/app/${slug}/cuenta`, label: 'Cuenta', icon: <ShoppingBag className="w-5 h-5" /> },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-ink-100 grid grid-cols-4 z-10">
      {items.map((it) => (
        <Link key={it.to} to={it.to} className="py-3 flex flex-col items-center text-[10px] text-ink-500">
          <div className="relative">
            {it.icon}
            {it.label === 'Inicio' && cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-brand-600 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
            )}
          </div>
          <span className="mt-1">{it.label}</span>
        </Link>
      ))}
    </div>
  );
}

function Hero({ business, storeModel }: any) {
  return (
    <div className="relative h-44 p-5 text-white" style={{ background: `linear-gradient(135deg, ${storeModel.branding.primaryColor}, ${storeModel.branding.accentColor})` }}>
      <div className="text-[10px] uppercase tracking-widest opacity-90">{business.city}</div>
      <div className="text-xl font-bold mt-1 leading-tight">{storeModel.branding.heroTagline}</div>
      <a href="#whatsapp" className="absolute right-4 bottom-4 bg-emerald-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  );
}

function HomeView() {
  const { business, storeModel, categories, products, addToCart, cart, promotions } = useApp();
  const slug = business.slug;
  const featured = products.filter(p => p.featured && p.available);
  const cartCount = cart.reduce((a, x) => a + x.qty, 0);
  const nav = useNavigate();

  return (
    <div className="h-full overflow-y-auto pb-20 no-scrollbar">
      <Hero business={business} storeModel={storeModel} />

      {/* Promos */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {promotions.filter(p => p.active).map((p) => (
            <div key={p.id} className="min-w-[220px] rounded-2xl p-3 text-white" style={{ background: `linear-gradient(135deg, ${storeModel.branding.primaryColor}, #f59e0b)` }}>
              <div className="text-[10px] uppercase font-bold opacity-90">{p.type === '%' ? `${p.value}% off` : p.type === 'combo' ? `Combo · $${p.value}` : p.type === '2x1' ? '2x1' : `$${p.value}`}</div>
              <div className="text-sm font-bold mt-1">{p.name}</div>
              <div className="text-[10px] opacity-90 mt-1">{p.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Categorías */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {categories.map((c) => (
            <div key={c.id} className="min-w-[80px] flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-ink-50 flex items-center justify-center text-3xl">{c.emoji}</div>
              <div className="text-[10px] font-medium text-ink-700 mt-1">{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Destacados */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2">
          <div className="font-bold text-ink-900">Destacados</div>
          <Link to={`/app/${slug}/buscar`} className="text-xs text-brand-600 font-semibold">Ver todo</Link>
        </div>
        <div className="space-y-2">
          {featured.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-ink-100">
              <div className="w-14 h-14 rounded-xl bg-ink-50 flex items-center justify-center text-3xl shrink-0">{p.imageEmoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-ink-900 truncate">{p.name}</div>
                <div className="text-[11px] text-ink-500 truncate">{p.description}</div>
                <div className="text-sm font-bold mt-1" style={{ color: storeModel.branding.primaryColor }}>{money(p.price)}</div>
              </div>
              <button onClick={() => addToCart(p.id)} className="w-9 h-9 rounded-xl bg-ink-900 text-white flex items-center justify-center">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Catálogo por categoría */}
      <div className="px-4 mt-6 space-y-5">
        {categories.map((c) => (
          <div key={c.id}>
            <div className="font-bold text-ink-900 mb-2">{c.emoji} {c.name}</div>
            <div className="space-y-2">
              {products.filter(p => p.categoryId === c.id).map((p) => (
                <div key={p.id} className={clsx('flex items-center gap-3 p-3 rounded-2xl bg-white border border-ink-100', !p.available && 'opacity-50')}>
                  <div className="w-14 h-14 rounded-xl bg-ink-50 flex items-center justify-center text-3xl shrink-0">{p.imageEmoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-ink-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-ink-500 truncate">{p.description}</div>
                    <div className="text-sm font-bold mt-1" style={{ color: storeModel.branding.primaryColor }}>{money(p.price)}</div>
                  </div>
                  {p.available ? (
                    <button onClick={() => addToCart(p.id)} className="w-9 h-9 rounded-xl bg-ink-900 text-white flex items-center justify-center"><Plus className="w-4 h-4" /></button>
                  ) : (
                    <span className="text-[10px] text-ink-400 font-semibold">Agotado</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Botón ir al carrito */}
      {cartCount > 0 && (
        <button onClick={() => nav(`/app/${slug}/carrito`)}
          className="fixed md:absolute bottom-20 left-4 right-4 bg-ink-900 text-white py-3 rounded-2xl font-semibold flex items-center justify-between px-5 shadow-lg max-w-[356px] mx-auto" style={{ background: storeModel.branding.primaryColor }}>
          <span>Ver carrito ({cartCount})</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

function CartView() {
  const { products, cart, removeFromCart, addToCart, business, storeModel } = useApp();
  const nav = useNavigate();
  const items: { product: Product; qty: number }[] = cart.map(c => ({ product: products.find(p => p.id === c.productId)!, qty: c.qty })).filter(x => x.product);
  const subtotal = items.reduce((a, x) => a + x.product.price * x.qty, 0);

  if (cart.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <header className="p-4 flex items-center gap-3 border-b border-ink-100">
          <button onClick={() => nav(-1)}><ChevronLeft className="w-5 h-5" /></button>
          <div className="font-bold">Carrito</div>
        </header>
        <div className="flex-1 flex items-center justify-center p-6 text-center">
          <div>
            <div className="text-5xl">🛒</div>
            <div className="mt-3 font-semibold text-ink-900">Tu carrito está vacío</div>
            <div className="text-sm text-ink-500 mt-1">Volvé al inicio y elegí algo rico.</div>
            <Link to={`/app/${business.slug}`}><Button className="mt-4">Volver al inicio</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 flex items-center gap-3 border-b border-ink-100">
        <button onClick={() => nav(-1)}><ChevronLeft className="w-5 h-5" /></button>
        <div className="font-bold">Carrito</div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
        {items.map(({ product, qty }) => (
          <div key={product.id} className="flex items-center gap-3 p-3 rounded-2xl border border-ink-100 bg-white">
            <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center text-2xl">{product.imageEmoji}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-ink-900 truncate">{product.name}</div>
              <div className="text-sm font-bold" style={{ color: storeModel.branding.primaryColor }}>{money(product.price * qty)}</div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => qty > 1 ? addToCart(product.id, -1) : removeFromCart(product.id)} className="w-7 h-7 rounded-lg bg-ink-100 flex items-center justify-center">
                {qty > 1 ? <Minus className="w-3 h-3" /> : <Trash2 className="w-3 h-3" />}
              </button>
              <div className="w-6 text-center font-bold">{qty}</div>
              <button onClick={() => addToCart(product.id, 1)} className="w-7 h-7 rounded-lg bg-ink-100 flex items-center justify-center">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-ink-100 bg-white">
        <div className="flex justify-between text-sm text-ink-600 mb-2">
          <span>Subtotal</span><span className="font-bold text-ink-900">{money(subtotal)}</span>
        </div>
        <button onClick={() => nav(`/app/${business.slug}/checkout`)}
          className="w-full py-3 rounded-2xl text-white font-bold" style={{ background: storeModel.branding.primaryColor }}>
          Continuar al pago · {money(subtotal)}
        </button>
      </div>
    </div>
  );
}

function CheckoutView() {
  const { products, cart, business, storeModel, customers, cartCustomerId, setCartCustomer, clearCart, addOrder, addCustomer } = useApp();
  const nav = useNavigate();

  const [method, setMethod] = useState<DeliveryMethod>('retiro');
  const [zoneIdx, setZoneIdx] = useState(0);
  const [pay, setPay] = useState<PaymentMethod>('mercadopago');
  const [notes, setNotes] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const items = cart.map(c => ({ product: products.find(p => p.id === c.productId)!, qty: c.qty })).filter(x => x.product);
  const subtotal = items.reduce((a, x) => a + x.product.price * x.qty, 0);
  const zone = storeModel.deliveryZones[zoneIdx];
  const fee = method === 'delivery-propio' ? zone.fee : 0;
  const total = subtotal + fee;

  const existing = customers.find(c => c.id === cartCustomerId);

  const confirm = () => {
    let customerId = cartCustomerId;
    if (!customerId) {
      const newCustomer = {
        id: 'cu-' + Math.random().toString(36).slice(2, 7),
        name: name || 'Cliente PWA', phone: phone || '099000000',
        registeredAt: new Date().toISOString().slice(0, 10),
        lastOrderAt: new Date().toISOString().slice(0, 10),
        totalOrders: 1, totalSpent: total, avgTicket: total,
        points: Math.floor(total / 50), segment: 'nuevo' as const,
      };
      addCustomer(newCustomer);
      customerId = newCustomer.id;
      setCartCustomer(customerId);
    }
    const orderCode = 'CC-' + Math.floor(2100 + Math.random() * 100);
    const order: Order = {
      id: 'o-' + Math.random().toString(36).slice(2, 7),
      code: orderCode,
      storeId: 's1', customerId: customerId!,
      status: 'nuevo', channel: 'pwa',
      deliveryMethod: method, paymentMethod: pay,
      items: items.map(({ product, qty }) => ({ productId: product.id, name: product.name, qty, unitPrice: product.price } as OrderItem)),
      subtotal, deliveryFee: fee, total, notes,
      createdAt: new Date().toISOString(),
    };
    addOrder(order);
    clearCart();
    nav(`/app/${business.slug}/exito/${orderCode}`);
  };

  return (
    <div className="h-full flex flex-col">
      <header className="p-4 flex items-center gap-3 border-b border-ink-100">
        <button onClick={() => nav(-1)}><ChevronLeft className="w-5 h-5" /></button>
        <div className="font-bold">Checkout</div>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {/* Cliente */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">Tus datos</div>
          {existing ? (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
              <div>
                <div className="font-semibold text-emerald-900 text-sm">{existing.name}</div>
                <div className="text-xs text-emerald-700">{existing.phone}</div>
              </div>
              <button onClick={() => setCartCustomer(undefined)} className="text-xs font-semibold text-emerald-800">Cambiar</button>
            </div>
          ) : (
            <div className="space-y-2">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" className="w-full h-10 px-3 rounded-xl border border-ink-200 text-sm" />
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" className="w-full h-10 px-3 rounded-xl border border-ink-200 text-sm" />
              <div className="text-[11px] text-ink-500">O <button className="text-brand-600 font-semibold underline" onClick={() => setCartCustomer('cu2')}>iniciar sesión</button> (Javier Pereira en demo).</div>
            </div>
          )}
        </div>

        {/* Entrega */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">Entrega</div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setMethod('retiro')} className={clsx('p-3 rounded-xl text-sm border text-left', method === 'retiro' ? 'border-brand-500 bg-brand-50' : 'border-ink-200')}>
              <div className="font-bold text-ink-900">Retiro en local</div>
              <div className="text-[11px] text-ink-500 mt-1">Sin costo</div>
            </button>
            <button onClick={() => setMethod('delivery-propio')} className={clsx('p-3 rounded-xl text-sm border text-left', method === 'delivery-propio' ? 'border-brand-500 bg-brand-50' : 'border-ink-200')}>
              <div className="font-bold text-ink-900">Delivery</div>
              <div className="text-[11px] text-ink-500 mt-1">Cadetería propia</div>
            </button>
          </div>
          {method === 'delivery-propio' && (
            <div className="mt-2 p-3 rounded-xl bg-ink-50">
              <div className="text-xs text-ink-500 mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> Zona de entrega</div>
              <select value={zoneIdx} onChange={(e) => setZoneIdx(+e.target.value)} className="w-full h-9 px-2 rounded-lg border border-ink-200 text-sm bg-white">
                {storeModel.deliveryZones.map((z, i) => (
                  <option key={i} value={i}>{z.name} · {money(z.fee)} · ETA {z.etaMinutes}min</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Pago */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">Pago</div>
          <div className="grid grid-cols-2 gap-2">
            {(storeModel.paymentMethods).map((m) => (
              <button key={m} onClick={() => setPay(m)} className={clsx('p-2.5 rounded-xl text-sm border', pay === m ? 'border-brand-500 bg-brand-50' : 'border-ink-200')}>
                <div className="font-semibold text-ink-900 capitalize text-xs">{m.replace('-', ' ')}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Nota */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-ink-500 mb-2">Nota (opcional)</div>
          <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ej. dejar en portería" className="w-full h-10 px-3 rounded-xl border border-ink-200 text-sm" />
        </div>

        {/* Totales */}
        <div className="rounded-xl bg-ink-50 p-3 text-sm space-y-1">
          <div className="flex justify-between text-ink-600"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          {fee > 0 && <div className="flex justify-between text-ink-600"><span>Envío</span><span>{money(fee)}</span></div>}
          <div className="flex justify-between font-bold text-ink-900 pt-1 border-t border-ink-200"><span>Total</span><span>{money(total)}</span></div>
          <div className="text-[11px] text-emerald-700 font-semibold pt-1">+ {Math.floor(total / 50)} puntos para tu próximo pedido</div>
        </div>
      </div>

      <div className="p-4 border-t border-ink-100 bg-white">
        <button onClick={confirm} disabled={!(name || existing)}
          className="w-full py-3 rounded-2xl text-white font-bold disabled:opacity-50" style={{ background: storeModel.branding.primaryColor }}>
          Confirmar pedido · {money(total)}
        </button>
      </div>
    </div>
  );
}

function SuccessView() {
  const { code } = useParams();
  const { business } = useApp();
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center"><Check className="w-10 h-10 text-emerald-600" /></div>
      <div className="mt-4 text-xl font-bold text-ink-900">¡Pedido recibido!</div>
      <div className="text-sm text-ink-500 mt-1">Código <span className="font-mono font-bold text-ink-900">{code}</span></div>
      <div className="text-xs text-ink-500 mt-3 max-w-xs">Te avisaremos por WhatsApp cuando esté listo. Sumaste puntos a tu cuenta.</div>
      <div className="mt-6 flex gap-2">
        <Link to={`/app/${business.slug}`}><Button variant="outline">Inicio</Button></Link>
        <Link to={`/app/${business.slug}/cuenta`}><Button>Ver mis pedidos</Button></Link>
      </div>
    </div>
  );
}

function PointsView() {
  const { rewards, customers, cartCustomerId, storeModel } = useApp();
  const me = customers.find(c => c.id === cartCustomerId) ?? customers[0];
  const nav = useNavigate();

  return (
    <div className="h-full overflow-y-auto pb-20 no-scrollbar">
      <header className="p-4 flex items-center gap-3 border-b border-ink-100">
        <button onClick={() => nav(-1)}><ChevronLeft className="w-5 h-5" /></button>
        <div className="font-bold">Puntos y recompensas</div>
      </header>

      <div className="p-4">
        <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${storeModel.branding.primaryColor}, #f59e0b)` }}>
          <div className="text-xs uppercase opacity-90">Tus puntos</div>
          <div className="text-4xl font-extrabold mt-1">{me.points}</div>
          <div className="text-xs opacity-90 mt-1">Hola {me.name.split(' ')[0]} · seguí sumando con cada pedido</div>
        </div>
      </div>

      <div className="px-4">
        <div className="font-bold text-ink-900 mb-2">Canjeá ahora</div>
        <div className="space-y-2">
          {rewards.filter(r => r.active).map((r) => {
            const ok = me.points >= r.pointsCost;
            return (
              <div key={r.id} className={clsx('flex items-center gap-3 p-3 rounded-2xl border', ok ? 'bg-white border-ink-100' : 'bg-ink-50 border-ink-100 opacity-70')}>
                <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-2xl">{r.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-ink-900 truncate">{r.name}</div>
                  <div className="text-[11px] text-ink-500 truncate">{r.description}</div>
                </div>
                <Badge className="bg-brand-100 text-brand-800 ring-brand-200">{r.pointsCost} pts</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AccountView() {
  const { customers, cartCustomerId, orders, setCartCustomer, business } = useApp();
  const me = customers.find(c => c.id === cartCustomerId);
  const nav = useNavigate();
  const myOrders = me ? orders.filter(o => o.customerId === me.id) : [];

  if (!me) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="text-5xl">👋</div>
        <div className="mt-3 font-bold text-ink-900">Iniciá sesión</div>
        <div className="text-sm text-ink-500 mt-1 max-w-xs">Para ver tus pedidos y tus puntos.</div>
        <Button className="mt-4" onClick={() => setCartCustomer('cu2')}>Entrar como Javier (demo)</Button>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20 no-scrollbar">
      <header className="p-4 flex items-center gap-3 border-b border-ink-100">
        <button onClick={() => nav(-1)}><ChevronLeft className="w-5 h-5" /></button>
        <div className="font-bold">Mi cuenta</div>
      </header>
      <div className="p-4 space-y-3">
        <div className="rounded-2xl bg-ink-900 text-white p-4">
          <div className="font-bold">{me.name}</div>
          <div className="text-xs opacity-80">{me.phone}</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div><div className="text-xs opacity-70">Pedidos</div><div className="font-bold">{me.totalOrders}</div></div>
            <div><div className="text-xs opacity-70">Puntos</div><div className="font-bold">{me.points}</div></div>
            <div><div className="text-xs opacity-70">Ticket</div><div className="font-bold">{money(me.avgTicket)}</div></div>
          </div>
        </div>

        <div>
          <div className="font-bold text-ink-900 mb-2">Mis pedidos</div>
          <div className="space-y-2">
            {myOrders.length === 0 && <div className="text-sm text-ink-500">Sin pedidos recientes.</div>}
            {myOrders.map(o => (
              <div key={o.id} className="p-3 rounded-2xl border border-ink-100 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-xs text-ink-500">{o.code}</div>
                  <Badge className="bg-ink-100 text-ink-700 ring-ink-200">{o.status}</Badge>
                </div>
                <div className="mt-1 text-sm text-ink-800">{o.items.length} items · {money(o.total)}</div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => setCartCustomer(undefined)} className="w-full py-2 rounded-xl text-sm text-ink-500">Cerrar sesión</button>
        <Link to={`/app/${business.slug}`} className="block text-center text-xs text-brand-600 mt-2">Volver al inicio</Link>
      </div>
    </div>
  );
}

function SearchView() {
  const { products, categories } = useApp();
  const [q, setQ] = useState('');
  const nav = useNavigate();
  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="h-full flex flex-col">
      <header className="p-4 border-b border-ink-100 flex items-center gap-3">
        <button onClick={() => nav(-1)}><ChevronLeft className="w-5 h-5" /></button>
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscá un producto…"
          className="flex-1 h-10 px-3 rounded-xl bg-ink-100 text-sm focus:outline-none" />
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
        {filtered.length === 0 && <div className="text-center text-ink-500 text-sm mt-8">Sin resultados</div>}
        {filtered.map(p => {
          const cat = categories.find(c => c.id === p.categoryId);
          return (
            <div key={p.id} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-ink-100">
              <div className="w-12 h-12 rounded-xl bg-ink-50 flex items-center justify-center text-2xl">{p.imageEmoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-ink-900 truncate">{p.name}</div>
                <div className="text-[11px] text-ink-500">{cat?.name}</div>
              </div>
              <div className="text-sm font-bold text-ink-900">{money(p.price)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CustomerPWA() {
  const { slug } = useParams();
  const { business, cart } = useApp();
  const cartCount = cart.reduce((a, x) => a + x.qty, 0);

  // Demo banner explicando que esto es la PWA del cliente
  return (
    <div className="min-h-full bg-ink-100">
      <div className="bg-ink-900 text-white text-xs px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500 text-white ring-emerald-600">DEMO PWA</Badge>
          <span className="opacity-80">Esto es lo que ve el cliente final en su celular.</span>
        </div>
        <Link to="/" className="opacity-80 hover:opacity-100">← Volver al sitio</Link>
      </div>
      <PhoneFrame>
        <Routes>
          <Route index element={<HomeView />} />
          <Route path="buscar" element={<SearchView />} />
          <Route path="carrito" element={<CartView />} />
          <Route path="checkout" element={<CheckoutView />} />
          <Route path="exito/:code" element={<SuccessView />} />
          <Route path="puntos" element={<PointsView />} />
          <Route path="cuenta" element={<AccountView />} />
        </Routes>
        <BottomNav slug={slug ?? business.slug} cartCount={cartCount} />
      </PhoneFrame>
    </div>
  );
}
