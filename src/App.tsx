import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Product, ProductFormData, Kantin, Admin, AdminFormData, SystemSettings } from './types';
import { kantins, initialProducts, initialAdmins, defaultSettings } from './data/mockData';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ProductManagement from './components/ProductManagement';
import KantinManagement from './components/KantinManagement';
import AdminManagement from './components/AdminManagement';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useLocalStorage<Product[]>('smk-telkom-products', initialProducts);
  const [admins, setAdmins] = useLocalStorage<Admin[]>('smk-telkom-admins', initialAdmins);
  const [settings, setSettings] = useLocalStorage<SystemSettings>('smk-telkom-settings', defaultSettings);

  const generateProductId = () => {
    return Math.max(...products.map(p => p.id), 0) + 1;
  };

  const generateAdminId = () => {
    return Math.max(...admins.map(a => a.id), 0) + 1;
  };

  const handleAddProduct = (productData: ProductFormData) => {
    const newProduct: Product = {
      id: generateProductId(),
      ...productData
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (productData: ProductFormData, productId: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, ...productData }
        : product
    ));
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleAddAdmin = (adminData: AdminFormData) => {
    const newAdmin: Admin = {
      id: generateAdminId(),
      nama: adminData.nama,
      email: adminData.email,
      role: adminData.role,
      status: adminData.status,
      created_at: new Date().toISOString()
    };
    setAdmins(prev => [...prev, newAdmin]);
  };

  const handleUpdateAdmin = (adminData: AdminFormData, adminId: number) => {
    setAdmins(prev => prev.map(admin => 
      admin.id === adminId 
        ? { 
            ...admin, 
            nama: adminData.nama,
            email: adminData.email,
            role: adminData.role,
            status: adminData.status
          }
        : admin
    ));
  };

  const handleDeleteAdmin = (adminId: number) => {
    setAdmins(prev => prev.filter(admin => admin.id !== adminId));
  };

  const handleUpdateSettings = (newSettings: SystemSettings) => {
    setSettings(newSettings);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard products={products} kantins={kantins} />;
      case 'products':
        return (
          <ProductManagement
            products={products}
            kantins={kantins}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'kantins':
        return <KantinManagement kantins={kantins} products={products} />;
      case 'admins':
        return (
          <AdminManagement
            admins={admins}
            onAddAdmin={handleAddAdmin}
            onUpdateAdmin={handleUpdateAdmin}
            onDeleteAdmin={handleDeleteAdmin}
          />
        );
      case 'settings':
        return (
          <Settings
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        );
      default:
        return (
          <div className="p-8 flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Fitur Sedang Dikembangkan</h2>
              <p className="text-gray-600">Fitur ini akan segera tersedia.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;