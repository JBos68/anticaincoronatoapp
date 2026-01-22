
import { Product, Category, Sale } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Set Pentole in Acciaio Inox',
    category: Category.CUCINA,
    price: 149.99,
    stock: 12,
    description: 'Set da 5 pezzi professionale con fondo a triplo strato in acciaio inossidabile.',
    image: 'https://images.unsplash.com/photo-1584990344321-2768d5e08611?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Vaso in Ceramica Blu',
    category: Category.DECORAZIONI,
    price: 34.50,
    stock: 25,
    description: 'Vaso artigianale rifinito a mano, ideale per arredamento moderno o classico.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Tavolino da Caffè in Rovere',
    category: Category.SOGGIORNO,
    price: 210.00,
    stock: 5,
    description: 'Tavolo in legno massiccio con venature naturali e gambe in metallo industriale.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Set 6 Calici Cristallo',
    category: Category.CUCINA,
    price: 59.90,
    stock: 8,
    description: 'Calici eleganti in cristallo per vino rosso, design a stelo lungo.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Lampada da Tavolo Gold',
    category: Category.ILLUMINAZIONE,
    price: 89.00,
    stock: 3,
    description: 'Lampada moderna con finitura dorata e luce soffusa per ambienti raffinati.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed657db991?auto=format&fit=crop&q=80&w=800'
  }
];

export const MOCK_SALES: Sale[] = [
  { id: 's1', productId: '1', productName: 'Set Pentole in Acciaio Inox', quantity: 1, totalPrice: 149.99, date: '2023-11-20' },
  { id: 's2', productId: '2', productName: 'Vaso in Ceramica Blu', quantity: 2, totalPrice: 69.00, date: '2023-11-21' },
  { id: 's3', productId: '4', productName: 'Set 6 Calici Cristallo', quantity: 1, totalPrice: 59.90, date: '2023-11-21' },
];
