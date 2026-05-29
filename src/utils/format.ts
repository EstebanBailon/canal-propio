export const money = (n: number) => `$${n.toLocaleString('es-UY')}`;

export const datetime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString('es-UY', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
};

export const date = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString('es-UY', { day: '2-digit', month: 'short', year: 'numeric' });
};

export const orderStatusColor = (s: string) => {
  switch (s) {
    case 'nuevo': return 'bg-blue-100 text-blue-800 ring-blue-200';
    case 'aceptado': return 'bg-indigo-100 text-indigo-800 ring-indigo-200';
    case 'preparando': return 'bg-amber-100 text-amber-800 ring-amber-200';
    case 'listo': return 'bg-purple-100 text-purple-800 ring-purple-200';
    case 'enviado': return 'bg-cyan-100 text-cyan-800 ring-cyan-200';
    case 'entregado': return 'bg-emerald-100 text-emerald-800 ring-emerald-200';
    case 'cancelado': return 'bg-rose-100 text-rose-800 ring-rose-200';
    default: return 'bg-slate-100 text-slate-800 ring-slate-200';
  }
};

export const nextStatus = (s: string): string | null => {
  const flow: Record<string, string> = {
    nuevo: 'aceptado',
    aceptado: 'preparando',
    preparando: 'listo',
    listo: 'enviado',
    enviado: 'entregado',
  };
  return flow[s] ?? null;
};
