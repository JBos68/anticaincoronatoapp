
import React, { useState } from 'react';
import { Product, Category } from '../types';
import { Search, Filter, Plus, Trash2, Edit2, X } from 'lucide-react';

interface InventoryProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ products, onAddProduct, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: Category.CUCINA,
    price: '',
    stock: '',
    description: ''
  });

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;

    // Crea una keyword pulita per l'immagine basata sul nome del prodotto
    const keyword = encodeURIComponent(newProduct.name.split(' ').slice(0, 2).join(' '));
    
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      description: newProduct.description,
      // Utilizza Unsplash Source per immagini più attinenti rispetto a Picsum
      image: `https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&q=60&w=800&sig=${Date.now()}` 
      // Nota: Idealmente useresti un'API di ricerca immagini, qui simuliamo con un fallback di qualità
      // o un link dinamico basato su keyword se supportato
    };

    // Sovrascriviamo l'immagine con una ricerca basata su keyword per migliorare l'attinenza
    product.image = `https://source.unsplash.com/featured/?${keyword},home-goods`;

    onAddProduct(product);
    setIsModalOpen(false);
    setNewProduct({
      name: '',
      category: Category.CUCINA,
      price: '',
      stock: '',
      description: ''
    });
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestione Magazzino</h2>
          <p className="text-slate-500">Monitora e gestisci gli articoli della casa disponibili.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
        >
          <Plus size={20} />
          Nuovo Prodotto
        </button>
      </header>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Cerca per nome prodotto..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
              className="pl-10 pr-8 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 appearance-none text-slate-600 font-medium"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">Tutte le Categorie</option>
              {Object.values(Category).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img 
                src={p.image} 
                alt={p.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1595475242265-c3a8c2bda65c?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:text-indigo-600 shadow-lg">
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => onDeleteProduct(p.id)}
                  className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:text-red-600 shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full text-indigo-700 shadow-sm uppercase tracking-wide">
                  {p.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-800 leading-tight">{p.name}</h4>
                <p className="text-lg font-black text-indigo-600">€{p.price.toFixed(2)}</p>
              </div>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">{p.description}</p>
              
              <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Disponibilità</span>
                  <span className={`text-sm font-bold ${p.stock < 10 ? 'text-red-500' : 'text-slate-700'}`}>
                    {p.stock} pezzi
                  </span>
                </div>
                <div className="h-2 w-24 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${p.stock < 10 ? 'bg-red-500' : 'bg-indigo-500'}`}
                    style={{ width: `${Math.min(p.stock * 5, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
          <div className="bg-slate-50 p-6 rounded-full text-slate-300 mb-4">
            <Search size={48} />
          </div>
          <h3 className="text-xl font-bold text-slate-700">Nessun prodotto trovato</h3>
          <p className="text-slate-400">Prova a cambiare i filtri di ricerca.</p>
        </div>
      )}

      {/* Modal Nuovo Prodotto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Aggiungi Nuovo Prodotto</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nome Prodotto</label>
                <input
                  required
                  type="text"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Es: Set Piatti in Ceramica"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Categoria</label>
                  <select
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value as Category})}
                  >
                    {Object.values(Category).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Prezzo (€)</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Stock (Quantità)</label>
                <input
                  required
                  type="number"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="0"
                  value={newProduct.stock}
                  onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Descrizione</label>
                <textarea
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-24 resize-none"
                  placeholder="Descrivi brevemente il prodotto..."
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                >
                  Aggiungi Prodotto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
