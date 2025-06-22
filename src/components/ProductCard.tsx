import React from 'react';
import { Product, Kantin } from '../types';
import { Edit, Trash2, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  kantin: Kantin;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, kantin, onEdit, onDelete }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-600 bg-red-50';
    if (stock <= 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Product Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {product.gambar ? (
          <img
            src={product.gambar}
            alt={product.nama_produk}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            {kantin.nama_kantin}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.nama_produk}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {product.deskripsi}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-red-600">
            {formatCurrency(product.harga)}
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStockColor(product.stok)}`}>
            Stok: {product.stok}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <Edit className="w-4 h-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Hapus</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;