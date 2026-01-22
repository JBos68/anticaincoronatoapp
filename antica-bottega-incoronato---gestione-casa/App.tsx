
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import AIConsultant from './components/AIConsultant';
import Sales from './components/Sales';
import { ViewType, Product, Sale } from './types';
import { INITIAL_PRODUCTS, MOCK_SALES } from './data/mockData';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewType>('dashboard');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sales] = useState<Sale[]>(MOCK_SALES);

  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard products={products} sales={sales} />;
      case 'inventory':
        return <Inventory products={products} onAddProduct={handleAddProduct} onDeleteProduct={handleDeleteProduct} />;
      case 'sales':
        return <Sales sales={sales} />;
      case 'ai-consultant':
        return <AIConsultant products={products} />;
      default:
        return <Dashboard products={products} sales={sales} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar currentView={currentView} setView={setView} />
      <main className="flex-1 ml-64 p-8 lg:p-12 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
