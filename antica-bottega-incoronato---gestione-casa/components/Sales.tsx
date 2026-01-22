
import React from 'react';
import { Sale } from '../types';
import { ShoppingBag, Calendar, ArrowRight } from 'lucide-react';

interface SalesProps {
  sales: Sale[];
}

const Sales: React.FC<SalesProps> = ({ sales }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Storico Vendite</h2>
        <p className="text-slate-500">Visualizza tutte le transazioni completate nel negozio.</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">ID Transazione</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Articolo</th>
                <th className="px-6 py-4 text-center">Quantità</th>
                <th className="px-6 py-4 text-right">Totale</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sales.map((sale) => (
                <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 font-mono text-xs text-slate-400">#{sale.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-slate-600 text-sm">
                      <Calendar size={14} />
                      {new Date(sale.date).toLocaleDateString('it-IT')}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <ShoppingBag size={16} />
                      </div>
                      <span className="font-bold text-slate-800">{sale.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-bold text-slate-600">
                      x{sale.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-slate-900">
                    €{sale.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {sales.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            Nessuna vendita registrata. Inizia a vendere prodotti!
          </div>
        )}
      </div>
    </div>
  );
};

export default Sales;
