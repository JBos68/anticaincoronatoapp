import React, { useMemo } from 'react';
import { Product, Sale } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
// Added Box to the imported icons from lucide-react
import { ArrowUpRight, TrendingUp, AlertCircle, Euro, Box } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  sales: Sale[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, sales }) => {
  const totalStock = products.reduce((acc, p) => acc + p.stock, 0);
  const totalRevenue = sales.reduce((acc, s) => acc + s.totalPrice, 0);
  const lowStockItems = products.filter(p => p.stock < 5);

  const categoryData = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [products]);

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Panoramica Attività</h2>
        <p className="text-slate-500">Ecco cosa sta succedendo nel tuo negozio oggi.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
              <Euro size={24} />
            </div>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1">
              +12% <ArrowUpRight size={14} />
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Fatturato Totale</p>
          <h3 className="text-2xl font-bold mt-1">€{totalRevenue.toFixed(2)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Articoli Venduti</p>
          <h3 className="text-2xl font-bold mt-1">{sales.reduce((a, b) => a + b.quantity, 0)}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
              <Box size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Disponibilità Stock</p>
          <h3 className="text-2xl font-bold mt-1">{totalStock} pezzi</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-orange-100 p-2 rounded-xl text-orange-600">
              <AlertCircle size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Alert Sotto Scorta</p>
          <h3 className="text-2xl font-bold mt-1 text-orange-600">{lowStockItems.length} articoli</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Chart */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6">Mix Categorie</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <span className="text-slate-600">{cat.name}</span>
                </div>
                <span className="font-bold">{cat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold mb-6">Articoli in Esaurimento</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 text-sm font-medium border-b border-slate-50">
                  <th className="pb-3">Prodotto</th>
                  <th className="pb-3 text-center">Stock</th>
                  <th className="pb-3">Prezzo</th>
                  <th className="pb-3">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {lowStockItems.map(p => (
                  <tr key={p.id} className="text-sm">
                    <td className="py-4 font-medium">{p.name}</td>
                    <td className="py-4 text-center">
                      <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 rounded-md font-bold">
                        {p.stock}
                      </span>
                    </td>
                    <td className="py-4">€{p.price.toFixed(2)}</td>
                    <td className="py-4">
                      <span className="text-orange-600 font-medium">Ordine Necessario</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {lowStockItems.length === 0 && (
              <div className="py-12 text-center text-slate-400">Tutti i prodotti sono ben riforniti.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;