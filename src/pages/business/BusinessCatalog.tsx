import { useState } from 'react';
import { Card, Badge, Button, Toggle, Input } from '../../components/ui';
import { useApp } from '../../data/store';
import { Plus, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BusinessCatalog() {
  const { categories, products, promotions, toggleProductAvailable, updateProduct, business } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filtered = selectedCat === 'all' ? products : products.filter(p => p.categoryId === selectedCat);

  return (
    <div>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Catálogo</h1>
          <p className="text-ink-500 mt-1">Editás una vez, se ve en tu PWA y en todos tus locales.</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/app/${business.slug}`}><Button variant="outline" iconLeft={<Eye className="w-4 h-4" />}>Preview en PWA</Button></Link>
          <Button iconLeft={<Plus className="w-4 h-4" />}>Nuevo producto</Button>
        </div>
      </div>

      {/* Categorías */}
      <Card className="p-3 mb-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button onClick={() => setSelectedCat('all')}
          className={`px-3 h-9 rounded-xl text-sm font-medium ${selectedCat === 'all' ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
          Todos ({products.length})
        </button>
        {categories.map((c) => (
          <button key={c.id} onClick={() => setSelectedCat(c.id)}
            className={`px-3 h-9 rounded-xl text-sm font-medium ${selectedCat === c.id ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
            {c.emoji} {c.name} ({products.filter(p => p.categoryId === c.id).length})
          </button>
        ))}
        <Button size="sm" variant="ghost" className="ml-auto" iconLeft={<Plus className="w-3 h-3" />}>Categoría</Button>
      </Card>

      {/* Promociones */}
      <Card className="p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-ink-900">Promociones activas</h3>
          <Button size="sm" variant="outline">+ Nueva promo</Button>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {promotions.map((p) => (
            <div key={p.id} className="p-3 rounded-xl border border-ink-100 bg-gradient-to-br from-brand-50 to-amber-50">
              <Badge className="bg-brand-600 text-white ring-brand-700">{p.type}</Badge>
              <div className="mt-2 font-semibold text-ink-900 text-sm">{p.name}</div>
              <div className="text-xs text-ink-500 mt-1">{p.description}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Productos */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <Card key={p.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-xl bg-ink-50 flex items-center justify-center text-3xl shrink-0">{p.imageEmoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-ink-900 truncate">{p.name}</div>
                  {p.featured && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                </div>
                <div className="text-xs text-ink-500 mt-0.5 line-clamp-2">{p.description}</div>
                <div className="mt-2 flex items-center justify-between">
                  <Input type="number" value={p.price} onChange={(e) => updateProduct({ ...p, price: +e.target.value })} className="w-24 h-8" />
                  <Toggle checked={p.available} onChange={() => toggleProductAvailable(p.id)} />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className={p.available ? 'text-emerald-700' : 'text-rose-700'}>
                    {p.available ? '● Disponible' : '● No disponible'}
                  </span>
                  <button onClick={() => updateProduct({ ...p, featured: !p.featured })}
                    className={`font-semibold ${p.featured ? 'text-amber-700' : 'text-ink-500 hover:text-ink-700'}`}>
                    {p.featured ? 'Destacado' : 'Destacar'}
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 rounded-xl bg-white border border-dashed border-ink-200 text-sm text-ink-500">
        <span className="font-semibold text-ink-700">Tip:</span> Marcá hasta 4 productos como destacados — se muestran arriba del fold en la PWA.
      </div>
    </div>
  );
}
