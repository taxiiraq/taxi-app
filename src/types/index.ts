export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'driver' | 'admin';
  status: 'active' | 'banned' | 'inactive';
  createdAt: Date;
}

export interface Order {
  id: string;
  customerId: string;
  driverId?: string;
  address: string;
  description: string;
  notes?: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportMessage {
  id: string;
  userId: string;
  message: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_accepted' | 'order_started' | 'order_completed' | 'new_order' | 'order_cancelled';
  message: string;
  isRead: boolean;
  createdAt: Date;
} 