import { Card, Badge, Button, ProgressBar } from '../../components/ui';
import { useApp } from '../../data/store';
import { Check, Circle } from 'lucide-react';

export function AdminOnboarding() {
  const { onboardingTasks, toggleOnboarding, business, integrations, toggleIntegration } = useApp();
  const done = onboardingTasks.filter(t => t.done).length;
  const progress = Math.round((done / onboardingTasks.length) * 100);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-ink-900">Onboarding</h1>
        <p className="text-ink-500 mt-1">Checklist de implementación de <span className="font-semibold">{business.name}</span>.</p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-ink-500">Avance general</div>
            <div className="text-2xl font-bold text-ink-900">{done}/{onboardingTasks.length} tareas completas</div>
          </div>
          <Badge className="bg-brand-100 text-brand-800 ring-brand-200 text-base px-3 py-1">{progress}%</Badge>
        </div>
        <ProgressBar value={progress} />
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-5">
          <h3 className="font-semibold text-ink-900 mb-3">Checklist</h3>
          <ul className="space-y-2">
            {onboardingTasks.map((t) => (
              <li key={t.id}>
                <button onClick={() => toggleOnboarding(t.id)}
                  className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-ink-50 text-left">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${t.done ? 'bg-emerald-500 text-white' : 'border-2 border-ink-300 text-ink-300'}`}>
                    {t.done ? <Check className="w-3 h-3" /> : <Circle className="w-3 h-3" />}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${t.done ? 'text-ink-400 line-through' : 'text-ink-900'}`}>{t.step}. {t.title}</div>
                    <div className="text-xs text-ink-500">{t.description}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h3 className="font-semibold text-ink-900 mb-3">Integraciones</h3>
          <div className="space-y-2">
            {integrations.map((i) => (
              <div key={i.key} className="flex items-center justify-between p-3 rounded-xl border border-ink-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-ink-50 text-xl flex items-center justify-center">{i.emoji}</div>
                  <div>
                    <div className="font-semibold text-sm text-ink-900">{i.name}</div>
                    <div className="text-xs text-ink-500">{i.description}</div>
                  </div>
                </div>
                <Button size="sm" variant={i.connected ? 'outline' : 'primary'} onClick={() => toggleIntegration(i.key)}>
                  {i.connected ? 'Desconectar' : 'Conectar'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
