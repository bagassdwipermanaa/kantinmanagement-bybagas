export interface Kantin {
  id: number;
  nama_kantin: string;
  nama_penjaga: string;
  lokasi: string;
}

export interface Product {
  id: number;
  kantin_id: number;
  nama_produk: string;
  harga: number;
  stok: number;
  deskripsi: string;
  gambar?: string;
}

export interface ProductFormData {
  nama_produk: string;
  harga: number;
  stok: number;
  deskripsi: string;
  kantin_id: number;
  gambar?: string;
}

export interface Admin {
  id: number;
  nama: string;
  email: string;
  role: 'super_admin' | 'admin' | 'operator';
  status: 'active' | 'inactive';
  last_login?: string;
  created_at: string;
}

export interface AdminFormData {
  nama: string;
  email: string;
  role: 'super_admin' | 'admin' | 'operator';
  status: 'active' | 'inactive';
  password?: string;
}

export interface SystemSettings {
  app_name: string;
  school_name: string;
  low_stock_threshold: number;
  currency: string;
  timezone: string;
  backup_frequency: 'daily' | 'weekly' | 'monthly';
  email_notifications: boolean;
  maintenance_mode: boolean;
}