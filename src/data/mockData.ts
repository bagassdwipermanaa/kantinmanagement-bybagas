import { Kantin, Product, Admin, SystemSettings } from '../types';

export const kantins: Kantin[] = [
  {
    id: 1,
    nama_kantin: "Kantin Telkom",
    nama_penjaga: "Bu Sari",
    lokasi: "Lantai 1, Gedung Utama"
  },
  {
    id: 2,
    nama_kantin: "Kantin Sehat",
    nama_penjaga: "Pak Budi",
    lokasi: "Lantai 2, Gedung Utama"
  },
  {
    id: 3,
    nama_kantin: "Kantin Express",
    nama_penjaga: "Bu Rina",
    lokasi: "Gedung Praktik"
  },
  {
    id: 4,
    nama_kantin: "Kantin Nusantara",
    nama_penjaga: "Pak Joko",
    lokasi: "Dekat Lapangan"
  },
  {
    id: 5,
    nama_kantin: "Kantin Modern",
    nama_penjaga: "Bu Lisa",
    lokasi: "Lantai 3, Gedung Utama"
  },
  {
    id: 6,
    nama_kantin: "Kantin Tradisional",
    nama_penjaga: "Bu Ani",
    lokasi: "Samping Masjid"
  },
  {
    id: 7,
    nama_kantin: "Kantin Digital",
    nama_penjaga: "Pak Rudi",
    lokasi: "Lab Komputer"
  }
];

export const initialProducts: Product[] = [
  // Kantin Telkom (ID: 1)
  {
    id: 1,
    kantin_id: 1,
    nama_produk: "Nasi Gudeg Jogja",
    harga: 15000,
    stok: 25,
    deskripsi: "Nasi gudeg khas Jogja dengan ayam dan telur",
    gambar: "https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 2,
    kantin_id: 1,
    nama_produk: "Es Teh Manis",
    harga: 3000,
    stok: 50,
    deskripsi: "Minuman segar es teh manis",
    gambar: "https://images.pexels.com/photos/1154425/pexels-photo-1154425.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  
  // Kantin Sehat (ID: 2)
  {
    id: 3,
    kantin_id: 2,
    nama_produk: "Salad Buah Segar",
    harga: 12000,
    stok: 20,
    deskripsi: "Salad buah segar dengan berbagai macam buah",
    gambar: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 4,
    kantin_id: 2,
    nama_produk: "Jus Alpukat",
    harga: 8000,
    stok: 30,
    deskripsi: "Jus alpukat segar tanpa gula tambahan",
    gambar: "https://images.pexels.com/photos/1446318/pexels-photo-1446318.jpeg?auto=compress&cs=tinysrgb&w=400"
  },

  // Kantin Express (ID: 3)
  {
    id: 5,
    kantin_id: 3,
    nama_produk: "Mie Ayam Bakso",
    harga: 10000,
    stok: 35,
    deskripsi: "Mie ayam dengan bakso dan pangsit",
    gambar: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 6,
    kantin_id: 3,
    nama_produk: "Nasi Goreng Spesial",
    harga: 13000,
    stok: 20,
    deskripsi: "Nasi goreng dengan telur, ayam, dan kerupuk",
    gambar: "https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=400"
  },

  // Kantin Nusantara (ID: 4)
  {
    id: 7,
    kantin_id: 4,
    nama_produk: "Rendang Daging",
    harga: 18000,
    stok: 15,
    deskripsi: "Rendang daging sapi khas Padang dengan nasi",
    gambar: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 8,
    kantin_id: 4,
    nama_produk: "Gado-gado Jakarta",
    harga: 11000,
    stok: 25,
    deskripsi: "Gado-gado dengan bumbu kacang khas Jakarta",
    gambar: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=400"
  },

  // Kantin Modern (ID: 5)
  {
    id: 9,
    kantin_id: 5,
    nama_produk: "Chicken Katsu",
    harga: 16000,
    stok: 18,
    deskripsi: "Ayam katsu crispy dengan saus teriyaki",
    gambar: "https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 10,
    kantin_id: 5,
    nama_produk: "Boba Milk Tea",
    harga: 12000,
    stok: 40,
    deskripsi: "Minuman boba milk tea dengan berbagai varian rasa",
    gambar: "https://images.pexels.com/photos/3682235/pexels-photo-3682235.jpeg?auto=compress&cs=tinysrgb&w=400"
  },

  // Kantin Tradisional (ID: 6)
  {
    id: 11,
    kantin_id: 6,
    nama_produk: "Soto Ayam",
    harga: 9000,
    stok: 30,
    deskripsi: "Soto ayam tradisional dengan nasi dan kerupuk",
    gambar: "https://images.pexels.com/photos/1765289/pexels-photo-1765289.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 12,
    kantin_id: 6,
    nama_produk: "Klepon",
    harga: 5000,
    stok: 45,
    deskripsi: "Kue klepon tradisional dengan gula merah",
    gambar: "https://images.pexels.com/photos/3677542/pexels-photo-3677542.jpeg?auto=compress&cs=tinysrgb&w=400"
  },

  // Kantin Digital (ID: 7)
  {
    id: 13,
    kantin_id: 7,
    nama_produk: "Pizza Mini",
    harga: 14000,
    stok: 20,
    deskripsi: "Pizza mini dengan topping keju dan sosis",
    gambar: "https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: 14,
    kantin_id: 7,
    nama_produk: "Kopi Susu Digital",
    harga: 7000,
    stok: 35,
    deskripsi: "Kopi susu premium dengan foam art",
    gambar: "https://images.pexels.com/photos/1684151/pexels-photo-1684151.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export const initialAdmins: Admin[] = [
  {
    id: 1,
    nama: "Administrator Utama",
    email: "admin@smktelkom.sch.id",
    role: "super_admin",
    status: "active",
    last_login: "2024-01-15 09:30:00",
    created_at: "2024-01-01 08:00:00"
  },
  {
    id: 2,
    nama: "Budi Santoso",
    email: "budi.santoso@smktelkom.sch.id",
    role: "admin",
    status: "active",
    last_login: "2024-01-14 14:20:00",
    created_at: "2024-01-02 10:15:00"
  },
  {
    id: 3,
    nama: "Sari Dewi",
    email: "sari.dewi@smktelkom.sch.id",
    role: "operator",
    status: "active",
    last_login: "2024-01-13 16:45:00",
    created_at: "2024-01-03 11:30:00"
  },
  {
    id: 4,
    nama: "Andi Wijaya",
    email: "andi.wijaya@smktelkom.sch.id",
    role: "operator",
    status: "inactive",
    last_login: "2024-01-10 13:15:00",
    created_at: "2024-01-05 09:45:00"
  }
];

export const defaultSettings: SystemSettings = {
  app_name: "SMK Telkom - Manajemen Kantin",
  school_name: "SMK Telkom Jakarta",
  low_stock_threshold: 10,
  currency: "IDR",
  timezone: "Asia/Jakarta",
  backup_frequency: "daily",
  email_notifications: true,
  maintenance_mode: false
};