import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './data/store';
import { TopNav } from './components/TopNav';

import { LandingPage } from './pages/Landing';
import { StrategyPage } from './pages/Strategy';

import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminBusinesses } from './pages/admin/AdminBusinesses';
import { AdminStoreModel } from './pages/admin/AdminStoreModel';
import { AdminOnboarding } from './pages/admin/AdminOnboarding';
import { AdminStores } from './pages/admin/AdminStores';

import { BusinessLayout } from './pages/business/BusinessLayout';
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BusinessCatalog } from './pages/business/BusinessCatalog';
import { BusinessOrders } from './pages/business/BusinessOrders';
import { BusinessCustomers } from './pages/business/BusinessCustomers';
import { BusinessLoyalty } from './pages/business/BusinessLoyalty';
import { BusinessMarketing } from './pages/business/BusinessMarketing';
import { BusinessSettings } from './pages/business/BusinessSettings';

import { CustomerPWA } from './pages/pwa/CustomerPWA';

function ShellWithNav({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <TopNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<ShellWithNav><LandingPage /></ShellWithNav>} />
          <Route path="/estrategia" element={<ShellWithNav><StrategyPage /></ShellWithNav>} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="clientes" element={<AdminBusinesses />} />
            <Route path="locales" element={<AdminStores />} />
            <Route path="modelo-de-local" element={<AdminStoreModel />} />
            <Route path="onboarding" element={<AdminOnboarding />} />
          </Route>

          <Route path="/business" element={<BusinessLayout />}>
            <Route index element={<BusinessDashboard />} />
            <Route path="catalogo" element={<BusinessCatalog />} />
            <Route path="pedidos" element={<BusinessOrders />} />
            <Route path="clientes" element={<BusinessCustomers />} />
            <Route path="fidelizacion" element={<BusinessLoyalty />} />
            <Route path="marketing" element={<BusinessMarketing />} />
            <Route path="config" element={<BusinessSettings />} />
          </Route>

          <Route path="/app/:slug/*" element={<CustomerPWA />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
