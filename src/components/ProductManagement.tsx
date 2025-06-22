import React, { useState, useMemo } from 'react';
import { Product, ProductFormData, Kantin } from '../types';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { Plus, Search, Filter, SortAsc, SortDesc } from 'lucide-react';

interface ProductManagementProps {
  products: Product[];
  kantins: Kantin[];
  onAddProduct: (productData: ProductFormData) => void;
  onUpdateProduct: (productData: ProductFormData, productId: number) => void;
  onDeleteProduct: (productId: number) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({
  products,
  kantins,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKantin, setSelectedKantin] = useState<number | 'all'>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.nama_produk.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesKantin = selectedKantin === 'all' || product.kantin_id === selectedKantin;
      
      let matchesPrice = true;
      if (priceFilter === 'low') matchesPrice = product.harga < 10000;
      else if (priceFilter === 'medium') matchesPrice = product.harga >= 10000 && product.harga < 20000;
      else if (priceFilter === 'high') matchesPrice = product.harga >= 20000;
      
      return matchesSearch && matchesKantin && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.nama_produk.localeCompare(b.nama_produk);
          break;
        case 'price':
          comparison = a.harga - b.harga;
          break;
        case 'stock':
          comparison = a.stok - b.stok;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [products, searchTerm, selectedKantin, priceFilter, sortBy, sortOrder]);

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: ProductFormData, productId?: number) => {
    if (productId) {
      onUpdateProduct(productData, productId);
    } else {
      onAddProduct(productData);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      onDeleteProduct(productId);
    }
  };

  const toggleSort = (field: 'name' | 'price' | 'stock') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Produk</h1>
          <p className="text-gray-600">Kelola semua produk di kantin SMK Telkom Jakarta</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Tambah Produk</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          {/* Kantin Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedKantin}
              onChange={(e) => setSelectedKantin(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none"
            >
              <option value="all">Semua Kantin</option>
              {kantins.map(kantin => (
                <option key={kantin.id} value={kantin.id}>{kantin.nama_kantin}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          >
            <option value="all">Semua Harga</option>
            <option value="low">&lt; Rp 10.000</option>
            <option value="medium">Rp 10.000 - Rp 20.000</option>
            <option value="high">&gt; Rp 20.000</option>
          </select>

          {/* Sort Options */}
          <div className="flex space-x-2">
            <button
              onClick={() => toggleSort('name')}
              className={`flex-1 px-3 py-2 rounded-lg border transition-colors flex items-center justify-center space-x-1 ${
                sortBy === 'name' ? 'bg-red-50 border-red-300 text-red-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">Nama</span>
              {sortBy === 'name' && (
                sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => toggleSort('price')}
              className={`flex-1 px-3 py-2 rounded-lg border transition-colors flex items-center justify-center space-x-1 ${
                sortBy === 'price' ? 'bg-red-50 border-red-300 text-red-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">Harga</span>
              {sortBy === 'price' && (
                sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => toggleSort('stock')}
              className={`flex-1 px-3 py-2 rounded-lg border transition-colors flex items-center justify-center space-x-1 ${
                sortBy === 'stock' ? 'bg-red-50 border-red-300 text-red-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm">Stok</span>
              {sortBy === 'stock' && (
                sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map(product => {
          const kantin = kantins.find(k => k.id === product.kantin_id)!;
          return (
            <ProductCard
              key={product.id}
              product={product}
              kantin={kantin}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          );
        })}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada produk ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau tambahkan produk baru</p>
        </div>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        kantins={kantins}
      />
    </div>
  );
};

export default ProductManagement;