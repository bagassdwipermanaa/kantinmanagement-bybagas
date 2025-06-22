import React from 'react';
import { Kantin, Product } from '../types';
import { Store, User, MapPin, Package } from 'lucide-react';

interface KantinManagementProps {
  kantins: Kantin[];
  products: Product[];
}

const KantinManagement: React.FC<KantinManagementProps> = ({ kantins, products }) => {
  const getKantinStats = (kantinId: number) => {
    const kantinProducts = products.filter(p => p.kantin_id === kantinId);
    const totalStock = kantinProducts.reduce((sum, p) => sum + p.stok, 0);
    const totalValue = kantinProducts.reduce((sum, p) => sum + (p.harga * p.stok), 0);
    const lowStockCount = kantinProducts.filter(p => p.stok <= 10).length;
    
    return {
      productCount: kantinProducts.length,
      totalStock,
      totalValue,
      lowStockCount
    };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Kantin</h1>
        <p className="text-gray-600">Overview semua kantin di SMK Telkom Jakarta</p>
      </div>

      {/* Kantin Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kantins.map(kantin => {
          const stats = getKantinStats(kantin.id);
          
          return (
            <div key={kantin.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{kantin.nama_kantin}</h3>
                    <p className="text-red-100 text-sm">Kantin #{kantin.id}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Kantin Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{kantin.nama_penjaga}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span className="text-sm">{kantin.lokasi}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{stats.productCount}</div>
                    <div className="text-xs text-blue-500 font-medium">Produk</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{stats.totalStock}</div>
                    <div className="text-xs text-green-500 font-medium">Total Stok</div>
                  </div>
                </div>

                {/* Value and Alerts */}
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Nilai Total Inventori</div>
                    <div className="text-lg font-semibold text-gray-900">{formatCurrency(stats.totalValue)}</div>
                  </div>

                  {stats.lowStockCount > 0 && (
                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-red-600">
                        <Package className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {stats.lowStockCount} produk stok rendah
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Ringkasan Keseluruhan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{kantins.length}</div>
            <div className="text-sm text-gray-600">Total Kantin</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{products.length}</div>
            <div className="text-sm text-gray-600">Total Produk</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {products.reduce((sum, p) => sum + p.stok, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Stok</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {formatCurrency(products.reduce((sum, p) => sum + (p.harga * p.stok), 0))}
            </div>
            <div className="text-sm text-gray-600">Nilai Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KantinManagement;