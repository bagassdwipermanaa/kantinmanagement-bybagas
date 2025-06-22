import React from 'react';
import { Product, Kantin } from '../types';
import { Package, Store, TrendingUp, Users } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  kantins: Kantin[];
}

const Dashboard: React.FC<DashboardProps> = ({ products, kantins }) => {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stok, 0);
  const lowStockProducts = products.filter(product => product.stok <= 10).length;
  const avgPrice = products.reduce((sum, product) => sum + product.harga, 0) / products.length || 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Produk',
      value: totalProducts,
      icon: Package,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Kantin',
      value: kantins.length,
      icon: Store,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Total Stok',
      value: totalStock,
      icon: TrendingUp,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'Stok Rendah',
      value: lowStockProducts,
      icon: Users,
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600'
    }
  ];

  const kantinStats = kantins.map(kantin => {
    const kantinProducts = products.filter(p => p.kantin_id === kantin.id);
    const totalValue = kantinProducts.reduce((sum, p) => sum + (p.harga * p.stok), 0);
    return {
      ...kantin,
      productCount: kantinProducts.length,
      totalStock: kantinProducts.reduce((sum, p) => sum + p.stok, 0),
      totalValue
    };
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di sistem manajemen produk kantin SMK Telkom Jakarta</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kantin Overview */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Overview Kantin</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {kantinStats.map(kantin => (
            <div key={kantin.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{kantin.nama_kantin}</h3>
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">{kantin.lokasi}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">Penjaga: {kantin.nama_penjaga}</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-blue-600">{kantin.productCount}</p>
                  <p className="text-xs text-gray-500">Produk</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{kantin.totalStock}</p>
                  <p className="text-xs text-gray-500">Stok</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-purple-600">{formatCurrency(kantin.totalValue)}</p>
                  <p className="text-xs text-gray-500">Nilai Total</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Penting</h2>
        <div className="space-y-3">
          {lowStockProducts > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Package className="w-5 h-5 text-red-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    Peringatan Stok Rendah
                  </p>
                  <p className="text-sm text-red-700">
                    {lowStockProducts} produk memiliki stok ≤ 10 unit. Segera lakukan restok.
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-blue-800">
                  Rata-rata Harga Produk
                </p>
                <p className="text-sm text-blue-700">
                  {formatCurrency(avgPrice)} per produk di semua kantin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;