import { Card, Section, Button, Badge, Input } from '../../components/ui';
import { useApp } from '../../data/store';
import { Link } from 'react-router-dom';
import { Boxes } from 'lucide-react';

export function BusinessSettings() {
  const { business, integrations, toggleIntegration, stores } = useApp();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-ink-900">Configuración</h1>
        <p className="text-ink-500 mt-1">Datos del negocio, locales e integraciones.</p>
      </div>

      <Section title="Datos del negocio">
        <Card className="p-6 grid md:grid-cols-3 gap-4">
          <Input label="Nombre" defaultValue={business.name} />
          <Input label="Ciudad" defaultValue={business.city} />
          <Input label="Plan" defaultValue={business.plan} disabled />
        </Card>
      </Section>

      <Section title="Locales">
        <div className="grid md:grid-cols-2 gap-3">
          {stores.map((s) => (
            <Card key={s.id} className="p-4">
              <div className="font-semibold text-ink-900">{s.name}</div>
              <div className="text-xs text-ink-500">{s.address}</div>
              <div className="text-xs text-ink-500">{s.phone}</div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Modelo de Local">
        <Card className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center"><Boxes className="w-5 h-5 text-brand-600" /></div>
            <div>
              <div className="font-semibold text-ink-900">Modelo Café Central</div>
              <div className="text-xs text-ink-500">La plantilla central de configuración se administra desde el admin SaaS.</div>
            </div>
          </div>
          <Link to="/admin/modelo-de-local"><Button variant="outline" size="sm">Abrir editor</Button></Link>
        </Card>
      </Section>

      <Section title="Integraciones">
        <div className="grid md:grid-cols-2 gap-3">
          {integrations.map((i) => (
            <Card key={i.key} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ink-50 flex items-center justify-center text-xl">{i.emoji}</div>
                <div>
                  <div className="font-semibold text-sm text-ink-900 flex items-center gap-2">
                    {i.name}
                    {i.connected && <Badge className="bg-emerald-100 text-emerald-700 ring-emerald-200">Conectada</Badge>}
                  </div>
                  <div className="text-xs text-ink-500">{i.description}</div>
                </div>
              </div>
              <Button size="sm" variant={i.connected ? 'outline' : 'primary'} onClick={() => toggleIntegration(i.key)}>
                {i.connected ? 'Desconectar' : 'Conectar'}
              </Button>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
